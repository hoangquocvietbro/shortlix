import { NextResponse } from 'next/server';
import { Client } from '@gradio/client';
import { db } from 'configs/db';
import { jobs } from 'configs/schema';
import crypto from 'crypto';
import { eq } from 'drizzle-orm';

const HF_TOKEN = process.env.HF_TOKEN;
const SONITRANSLATE_API_ID = "hoangquocviet/shortlixserver";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const jobId = crypto.randomUUID();

    // Save initial job status to database
    await db.insert(jobs).values({
      id: jobId,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Process in background
    (async () => {
      try {
        const client = await Client.connect(SONITRANSLATE_API_ID, { hf_token: HF_TOKEN });
        await client.view_api();

        const settingArray = [ null,
          formData.get('videoUrl'),
          "",
          "|1uVagBuf79eTg6p2hbmvs0dG2liq5jH8N",
          false,
          formData.get('whisperModel'),
          32,
          "float32",
          formData.get('sourceLanguage'),
          formData.get('targetLanguage'),
          1,
          1,
          formData.get('ttsSpeakers').split(',')[0],
          formData.get('ttsSpeakers').split(',')[1],
          formData.get('ttsSpeakers').split(',')[2],
          formData.get('ttsSpeakers').split(',')[3],
          formData.get('ttsSpeakers').split(',')[4],
          formData.get('ttsSpeakers').split(',')[5],
          formData.get('ttsSpeakers').split(',')[6],
          formData.get('ttsSpeakers').split(',')[7],
          formData.get('ttsSpeakers').split(',')[8],
          formData.get('ttsSpeakers').split(',')[9],
          formData.get('ttsSpeakers').split(',')[10],
          formData.get('ttsSpeakers').split(',')[11],
          "",
          "Adjusting volumes and mixing audio",
          2.5,
          true,
          parseFloat(formData.get('volumeOriginalAudio')),
          parseFloat(formData.get('volumeTranslatedAudio')),
          "srt",
          false,
          false,
          "",
          false,
          false,
          true,
          16,
          formData.get('diarizationModel'),
          formData.get('translationProcess'),
          null,
          "video (mp4)",
          false,
          false,
          3,
          false,
          true,
          "freevc",
          true,
          "sentence",
          "|，|,|.|:|!|?|...|\u3002",
          false,
          false,
          true,
          false,
          1,
          true
        ];

        const result = await client.predict("/batch_multilingual_media_conversion_1", settingArray);
        console.log('result', result);
        // Update job when done
        await db.update(jobs)
          .set({
            status: 'done',
            result: result,
            updatedAt: new Date()
          })
          .where(eq(jobs.id, jobId));
          console.log('update job done');
      } catch (err) {
        console.error('Translation error:', err);
        await db.update(jobs)
          .set({
            status: 'error',
            error: err.message,
            updatedAt: new Date()
          })
          .where(eq(jobs.id, jobId));
      }
    })();

    return NextResponse.json({ success: true, jobId });
  } catch (error) {
    console.error('Start job error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 
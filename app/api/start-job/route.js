import { NextResponse } from 'next/server';
import { Client } from '@gradio/client';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const HF_TOKEN = process.env.HF_TOKEN;
const SONITRANSLATE_API_ID = "hoangquocviet/shortlixserver";
const DB_FILE = path.resolve('/tmp/jobs.json');

async function saveJob(jobId, data) {
  let db = {};
  try {
    db = JSON.parse(await fs.readFile(DB_FILE, 'utf-8'));
  } catch (e) {}
  db[jobId] = data;
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const jobId = crypto.randomUUID();

    // Save initial job status
    await saveJob(jobId, {
      status: 'pending',
      createdAt: Date.now(),
      result: null
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

        // Update job when done
        await saveJob(jobId, {
          status: 'done',
          result: result,
          updatedAt: Date.now()
        });
      } catch (err) {
        console.error('Translation error:', err);
        await saveJob(jobId, {
          status: 'error',
          error: err.message,
          updatedAt: Date.now()
        });
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
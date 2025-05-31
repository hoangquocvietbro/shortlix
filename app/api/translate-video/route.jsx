import { Client } from "@gradio/client";
import { NextResponse } from 'next/server';

const SONITRANSLATE_API_ID = "hoangquocviet/shortlixserver";
const HF_TOKEN = process.env.HF_TOKEN;
export async function POST(req) {
  try {
    const formData = await req.formData();
    const videoFile = formData.get('videoFile');
    
    console.log(formData);
    // Convert form data to settings object
    const settings = {
      videoFile: formData.get('videoFile'),
      sourceLanguage: formData.get('sourceLanguage'),
      targetLanguage: formData.get('targetLanguage'),
      whisperModel: formData.get('whisperModel'),
      maxSpeakers: parseInt(formData.get('maxSpeakers')),
      ttsSpeaker: formData.get('ttsSpeaker'),
      outputType: formData.get('outputType'),
      enableVoiceImitation: formData.get('enableVoiceImitation') === 'true',
      enableDereverb: formData.get('enableDereverb') === 'true',
      enableSubtitles: formData.get('enableSubtitles') === 'true',
      subtitleType: formData.get('subtitleType'),
      enableSoftSubtitles: formData.get('enableSoftSubtitles') === 'true',
      enableBurnSubtitles: formData.get('enableBurnSubtitles') === 'true',
      enableOverlapReduction: formData.get('enableOverlapReduction') === 'true',
      enableSoundCleanup: formData.get('enableSoundCleanup') === 'true',
      enableLiteralizeNumbers: formData.get('enableLiteralizeNumbers') === 'true',
      segmentDurationLimit: parseInt(formData.get('segmentDurationLimit')),
      diarizationModel: formData.get('diarizationModel'),
      translationProcess: formData.get('translationProcess'),
      audioMixingMethod: formData.get('audioMixingMethod'),
      maxAudioAcceleration: parseFloat(formData.get('maxAudioAcceleration')),
      enableAccelerationRateRegulation: formData.get('enableAccelerationRateRegulation') === 'true',
      volumeOriginalAudio: parseFloat(formData.get('volumeOriginalAudio')),
      volumeTranslatedAudio: parseFloat(formData.get('volumeTranslatedAudio')),
      enableVoicelessTrack: formData.get('enableVoicelessTrack') === 'true',
      maxSamples: parseInt(formData.get('maxSamples')),
      enableRemovePreviousSamples: formData.get('enableRemovePreviousSamples') === 'true',
      voiceImitationMethod: formData.get('voiceImitationMethod'),
      textSegmentationScale: formData.get('textSegmentationScale'),
      workers: parseInt(formData.get('workers')),
    };
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
     ]
    console.log(settingArray);

    // Initialize the Gradio client
    const client = await Client.connect(SONITRANSLATE_API_ID, { hf_token: HF_TOKEN });
    await client.view_api();
    // Call the translation API with the video blob
    const result = await client.predict("/batch_multilingual_media_conversion_1",[...settingArray]);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Translation error:', error);
    if (error.message.includes("Could not resolve app config")) {
      return NextResponse.json(
        { success: false, error: "Translation service is currently unavailable. Please try again later." },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

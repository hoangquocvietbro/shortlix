import { Client } from "@gradio/client";
import { NextResponse } from 'next/server';

const SONITRANSLATE_API_ID = "hoangquocviet/sonitr";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const videoFile = formData.get('videoFile');

    // Convert form data to settings object
    const settings = {
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

    // Initialize the Gradio client
    const client = await Client.connect(SONITRANSLATE_API_ID);
    await client.view_api();
    // Call the translation API with the video blob
    const result = await client.predict("/batch_multilingual_media_conversion_1",
      [
      null,
      "https://drive.google.com/file/d/19TtpCEWeLa5Ko63JmeZjeS0DaEZp6fs_/view?usp=drive_link",
      "",
      "|1uVagBuf79eTg6p2hbmvs0dG2liq5jH8N",
      false,
      "Systran/faster-distil-whisper-large-v3",
      32,
      "int8",
      "Chinese - Simplified (zh-CN)",
      "Vietnamese (vi)",
      1,
      1,
      "vi-VN-HoaiMyNeural-Female",
      "en-US-AndrewMultilingualNeural-Male",
      "en-US-AvaMultilingualNeural-Female",
      "en-US-BrianMultilingualNeural-Male",
      "de-DE-SeraphinaMultilingualNeural-Female",
      "de-DE-FlorianMultilingualNeural-Male",
      "fr-FR-VivienneMultilingualNeural-Female",
      "fr-FR-RemyMultilingualNeural-Male",
      "en-US-EmmaMultilingualNeural-Female",
      "en-US-AndrewMultilingualNeural-Male",
      "en-US-EmmaMultilingualNeural-Female",
      "en-US-AndrewMultilingualNeural-Male",
      "",
      "Adjusting volumes and mixing audio",
      2.5,
      true,
      0.25,
      2.5,
      "srt",
      false,
      false,
      "",
      false,
      false,
      true,
      16,
      "disable",
      "google_translator_batch",
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
      "|,|.|:|!|?|...|\u3002",
      false,
      false,
      true,
      false,
      1,
      true
     ]);
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

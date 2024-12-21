// ... existing imports ...
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "configs/FierbaseConfig";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req) {
  const { text, languageCode, ssmlGender, id } = await req.json();
  const storageRef = ref(storage, "ai-short-video-files/" + id + ".mp3");

  const options = {
    method: "POST",
    url: "https://text2audio.cc/api/audio",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      paragraphs: text,
      language: languageCode,
      splitParagraph: false,
      speed: "1",
    }),
  };

  try {
    const response = await fetch(options.url, options);
    const parsedData = await response.json();
    const audioUrl = parsedData[0].url;

    // Download the audio file
    const audioResponse = await fetch(audioUrl);
    const audioBuffer = await audioResponse.arrayBuffer();

    // Upload to Firebase
    await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });
    const downloadUrl = await getDownloadURL(storageRef);
    // Update download link to database
    return NextResponse.json({ result: downloadUrl });
  } catch (error) {
    console.error("Error generating audio:", error);
    return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 });
  }
}
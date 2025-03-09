import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Destructure both audioFileUrl and languageCode from the request
    const { audioFileUrl, language_code } = await req.json();
    const client = new AssemblyAI({
      apiKey: process.env.NEXT_PUBLIC_ASSEMBLY_AI_API_KEY,
    });
    let languageCode = language_code?.split("-")[0]||"en";
    if(languageCode=="fil") languageCode="tl";
    const data = {
      audio: audioFileUrl,
      language_code: languageCode,
      speech_model: "nano"
    };


    const transcript = await client.transcripts.transcribe(data);
    return NextResponse.json({ result: transcript.words });
  } catch (error) {
    console.error("Error during transcription:", error); // Log the error for debugging
    return NextResponse.json({ });
  }
}

import { storage } from "configs/FierbaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import fetch from 'node-fetch';

export async function POST(req) {
  try {
    const { prompt,width=1024,height=1820,model='flux' } = await req.json();
    
    // Configure pollinations.ai URL
    const imageUrl = `https://pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&model=${model}&seed=30&nologo=true&enhance=false`
    //`https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=43&model=${model}`;
    
    console.log(imageUrl)
    // Fetch and convert image
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    const base64Image = `data:image/png;base64,${buffer.toString('base64')}`;

    // Save to Firebase
    const fileName = `ai-short-video-files/${Date.now()}.png`;
    const storageRef = ref(storage, fileName);
    
    await uploadString(storageRef, base64Image, "data_url");
    const downloadUrl = await getDownloadURL(storageRef);
    
    return NextResponse.json({ result: downloadUrl });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
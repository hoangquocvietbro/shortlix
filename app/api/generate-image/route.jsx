import { storage } from "configs/FierbaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import fetch from 'node-fetch';

const MAX_RETRIES = 5; // Maximum retries (15 * 20s = 5 min)
const RETRY_DELAY = 200; // 20 seconds in milliseconds

export async function POST(req) {
  try {
    const { prompt, width = 1024, height = 1820, model = 'flux' } = await req.json();

    // Configure pollinations.ai URL
    const imageUrl = `https://pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&model=${model}&seed=30&nologo=true&enhance=false`;
    console.log(imageUrl);

    let retries = 0;
    let response;
    let buffer;


    while(retries < MAX_RETRIES)
    {
      console.log(retries)
      try {
        // Fetch and convert image
        response = await fetch(imageUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

         buffer = await response.buffer();
         break;
      } catch (error) {
        console.error(`Error fetching image (attempt ${retries + 1}/${MAX_RETRIES}):`, error);
        retries++;
        if (retries < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }

      }
    }
    
    if(retries === MAX_RETRIES) {
      throw new Error(`Failed to fetch image after ${MAX_RETRIES} retries.`);
    }


    const base64Image = `data:image/png;base64,${buffer.toString('base64')}`;

    // Save to Firebase
    const fileName = `ai-short-video-files/${Date.now()}.png`;
    const storageRef = ref(storage, fileName);

    await uploadString(storageRef, base64Image, "data_url");
    const downloadUrl = await getDownloadURL(storageRef);

    return NextResponse.json({ result: downloadUrl });
  } catch (e) {
    console.error("Final error:", e); // Log the final error for debugging
    return NextResponse.json({ error: e.message || "An unexpected error occurred" });
  }
}

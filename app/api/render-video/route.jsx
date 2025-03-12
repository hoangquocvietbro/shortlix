import { renderMediaOnLambda } from "@remotion/lambda/client";
import { getRenderProgress } from '@remotion/lambda/client';
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server"
import { db } from "configs/db";
import { VideoData } from "configs/schema";

export async function POST(req) {
  try {

    const body = await req.json();
    const videoData = body;
    const {id} = videoData;
    console.log(videoData)
    if (!videoData) {
      return new Response(JSON.stringify({ message: "Missing video data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { durationInFrames } = videoData;



    const result = await renderMediaOnLambda({
      region: "us-east-1",
      serveUrl: 'shortlix',

      composition: "Empty",
      inputProps: {},
      functionName: `remotion-render-4-0-220-mem2048mb-disk2048mb-120sec`,
      codec: "h264",
      inputProps: { ...videoData },
      delayRenderTimeoutInMilliseconds: 900000,
      privacy: "public",
      frameRange: [0, durationInFrames - 2],
      downloadBehavior: { type: "download", fileName: "download.mp4" },
    });
    console.log(result)

    let downloadFirebaseUrl ="";
    while (true) {
      const progress = await getRenderProgress({
        renderId: result.renderId,
        bucketName: 'remotionlambda-useast1-s3zn78bdvq',
        functionName: 'remotion-render-4-0-220-mem2048mb-disk2048mb-120sec',
        region: 'us-east-1',
      });
      if (progress.done) {
        console.log(progress.outputFile)
        downloadFirebaseUrl=progress.outputFile;
        break;
      }
      if (progress.fatalErrorEncountered) {
        console.log(progress.errors.filter((e) => e.isFatal));
        break;
      }
      console.log(progress.overallProgress);
      await new Promise(resolve => setTimeout(resolve, 1000))
    };
    await db
      .update(VideoData)
      .set({ ...videoData,
        downloadUrl: downloadFirebaseUrl, // Đảm bảo `downloadUrl` có giá trị hợp lệ
      })
      .where(eq(VideoData.id, Number(id))); // Loại bỏ `?.` nếu `VideoData` luôn tồn tại

    return NextResponse.json({ 'result': 'success', 'videoFilePath': downloadFirebaseUrl });

  } catch (error) {
    console.error("Error during rendering:", error.message);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

}

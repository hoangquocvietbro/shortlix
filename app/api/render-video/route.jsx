import { exec } from 'child_process';
import { db } from "configs/db";
import { VideoData } from "configs/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server"
import { writeFile,readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "configs/FierbaseConfig";

export async function POST(req) {
  try {
    //console.log("aaa")
    const inputProps = await req.json()
    const uniqueId = uuidv4();
    const jsonFilePath = `public/${uniqueId}.json`;
    const videoFilePath = `public/${uniqueId}.mp4`;
    const storageRef = ref(storage, `video-files/${uniqueId}.mp4`);
    //console.log("bbbb")
    
    await writeFile(jsonFilePath, JSON.stringify(inputProps));
    //console.log("dddd")
    const command = `remotion render remotion/index.jsx Empty ${videoFilePath} --props=${jsonFilePath} --width=${inputProps.width} --height=${inputProps.height}`;
    //console.log("cccc")
    //console.log("command", command);

    const execPromise = (command) => {
      return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            reject(new Error(`Render failed: ${stderr}`));
          } else {
            //console.log(`stdout: ${stdout}`);
            resolve(stdout);
          }
        });
      });
    };

    await execPromise(command);

    const videoBuffer = await readFile(videoFilePath);
    await uploadBytes(storageRef, videoBuffer, { contentType: "video/mp4" });
    const downloadFirebaseUrl = await getDownloadURL(storageRef);

    await db
    .update(VideoData)
    .set({
      downloadUrl: downloadFirebaseUrl, // Đảm bảo `downloadUrl` có giá trị hợp lệ
    })
    .where(eq(VideoData.id, Number(videoId))); // Loại bỏ `?.` nếu `VideoData` luôn tồn tại

    return NextResponse.json({ 'result': 'success', 'videoFilePath': downloadFirebaseUrl });
  } catch (e) {
    return NextResponse.json({ 'Error': e.message });
  }
}
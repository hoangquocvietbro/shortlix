"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { db } from "configs/db";
import { VideoData } from "configs/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import RemotionVideo from "./RemotionVideo"; // Keep this for rendering
import { Player } from "@remotion/player"; // Still needed for rendering
import { toast } from "sonner";


function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [durationInFrame, setDurationInFrame] = useState(100);
  const router = useRouter();
  const videoRef = useRef();

  useEffect(() => {
    setOpenDialog(playVideo);
    if (playVideo && videoId) {
      getVideoData();
    }
  }, [playVideo, videoId]);

  const getVideoData = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(VideoData)
        .where(eq(VideoData?.id, videoId));

      if (result?.length > 0) {
        setVideoData(result[0]);
      } else {
        alert("Video not found!");
        setVideoData(null); // Clear video data if not found
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
      alert("Failed to fetch video data.");
      setVideoData(null); // Clear video data on error
    } finally {
      setLoading(false);
    }
  };
  const renderVideo = async () => {
    if (!videoData) {
      toast.error("No video data available to export!");
      return;
    }
  
    try {
      const response = await fetch('/api/render-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId: videoData.id,
          script: videoData.script,
          imageList: videoData.imageList,
          audioFileUrl: videoData.audioFileUrl,
          captions: videoData.captions,
          durationInFrames: Number(durationInFrame.toFixed(0)), // Pass the dynamic duration
          fps: 30, // You can make this dynamic as well
          width: 300, // You can make this dynamic as well
          height: 374 // You can make this dynamic as well
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate video');
      }
  
      const result = await response.json();
      const videoFilePath = result.videoFilePath;
      // Create a download link
      const link = document.createElement('a');
      link.href = videoFilePath;
      link.download = 'exported_video.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      toast.success("Video exported successfully!");
    } catch (error) {
      console.error("Error exporting video:", error);
      toast.error("Failed to export video.");
    }
  };
  const handleDownload = () => {
    if (!videoData?.downloadUrl) {
      toast.error("No download URL available!");
      return;
    }

    const link = document.createElement('a');
    link.href = videoData.downloadUrl;
    link.target = "_blank"
    link.download = 'exported_video.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Video downloaded successfully!");
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-neutral-800 border-primary rounded-md flex flex-col items-center justify-center pl-28">
        <DialogHeader>
          {loading ? (
            <span className="text-center">Loading video data...</span>
          ) : (
            <DialogTitle className="flex text-center text-xl font-bold my-5 ml-14">
              {videoData ? "Your video is ready!" : "Your video is not found!"}
            </DialogTitle>
            
          )}

          <DialogDescription className="w-full h-full">
            {loading ? (
              <span className=" flex">
                Loading video data...
              </span>
            ) : videoData ? (
              <>
                                          {videoData.downloadUrl ? (
                    <>
                      <Button onClick={handleDownload} className=" flex items-center justify-center text-center">Download</Button>
                    </>
                  ) : (
                    <div></div>
                  )}
                <Player
                  className="w-full h-full mr-20 mx-auto rounded-md"
                  ref={videoRef}
                  component={RemotionVideo}
                  durationInFrames={Number(durationInFrame.toFixed(0))}
                  compositionWidth={300}
                  compositionHeight={450}
                  fps={30}
                  controls={true}
                  inputProps={{
                    ...videoData,
                    setDurationInFrame: (frameValue) =>
                      setDurationInFrame(frameValue),
                  }}
                />
                <div className="flex gap-x-10 ml-12 my-5 ">
                  <Button
                    variant="outline"
                    className="bg-transparent dark:border-primary text-gray-300 hover:text-primary hover:bg-transparent"
                    onClick={() => {
                      router.replace("/dashboard");
                      setOpenDialog(false);
                      setVideoData(null); // Clear video data when dialog closes
                    }}
                  >
                    Cancel
                  </Button>
                  {videoData.downloadUrl ? (
                    <>
                      <Button                     
                        variant="outline"
                        className="bg-transparent dark:border-primary text-gray-300 hover:text-primary hover:bg-transparent" 
                        onClick={renderVideo}>Re-render</Button>
                    </>
                  ) : (
                    <Button onClick={renderVideo}>Render</Button>
                  )}
                  
                 
                </div>
              </>
            ) : (
              <span className="flex items-center text-center ml-6">
                No video data found.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;

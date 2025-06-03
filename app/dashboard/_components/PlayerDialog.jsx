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
import RemotionVideo from "./RemotionVideo";
import { Player } from "@remotion/player";
import { toast } from "sonner";
import VideoSettings from './VideoSettings';
import CaptionSettings from './CaptionSettings';
import CustomLoading from "../../../components/ui/CustomLoading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";



function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [durationInFrame, setDurationInFrame] = useState(100);
  const [animationType, setAnimationType] = useState("zoom");
  const [captionPosition, setCaptionPosition] = useState("bottom");
  const [captionColor, setCaptionColor] = useState("#FFFFFF");
  const [captionSize, setCaptionSize] = useState(24);
  const [captionFont, setCaptionFont] = useState("Arial");
  const [showCaptions, setShowCaptions] = useState(true);
  const [captionBold, setCaptionBold] = useState(false);
  const [captionItalic, setCaptionItalic] = useState(false);
  const [captionUppercase, setCaptionUppercase] = useState(false);
  const router = useRouter();
  const videoRef = useRef();
  const [openAlert, setOpenAlert] = useState(false);

  const handleVideoDataChange = (updatedVideoData) => {
    setVideoData(updatedVideoData);
    // API call to update video settings here
  };
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
        setVideoData(null);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
      alert("Failed to fetch video data.");
      setVideoData(null);
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
      const response = await fetch("/api/render-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...videoData,
          durationInFrames: Math.floor(videoData.captions[videoData.captions.length - 1].end / 1000 * 30),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate video");
      }

      const result = await response.json();
      const videoFilePath = result.videoFilePath;
      const link = document.createElement("a");
      link.href = videoFilePath;
      link.download = "exported_video.mp4";
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

    const link = document.createElement("a");
    link.href = videoData.downloadUrl;
    link.target = "_blank";
    link.download = "exported_video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Video downloaded successfully!");
  };

  const handleEditClick = () => {
    router.push(`/dashboard/edit-video?videoId=${videoId}`);
  };

  const confirmRemoveVideo = () => {
    setOpenAlert(true);
  };

  const handleRemoveClick = async () => {
    setOpenAlert(false); // Close the confirmation dialog

    if (!videoId) {
      toast.error("No video ID available to remove!");
      return;
    }

    try {
      setLoading(true);

      // Delete from the database using Drizzle ORM
      await db.delete(VideoData).where(eq(VideoData.id, videoId));

      toast.success("Video removed successfully!");
      setOpenDialog(false); // Close the dialog
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error removing video:", error);
      toast.error("Failed to remove video.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-neutral-800 border-primary rounded-md flex flex-col items-center justify-center">
          <DialogHeader style={{width: 356}}>
            {loading ? (
              <span className="text-center">Loading video data...</span>
            ) : (
              <DialogTitle className="flex text-center text-base font-bold my-5 ml-14">
                {videoData ? "Your video is ready!" : "Your video is not found!"}
              </DialogTitle>
            )}

            <DialogDescription className="w-full h-full">
              <div className="overflow-y-auto max-h-[60vh] p-4">
                {loading ? (
                  <span className="flex">Loading video data...</span>
                ) : videoData ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <VideoSettings videoData={videoData} onVideoDataChange={handleVideoDataChange} />
                      <CaptionSettings videoData={videoData} onVideoDataChange={handleVideoDataChange} />
                    </div>

                    {videoData.downloadUrl ? (
                      <>

                      </>
                    ) : (
                      <div></div>
                    )}
                    <div style={{ 
                      width: '100%', 
                      maxWidth: '300px', 
                      height: 'auto',
                      margin: '0 auto'
                    }}>
                      <div>
                      <Button
                          onClick={handleDownload}
                          className="flex items-center justify-center text-center"
                        >
                          Download
                        </Button><br></br>
                        <Player doubleClickToFullscreen={true}
                          allowFullscreen={true}
                          className="w-full h-full mx-auto rounded-md"
                          ref={videoRef}
                          numberOfSharedAudioTags={videoData.captions.length}
                          component={RemotionVideo}
                          durationInFrames={Math.floor(videoData.captions[videoData.captions.length - 1].end / 1000 * 30)}
                          compositionWidth={Math.min(300, window.innerWidth - 32)}
                          compositionHeight={Number((videoData.height * Math.min(300, window.innerWidth - 32) / videoData.width).toFixed(0))}
                          fps={30}
                          controls={true}
                          inputProps={{
                            ...videoData
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex gap-x-10 ml-12 my-5">
                      <Button
                        variant="outline"
                        className="bg-transparent dark:border-primary text-gray-300 hover:text-primary hover:bg-transparent"
                        onClick={() => {
                          router.replace("/dashboard");
                          setOpenDialog(false);
                          setVideoData(null);
                        }}
                      >
                        Cancel
                      </Button>
                      {videoData.downloadUrl ? (
                        <>
                          <Button
                            variant="outline"
                            className="bg-transparent dark:border-primary text-gray-300 hover:text-primary hover:bg-transparent"
                            onClick={renderVideo}
                          >
                            Re-render
                          </Button>
                        </>
                      ) : (
                        <Button className="bg-blue-500 text-white hover:bg-blue-700 dark:border-blue-500 dark:hover:bg-red-700 dark:text-white" onClick={renderVideo}>Render</Button>
                      )}
                    </div>
                    <div className="flex gap-x-10 ml-12 my-5">

                      <Button
                         onClick={handleEditClick}>Edit Video</Button>
                    </div>
                    <div className="flex gap-x-10 ml-12 my-5">
                      <Button
                        variant="outline"
                        className="bg-red-500 text-white hover:bg-red-700 dark:border-red-500 dark:hover:bg-red-700 dark:text-white"
                        onClick={handleRemoveClick}
                      >
                        Remove Video
                      </Button>
                    </div>
                  </>
                ) : (
                  <span className="flex items-center text-center ml-6">
                    No video data found.
                  </span>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PlayerDialog;


"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { VideoTranslator } from "../../../components/VideoTranslator";

export default function TranslateVideo() {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const uploadToGoogleDrive = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/upload-to-drive', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      return response.data.publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const publicUrl = await uploadToGoogleDrive(file);
      toast.success('Video uploaded successfully!');
      setSelectedVideoUrl(publicUrl);
    } catch (error) {
      toast.error(`Failed to upload video: ${error.message}`);
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (!videoUrl) {
      toast.error('Please enter a video URL');
      return;
    }
    setSelectedVideoUrl(videoUrl);
  };

  const handleContinue = () => {
    if (!selectedVideoUrl) {
      toast.error('Please upload a video or enter a video URL first');
      return;
    }
    // Chuyển đến trang translate với video URL
    router.push(`/dashboard/translate-video/translate?videoUrl=${encodeURIComponent(selectedVideoUrl)}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Translate Video</h1>
      
      {!selectedVideoUrl ? (
        <div className="space-y-4">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Video</TabsTrigger>
              <TabsTrigger value="url">Enter URL</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4">
              <div>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </div>

              {uploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={!file || uploading}
              >
                {uploading ? 'Uploading...' : 'Upload Video'}
              </Button>
            </TabsContent>

            <TabsContent value="url" className="space-y-4">
              <div>
                <Input
                  type="url"
                  placeholder="Enter video URL"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>

              <Button
                onClick={handleUrlSubmit}
                disabled={!videoUrl}
              >
                Use URL
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-lg">
            <p className="text-sm">Selected Video:</p>
            <p className="text-sm break-all">{selectedVideoUrl}</p>
          </div>
          
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setSelectedVideoUrl("")}
            >
              Change Video
            </Button>
            
            <Button
              onClick={handleContinue}
            >
              Continue to Translate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

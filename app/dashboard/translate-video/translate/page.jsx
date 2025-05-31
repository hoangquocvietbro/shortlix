"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { VideoTranslator } from "@/components/VideoTranslator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { toast } from "sonner";

export default function TranslatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState("");
  const [translationResult, setTranslationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [pollingInterval, setPollingInterval] = useState(null);

  useEffect(() => {
    const url = searchParams.get("videoUrl");
    if (!url) {
      router.push("/dashboard/translate-video");
      return;
    }
    setVideoUrl(url);
  }, [searchParams, router]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  const checkTranslationStatus = useCallback(async (jobId) => {
    try {
      const response = await fetch(`/api/check-job?jobId=${jobId}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error);
      }
      
      return data.job;
    } catch (error) {
      console.error('Failed to check translation status:', error);
      throw error;
    }
  }, []);

  const startPolling = useCallback((jobId) => {
    const interval = setInterval(async () => {
      try {
        const checkJob = await checkTranslationStatus(jobId);
        const job = checkJob.job;
        console.log('job', job);
        
        if (job.status === 'done') {
          clearInterval(interval);
          setPollingInterval(null);
          setIsLoading(false);
          setTranslationResult(job.result);
          toast.success('Translation completed successfully!');
        } else if (job.status === 'error') {
          clearInterval(interval);
          setPollingInterval(null);
          setIsLoading(false);
          toast.error(`Translation failed: ${job.error}`);
        }
        // If status is 'pending', continue polling
      } catch (error) {
        clearInterval(interval);
        setPollingInterval(null);
        setIsLoading(false);
        toast.error('Failed to check translation status');
      }
    }, 50000); // Check every 5 seconds

    setPollingInterval(interval);
  }, [checkTranslationStatus]);

  const handleTranslate = async (settings) => {
    setIsLoading(true);
    setTranslationResult(null);
    
    try {
      const formData = new FormData();
      formData.append('videoUrl', videoUrl);
      Object.entries(settings).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('/api/start-job', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      
      setCurrentJobId(data.jobId);
      startPolling(data.jobId);
      toast.info('Translation started. This may take a few minutes...');
    } catch (error) {
      console.error('Translation failed:', error);
      toast.error('Failed to start translation');
      setIsLoading(false);
    }
  };

  if (!videoUrl) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/translate-video")}
        >
          Back
        </Button>
        <h1 className="text-2xl font-bold">Translate Video</h1>
      </div>

      <div className="grid grid-cols-1 ">
        {/* Translation Settings */}
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <VideoTranslator 
              videoUrl={videoUrl} 
              onTranslate={handleTranslate}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>

      {/* Translation Results */}
      {translationResult && (
        <Card className="mt-6 bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Translation Results</h2>
            
            {/* Translated Video */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <video
                src={translationResult.data[0][0].url}
                controls
                className="w-full h-full"
              />
            </div>

            {/* Download Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => window.open(translationResult.data[0][0].url, '_blank')}
              >
                <Download className="w-4 h-4" />
                Download Translated Video
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => window.open(translationResult.data[0][1].url, '_blank')}
              >
                <Download className="w-4 h-4" />
                Download Vietnamese Subtitles
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => window.open(translationResult.data[0][2].url, '_blank')}
              >
                <Download className="w-4 h-4" />
                Download Original Subtitles
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 
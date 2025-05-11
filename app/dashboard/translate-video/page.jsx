"use client";
import { VideoTranslator } from '@/components/VideoTranslator';

export default function TranslateVideoPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Video Translation</h1>
      <p className="text-muted-foreground">
        Translate your videos to different languages with AI-powered voice synthesis
      </p>
      <VideoTranslator />
    </div>
  );
}

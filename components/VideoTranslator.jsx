import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LANGUAGES = [
  { value: "Automatic detection", label: "Automatic detection" },
  { value: "English (en)", label: "English" },
  { value: "Vietnamese (vi)", label: "Vietnamese" },
  // Add more languages as needed
];

const WHISPER_MODELS = [
  { value: "tiny", label: "Tiny" },
  { value: "base", label: "Base" },
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "large-v3", label: "Large V3" },
];

const TTS_SPEAKERS = [
  { value: "_XTTS_/AUTOMATIC.wav", label: "XTTS Automatic" },
  { value: ">alloy HD OpenAI-TTS", label: "Alloy HD OpenAI-TTS" },
  { value: "k-mms VITS", label: "K-MMS VITS" },
  { value: "ky-facebook-mms VITS", label: "Facebook MMS VITS" },
];

const OUTPUT_TYPES = [
  { value: "video (mp4)", label: "Video (MP4)" },
  { value: "video (mkv)", label: "Video (MKV)" },
  { value: "audio (mp3)", label: "Audio (MP3)" },
  { value: "audio (ogg)", label: "Audio (OGG)" },
  { value: "audio (wav)", label: "Audio (WAV)" },
  { value: "subtitle", label: "Subtitle" },
  { value: "subtitle [by speaker]", label: "Subtitle [by speaker]" },
  { value: "video [subtitled] (mp4)", label: "Video with subtitles (MP4)" },
  { value: "video [subtitled] (mkv)", label: "Video with subtitles (MKV)" },
];

const DIARIZATION_MODELS = [
  { value: "pyannote_3.1", label: "Pyannote 3.1" },
  { value: "pyannote_2.1", label: "Pyannote 2.1" },
  { value: "disable", label: "Disable" },
];

const TRANSLATION_PROCESSES = [
  { value: "google_translator_batch", label: "Google Translator (Batch)" },
  { value: "google_translator", label: "Google Translator" },
  { value: "gpt-3.5-turbo-0125_batch", label: "GPT-3.5 Turbo (Batch)" },
  { value: "gpt-3.5-turbo-0125", label: "GPT-3.5 Turbo" },
  { value: "gpt-4-turbo-preview_batch", label: "GPT-4 Turbo (Batch)" },
  { value: "gpt-4-turbo-preview", label: "GPT-4 Turbo" },
  { value: "disable_translation", label: "Disable Translation" },
];

export function VideoTranslator() {
  const [isLoading, setIsLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [settings, setSettings] = useState({
    sourceLanguage: "Automatic detection",
    targetLanguage: "English (en)",
    whisperModel: "large-v3",
    maxSpeakers: 1,
    ttsSpeaker: "_XTTS_/AUTOMATIC.wav",
    outputType: "video (mp4)",
    enableVoiceImitation: false,
    enableDereverb: true,
    enableSubtitles: true,
    subtitleType: "srt",
    enableSoftSubtitles: true,
    enableBurnSubtitles: false,
    enableOverlapReduction: true,
    enableSoundCleanup: true,
    enableLiteralizeNumbers: true,
    segmentDurationLimit: 10,
    diarizationModel: "pyannote_3.1",
    translationProcess: "google_translator_batch",
    audioMixingMethod: "Mixing audio with sidechain compression",
    maxAudioAcceleration: 1.0,
    enableAccelerationRateRegulation: true,
    volumeOriginalAudio: 0.0,
    volumeTranslatedAudio: 1.0,
    enableVoicelessTrack: true,
    maxSamples: 1,
    enableRemovePreviousSamples: true,
    voiceImitationMethod: "freevc",
    textSegmentationScale: "sentence",
    workers: 3,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('videoFile', videoFile);
      Object.entries(settings).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('/api/translate-video', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      
      // Handle successful translation
      console.log('Translation result:', data.result);
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">Video Translation</CardTitle>
          <CardDescription className="text-neutral-400">
            Translate video content using SoniTranslate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video Upload */}
            <div className="space-y-2">
              <Label>Video File</Label>
              <Input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </div>

            {/* Language Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Source Language</Label>
                <Select
                  value={settings.sourceLanguage}
                  onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, sourceLanguage: value }))
                  }
                >
                  <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-700">
                    {LANGUAGES.map(lang => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Target Language</Label>
                <Select
                  value={settings.targetLanguage}
                  onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, targetLanguage: value }))
                  }
                >
                  <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-700">
                    {LANGUAGES.map(lang => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Whisper Model */}
            <div className="space-y-2">
              <Label>Whisper ASR Model</Label>
              <Select
                value={settings.whisperModel}
                onValueChange={(value) => 
                  setSettings(prev => ({ ...prev, whisperModel: value }))
                }
              >
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  {WHISPER_MODELS.map(model => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Speakers */}
            <div className="space-y-2">
              <Label>Max Speakers</Label>
              <Slider
                value={[settings.maxSpeakers]}
                min={1}
                max={12}
                step={1}
                onValueChange={([value]) => 
                  setSettings(prev => ({ ...prev, maxSpeakers: value }))
                }
              />
            </div>

            {/* TTS Speaker */}
            <div className="space-y-2">
              <Label>TTS Speaker</Label>
              <Select
                value={settings.ttsSpeaker}
                onValueChange={(value) => 
                  setSettings(prev => ({ ...prev, ttsSpeaker: value }))
                }
              >
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  {TTS_SPEAKERS.map(speaker => (
                    <SelectItem key={speaker.value} value={speaker.value}>
                      {speaker.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Output Type */}
            <div className="space-y-2">
              <Label>Output Type</Label>
              <Select
                value={settings.outputType}
                onValueChange={(value) => 
                  setSettings(prev => ({ ...prev, outputType: value }))
                }
              >
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  {OUTPUT_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enableVoiceImitation"
                  checked={settings.enableVoiceImitation}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, enableVoiceImitation: checked }))
                  }
                  className="border-neutral-700"
                />
                <Label htmlFor="enableVoiceImitation">Enable Voice Imitation</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enableDereverb"
                  checked={settings.enableDereverb}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, enableDereverb: checked }))
                  }
                  className="border-neutral-700"
                />
                <Label htmlFor="enableDereverb">Enable Dereverb</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enableSubtitles"
                  checked={settings.enableSubtitles}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, enableSubtitles: checked }))
                  }
                  className="border-neutral-700"
                />
                <Label htmlFor="enableSubtitles">Enable Subtitles</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enableSoftSubtitles"
                  checked={settings.enableSoftSubtitles}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, enableSoftSubtitles: checked }))
                  }
                  className="border-neutral-700"
                />
                <Label htmlFor="enableSoftSubtitles">Enable Soft Subtitles</Label>
              </div>
            </div>

            {/* Translation Process */}
            <div className="space-y-2">
              <Label>Translation Process</Label>
              <Select
                value={settings.translationProcess}
                onValueChange={(value) => 
                  setSettings(prev => ({ ...prev, translationProcess: value }))
                }
              >
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700">
                  {TRANSLATION_PROCESSES.map(process => (
                    <SelectItem key={process.value} value={process.value}>
                      {process.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Audio Settings */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Volume Original Audio</Label>
                <Slider
                  value={[settings.volumeOriginalAudio]}
                  min={0}
                  max={2.5}
                  step={0.1}
                  onValueChange={([value]) => 
                    setSettings(prev => ({ ...prev, volumeOriginalAudio: value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Volume Translated Audio</Label>
                <Slider
                  value={[settings.volumeTranslatedAudio]}
                  min={0}
                  max={2.5}
                  step={0.1}
                  onValueChange={([value]) => 
                    setSettings(prev => ({ ...prev, volumeTranslatedAudio: value }))
                  }
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isLoading || !videoFile}
              className="w-full bg-primary hover:bg-primary/90 text-black"
            >
              {isLoading ? "Translating..." : "Translate Video"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

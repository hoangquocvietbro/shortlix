"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomLoading from "./_components/CustomLoading";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

function CreateImage() {
  const [prompt, setPrompt] = useState("");
  const [width, setWidth] = useState("1024");
  const [height, setHeight] = useState("1820");
  const [model, setModel] = useState("flux");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  const handleGenerateImage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/generate-image", {
        prompt,
        width,
        height,
        model,
      });
      setImageUrl(response.data.result);
      //console.log(response.data.result)
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto ">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="font-bold text-3xl text-primary">
          Create Image
        </h2>
      </div>

      <div className="grid grid-cols-1">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <div className="space-y-4">
              <textarea
                type="text"
                placeholder="Enter prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded-md text-sm text-white"
              />
              <div className="flex gap-2">
                <select
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="p-2 bg-neutral-800 border border-neutral-700 rounded-md text-sm text-white"
                >
                  <option value="128">128</option>
                  <option value="256">256</option>
                  <option value="512">512</option>
                  <option value="480">480</option>
                  <option value="720">720</option>
                  <option value="1024">1024</option>
                  <option value="1280">1280</option>
                  <option value="1820">1820</option>
                  <option value="1920">1920</option>
                </select>
                <select
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="p-2 bg-neutral-800 border border-neutral-700 rounded-md text-sm text-white"
                >
                  <option value="128">128</option>
                  <option value="256">256</option>
                  <option value="512">512</option>
                  <option value="480">480</option>
                  <option value="720">720</option>
                  <option value="1024">1024</option>
                  <option value="1280">1280</option>
                  <option value="1820">1820</option>
                  <option value="1920">1920</option>
                </select>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="p-2 bg-neutral-800 border border-neutral-700 rounded-md text-sm text-white"
                >
                  <option value="flux">Flux</option>
                  <option value="flux-pro">Flux-Pro</option>
                  <option value="flux-realism">Flux-Realism</option>
                  <option value="flux-anime">Flux-Anime</option>
                  <option value="flux-3d">Flux-3D</option>
                  <option value="flux-cablyai">Flux-CablyAI</option>
                  <option value="turbo">Turbo</option>
                </select>
              </div>
              <Button 
                onClick={handleGenerateImage} 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Create Image"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {imageUrl && (
        <Card className="mt-6 bg-neutral-900 border-neutral-800">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Generated Image</h2>
            <img src={imageUrl} alt="Generated" className="w-full rounded-lg" />
          </CardContent>
        </Card>
      )}

      <CustomLoading loading={isLoading} title="Image" message="Generating image..." />
    </div>
  );
}

export default CreateImage;
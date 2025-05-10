"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomLoading from "./_components/CustomLoading";
import axios from "axios";

function CreateImage() {
  const [prompt, setPrompt] = useState("");
  const [width, setWidth] = useState("1024");
  const [height, setHeight] = useState("1820");
  const [model, setModel] = useState("flux");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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
    <div>
      <h2 className="font-bold text-3xl text-primary">Create Image</h2>
      <div className="mt-5">
        <textarea
          type="text"
          placeholder="Enter prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border p-2 w-full text-sm"
        />
        <div className="flex mt-3">
          <select
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="border p-2 mr-2 text-sm"
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
            className="border p-2 mr-2 text-sm"
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
          <select style={{width: 100}}
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border p-2 text-sm"
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
        <Button onClick={handleGenerateImage} className="mt-5">
          Create Image
        </Button>
      </div>
      <CustomLoading loading={isLoading} title="Image" message="Generating image..." />
      {imageUrl && (
        <div className="mt-5">
          <h3 className="font-bold">Generated Image:</h3>
          <img src={imageUrl} alt="Generated" className="mt-2" />
        </div>
      )}
    </div>
  );
}

export default CreateImage;
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "configs/db";
import { VideoData } from "configs/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "configs/FierbaseConfig";
import { v4 as uuidv4 } from 'uuid';
function EditVideoPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const videoId = searchParams.get("videoId");
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [script, setScript] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [dummyState, setDummyState] = useState(0); // Force re-render

    useEffect(() => {
        if (videoId) {
            fetchVideoData(videoId);
        }
    }, [videoId]);
    const fetchVideoData = async (id) => {
        setLoading(true);
        try {
            const result = await db.select().from(VideoData).where(eq(VideoData.id, id));
            if (result.length > 0) {
                setVideo(result[0]);
                setScript(result[0].script);
                setImageList(result[0].imageList);
            } else {
                console.log("Video not found");
            }
        } catch (error) {
            console.error("Error fetching video:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleScriptChange = (index, field, value) => {
        // Create a DEEP copy of the script
        const newScript = JSON.parse(JSON.stringify(script));
        newScript[index][field] = value;
        console.log(value)
        setScript(newScript);
    };
    const handleImageUpload = async (index, e) => {
        const file = e.target.files[0];
        if (!file) return;
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
            // Create a DEEP copy of the imageList
            const newImageList = JSON.parse(JSON.stringify(imageList));
            newImageList[index] = imageUrl;
            setImageList(newImageList);
            setDummyState(prev => prev + 1); // Force re-render
        } else {
            toast.error("Image upload failed.");
        }
    };
    const regenerateImage = async (index) => {
        const imagePrompt = script[index].imagePrompt;
        try {
            const response = await fetch("/api/generate-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: imagePrompt }),
            });
            if (!response.ok) {
                throw new Error("Failed to generate image");
            }
            const result = await response.json(); console.log(result.result)
            // Create a DEEP copy of the imageList
            const newImageList = JSON.parse(JSON.stringify(imageList));
            newImageList[index] = result.result;
            setImageList(newImageList);
            setDummyState(prev => prev + 1); // Force re-render
            toast.success("Image regenerated successfully!");
        } catch (error) {
            console.error("Error generating image:", error);
            toast.error("Failed to generate image.");
        }
    };
    const regenerateAudio = async (index) => {
        const contentText = script[index].ContentText;
        try {
            const response = await fetch("/api/generate-audio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: contentText }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate audio");
            }
            const result = await response.json();
            // Handle the audio result (e.g., update audioFileUrl in video data)
            toast.success("Audio regenerated successfully!");
        } catch (error) {
            console.error("Error generating audio:", error);
            toast.error("Failed to generate audio.");
        }
    };
    const regenerateCaption = async (index) => {
        const contentText = script[index].ContentText;
        try {
            const response = await fetch("/api/generate-caption", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: contentText }),
            });
            if (!response.ok) {
                throw new Error("Failed to generate caption");
            }
            const result = await response.json();
            // Handle the caption result (e.g., update captions in video data)
            toast.success("Caption regenerated successfully!");
        } catch (error) {
            console.error("Error generating caption:", error);
            toast.error("Failed to generate caption.");
        }
    };
    const saveChanges = async () => {
        try {
            await db
                .update(VideoData)
                .set({ script: script, imageList: imageList })
                .where(eq(VideoData.id, videoId));
                
            toast.success("Video updated successfully!");
            router.push("/dashboard"); // Redirect to dashboard after saving
        } catch (error) {
            console.error("Error updating video:", error);
            toast.error("Failed to update video.");
        }
    };
    // Placeholder function for image upload

    const uploadImage = async (file) => {
        try {
          const storageRef = ref(storage, `images/${uuidv4()}-${file.name}`); // Use UUID to avoid filename conflicts
          const snapshot = await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);
          console.log('File available at', downloadURL);
          return downloadURL;
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image to Firebase Storage.");
          return null;
        }
      };
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!video) {
        return <div>Video not found</div>;
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Video</h1>
            {script.map((item, index) => (
                <div key={index} className="mb-8 border rounded p-4">
                    <div className="mb-4">
                        <img src={imageList[index]} alt={`Image ${index}`} className="w-64 h-64 object-cover rounded" />
                        <input
                            type="file"
                            onChange={(e) => handleImageUpload(index, e)}
                            className="mt-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white-900 text-sm font-bold mb-2" htmlFor={`imagePrompt-${index}`}>
                            Image Prompt:
                        </label>
                        <Textarea
                            id={`imagePrompt-${index}`}
                            value={item.imagePrompt}
                            onChange={(e) => handleScriptChange(index, "imagePrompt", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-900 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <Button onClick={() => regenerateImage(index)} className="mt-2">
                            Regenerate Image
                        </Button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-white-900 text-sm font-bold mb-2" htmlFor={`contentText-${index}`}>
                            Content Text:
                        </label>
                        <Textarea
                            id={`contentText-${index}`}
                            value={item.ContentText}
                            onChange={(e) => handleScriptChange(index, "ContentText", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-900 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <Button onClick={() => regenerateAudio(index)} className="mt-2">
                        Regenerate Audio
                    </Button>
                    <Button onClick={() => regenerateCaption(index)} className="mt-2">
                        Regenerate Caption
                    </Button>
                </div>
            ))}
            <Button onClick={saveChanges} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Save Changes
            </Button>
        </div>
    );
}
export default EditVideoPage;



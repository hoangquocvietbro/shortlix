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
    const [audioFileUrls, setAudioFileUrls] = useState([]);
    const [captionsList, setCaptionsList] = useState([]);
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
                setCaptionsList(result[0].audioFileUrl);
                setAudioFileUrls(result[0].captionsList);
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
        if (newScript[index]?.[field] !== value.trim())
        {

            newScript[index][field] = value;
            

        }    
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

    const generateAudio = async (text) => {


                const id = uuidv4();
                try {
                  const res = await axios.post("/api/generate-audio", {
                    text: item.ContentText,
                    id: id,
                    languageCode: video?.voiceLanguage,
                    ssmlGender: video?.voiceGender,
                    rate: video?.rate,
                    pitch: video?.pitch
                  });
          
                  const audioFileUrl = res?.data?.result;
                  ////console.log("Audio File URL:", audioFileUrl);
                  return  audioFileUrl;
          
                } catch (error) {
                  console.error("Error generating audio file:", error);
                    if (error.response) {
                        console.error("Error response:", error.response.data);
                    }
                }

    };

    const generateCaption = async (audioFileUrl) => {
        try {
            const result = await axios.post("/api/generate-caption", {
                audioFileUrl: fileUrls[i],
                language_code: formData?.voiceLanguage,
              });
              
              const captionData=result?.data?.result
              return captionData;

        } catch (error) {
            console.error("Error generating caption:", error);
            toast.error("Failed to generate caption.");
            return null;
        }
    };

    const saveChanges = async () => {
        try {
            // 1. Identify changed contentText values and generate new audio/captions
            const updatedAudioFileUrls = [];
            const updatedCaptionsLists = [];

            for (let i = 0; i < script.length; i++) {
                // Generate new audio and captions for each contentText
                const audioFileUrl = await generateAudio(script[i].ContentText);
                const captions = await generateCaption(script[i].ContentText);

                updatedAudioFileUrls.push(audioFileUrl);
                updatedCaptionsLists.push(captions);
            }

            // 2. Update the database with the new script, audio URLs, and captions
            await db
                .update(VideoData)
                .set({ script: script, imageList: imageList, audioFileUrl: updatedAudioFileUrls, captionsList: updatedCaptionsLists })
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
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-900 leading-tight focus:outline-none focus:shadow-outline"/>
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

                </div>
            ))}
            <Button onClick={saveChanges} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Save Changes
            </Button>
        </div>
    );
}
export default EditVideoPage;



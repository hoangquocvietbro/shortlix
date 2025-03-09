"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "configs/db";
import { VideoData } from "configs/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "configs/FierbaseConfig";
import { v4 as uuidv4 } from 'uuid';
import CustomLoading from "../../../components/ui/CustomLoading";
function EditVideoPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const videoId = searchParams.get("videoId");
    const [isGeneratingScript, setIsGeneratingScript] = useState(false);
    const [isUploadImage, setIsUploadImage] = useState(false);
    const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
    const [isGeneratingCaptions, setIsGeneratingCaptions] = useState(false);
    const [isGeneratingImages, setIsGeneratingImages] = useState(false);
    const [isSavingVideoData, setIsSavingVideoData] = useState(false);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [script, setScript] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [audioFileUrls, setAudioFileUrls] = useState([]);
    const [captionsList, setCaptionsList] = useState([]);
    const [dummyState, setDummyState] = useState(0); // Force re-render

    function flattenCaptions(captions) {
        let flatCaptions = [];
        let preLastEndTime = 0;
    
        for (const group of captions) {
            
            for (const item of group) {
                if (item.start !== null) {
                    item.start =item.start + preLastEndTime; // Gán start mới từ lastEndTime
                    item.end = item.end + preLastEndTime;
                }
                flatCaptions.push(item);
                 // Cập nhật lastEndTime
            }
            preLastEndTime += group[group.length-1].end;
        }
    
        return flatCaptions;
    }
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
                setCaptionsList(result[0].captionsList);
                setAudioFileUrls(result[0].audioFileUrl);
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
        setIsGeneratingImages(true);
        const imagePrompt = script[index].imagePrompt;
        try {
            const response = await fetch("/api/generate-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: imagePrompt,
                    width: video?.width,
                    height: video?.height
                 }),
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
        setIsGeneratingImages(false);
    };

    const generateAudio = async (text) => {
        setIsGeneratingAudio(true);

                const id = uuidv4();
                try {
                  const res = await axios.post("/api/generate-audio", {
                    text: text,
                    id: id,
                    languageCode: video?.languageCode,
                    ssmlGender: video?.ssmlGender,
                    rate: Number(video?.rate),
                    pitch: Number(video?.pitch)
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

        setIsGeneratingAudio(true);
    };

    const generateCaption = async (audioFileUrl) => {
        setIsGeneratingCaptions(true);
        try {
            const result = await axios.post("/api/generate-caption", {
                audioFileUrl: audioFileUrl,
                language_code: video?.voiceLanguage,
              });
              
              const captionData=result?.data?.result
              return captionData;

        } catch (error) {
            console.error("Error generating caption:", error);
            toast.error("Failed to generate caption.");
            return null;
        }
        setIsGeneratingCaptions(false);
    };

    const saveChanges = async () => {
        try {
            // Create an array to hold all the promises
            const promises = video?.script.map(async (originContent, index) => {
                if (originContent.ContentText !== script[index]["ContentText"].trim()) {
                    const audioFileUrl = await generateAudio(script[index].ContentText);
                    audioFileUrls[index] = audioFileUrl;
                    const caption = await generateCaption(audioFileUrl);
                    captionsList[index] = caption;
                    console.log(`Generated audio and caption for index ${index}`);
                    return { audioFileUrl, caption }; // Return the results if needed
                }
            });

            // Wait for all promises to resolve
            await Promise.all(promises);

            // Update the database with the new script, audio URLs, and captions
            setIsSavingVideoData(true)
            await db
                .update(VideoData)
                .set({ script: script, imageList: imageList, audioFileUrl: audioFileUrls, captionsList: captionsList,captions: flattenCaptions(video?.captionsList) })
                .where(eq(VideoData.id, videoId));
            setIsSavingVideoData(false)
            toast.success("Video updated successfully!");
            router.push("/dashboard"); // Redirect to dashboard after saving
        } catch (error) {
            console.error("Error updating video:", error);
            toast.error("Failed to update video.");
        }
    };

    // Placeholder function for image upload

    const uploadImage = async (file) => {
        setIsUploadImage(true)
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
        setIsUploadImage(false)
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
            <CustomLoading
        loading={
          isUploadImage||
          isGeneratingImages ||
          isGeneratingAudio ||
          isGeneratingCaptions ||
          isSavingVideoData
        }
        title={" Video"}
        message={
              isUploadImage
            ? "Uploading image file..."
            :  isGeneratingAudio
            ? "Generating audio file..."
            : isGeneratingCaptions
            ? "Generating captions..."
            : isGeneratingImages
            ? "Generating images..."
            : isSavingVideoData
            ? " Saving video data..."
            : ""
        }
      />
        </div>
    );
}
export default EditVideoPage;



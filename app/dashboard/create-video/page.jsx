"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import SelectDimensions from "./_components/SelectDimensions";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "../../../components/ui/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "app/_context/VideoDataContext";
import { db } from "configs/db";
import { Users, VideoData } from "configs/schema";
import { useUser } from "@clerk/nextjs";
import PlayerDialog from "../_components/PlayerDialog";
import { UserDetailContext } from "app/_context/UserDetailContext";
import { toast } from "sonner";
import { eq } from "drizzle-orm";
import SelectVoice from "./_components/SelectVoice";
import { useVideoData } from "app/Provider";
import { getAudioDurationInSeconds } from "@remotion/media-utils";

function CreateNew() {
  const [formData, setFormData] = useState({
    "topic": "Random AI Prompt",
    "imageStyle": "Realistic Photography",
    "duration": "0.25 minutes",
    "voiceLanguage": "en-US",
    "voiceGender": "Male",
    "rate": 0,
    "pitch": 0,
    "dimensions": { width: 720, height: 1080 }
});

  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [isGeneratingCaptions, setIsGeneratingCaptions] = useState(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [isSavingVideoData, setIsSavingVideoData] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrls, setAudioFileUrls] = useState([]); // Changed to array of audio URLs
  const [captions, setCaptions] = useState();
  const [captionsList, setCaptionsList] = useState();
  const [imageList, setImageList] = useState();
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState(1);
  const { videoData, setVideoData } = useVideoData(); // Access videoData from cont
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { user } = useUser();

  const onHandleInputChange = (fielName, fielValue) => {
    // ////console.log(fielName, fielValue);
    setFormData((prev) => ({ ...prev, [fielName]: fielValue }));
  };
  const onCreateClickHandler = () => {
    if (!userDetail || userDetail.credits <= 0) {
      toast("Insufficient credits");
      return;
    }
    getVideoScript();
  };

  //! GET VIDEO SCRIPT FROM API
  const getVideoScript = async () => {
    setIsGeneratingScript(true);
    // const prompt = `write a script to generate ${formData.duration} video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field . Each image prompt should evoke strong imagery, with attention to colors, composition, and mood.`;
    const prompt = `Create a compelling script for a ${formData.duration} video on the topic: "${formData.topic}".Video includes about ${Number(formData.duration.split(" ")[0])/0.2} - ${Number(formData.duration.split(" ")[0])/0.2+2} scene. For each scene, provide a detailed description of the visuals that should accompany the script. Specify the style as ${formData.imageStyle}, ensuring the image prompts capture the essence and tone of the script. The output should be in JSON format, with fields for 'imagePrompt' and 'ContentText'. Each image prompt should evoke strong imagery, with attention to colors, composition, and mood, each prompt create a image related the topic: "${formData.topic}", and next image is related with previous image helps the video content become more seamless like a film's script . The script language of 'ContentText' field should be in ${formData.voiceLanguage} and have a grandeur level of ${formData.voiceGender}`;
    // const prompt = `Create a compelling script for a ${formData.duration} video on the topic: "${formData.topic}". For each scene, provide a detailed description of the visuals that should accompany the script. Specify the style as ${formData.imageStyle}, ensuring the image prompts capture the essence and tone of the script. The voiceover should be in ${formData.voiceLanguage} and have a grandeur level of ${formData.voiceGender}. The output should be in JSON format, with fields for 'imagePrompt' and 'ContentText'. Each image prompt should evoke strong imagery, with attention to colors, composition, and mood.`;
    const result = await axios.post("/api/get-video-script", {
      prompt: prompt,
    });

    if (result?.data?.result) {
      setVideoData((prev) => ({ ...prev, videoScript: result?.data?.result }));
      setVideoScript(result?.data?.result);
      generateAudioFiles(result?.data?.result); // Changed function call
      setIsGeneratingScript(false);
    } else {
      setIsGeneratingScript(false);
    }
  };
    //! GENERATE AUDIO FILE FOR EACH SCENE
    const generateAudioFiles = async (videoScriptData) => {
      setIsGeneratingAudio(true);
      const audioUrls = [];
  
      for (const item of videoScriptData) {
        const id = uuidv4();
        try {
          const res = await axios.post("/api/generate-audio", {
            text: item.ContentText,
            id: id,
            languageCode: formData?.voiceLanguage,
            ssmlGender: formData?.voiceGender,
            rate: formData?.rate,
            pitch: formData?.pitch
          });
  
          const audioFileUrl = res?.data?.result;
          ////console.log("Audio File URL:", audioFileUrl);
          audioUrls.push(audioFileUrl);
  
        } catch (error) {
          console.error("Error generating audio file:", error);
            if (error.response) {
                console.error("Error response:", error.response.data);
            }
        }
      }
        setVideoData((prev) => ({ ...prev, audioFileUrls: audioUrls })); // Update video data
        setAudioFileUrls(audioUrls);
        setIsGeneratingAudio(false);
        if (audioUrls.length>0) {
             await generateAudioCaption(audioUrls, videoScriptData); // Generate captions
        }
      
    };
  //! GENERATE AUDIO CAPTION
  const generateAudioCaption = async (fileUrls, videoScriptData) => {
    setIsGeneratingCaptions(true);
    let captionsLst =[];
    let allCaptions = [];
    let preAudioDuration=0
    for(let i=0; i<fileUrls.length;i++){
      const result = await axios.post("/api/generate-caption", {
        audioFileUrl: fileUrls[i],
        language_code: formData?.voiceLanguage,
      });
      
      const captionData=result?.data?.result
      if (captionData) {
        const duration =await getAudioDurationInSeconds(fileUrls[i])
        //console.log(`duration audio ${i}: ${duration}`)
        captionData.push({"end": duration*1000})
        captionsLst.push({captionData})
        ////console.log(`Caption audio ${i}: ${JSON.stringify(captionData, null, 2)}`)
          for(let i=0; i<captionData.length;i++)
            {

             captionData[i].start=Number(captionData[i].start)+preAudioDuration
             captionData[i].end=Number(captionData[i].end)+preAudioDuration
            }

              
          preAudioDuration+=duration*1000          
          ////console.log("caption data:"+JSON.stringify(captionData, null, 2))
          allCaptions.push(captionData);
          ////console.log("caption data:"+JSON.stringify(allCaptions, null, 2))
       }
    }

    setVideoData(
      (prev) => ({
        ...prev,
        captionsList: allCaptions,
      }),
      setCaptionsList(allCaptions),
      allCaptions.length>0 && generateVideoImages(videoScriptData),
      setIsGeneratingCaptions(false)
    );
};
//! GENERATE VIDEO IMAGES
const generateVideoImages = async (videoScriptData) => {
  setIsGeneratingImages(true);
  let images = [];

  for (const element of videoScriptData) {
    try {
      const result = await axios.post("/api/generate-image", {
        prompt: element.imagePrompt,
        width: formData.dimensions.width,
        height: formData.dimensions.height,
      });
      ////console.log(result?.data?.result);
      images.push(result?.data?.result);
    } catch (error) {
      ////console.log(error);
      setIsGeneratingImages(false);
    }
  }

  setVideoData((prev) => ({
    ...prev,
    imageList: images,
    width: formData.dimensions.width,
    height: formData.dimensions.height,
  }));
  setImageList(images);
  setIsGeneratingImages(false);
};
//! SAVE VIDEO DATA TO DATABASE
const saveVideoData = async (videoData) => {
  setIsSavingVideoData(true);
  try {
    let videoCaptions =[]
    videoData?.captionsList.map((item)=> {videoCaptions.push(...item)})
    console.log(captionsList)
    console.log(videoCaptions)
    const result = await db
      .insert(VideoData)
      .values({
        script: videoData?.videoScript,
        audioFileUrl: videoData?.audioFileUrls,
        captions: videoCaptions,
        captionsList: videoData?.captionsList,
        imageList: videoData?.imageList,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        downloadURL: "",
        animationType: videoData?.animationType,
        captionPosition: videoData?.captionPosition,
        captionColor: videoData?.captionColor,
        captionSize: videoData?.captionSize,
        captionFont: videoData?.captionFont,
        showCaptions: videoData?.showCaptions,
        captionBold: videoData?.captionBold,
        captionItalic: videoData?.captionItalic,
        captionUppercase: videoData?.captionUppercase,
        width:videoData?.width,
        height:videoData?.height,
        languageCode: formData?.voiceLanguage,
        ssmlGender: formData?.voiceGender,
        rate: formData?.rate,
        pitch: formData?.pitch

      })
      .returning({ id: VideoData?.id });
    await updateUserCredits();
    setVideoId(result[0]?.id);
    setPlayVideo(true);
    ////console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error saving video data:", error);
    setIsSavingVideoData(false);
  } finally {
    setIsSavingVideoData(false);
  }
};

//! SAVE VIDEO DATA
useEffect(() => {
  ////console.log(videoData);

  // Check if videoData is an object and has properties
  if (
    videoData &&
    typeof videoData === "object" &&
    Object.keys(videoData).length >= 4
  ) {
    saveVideoData(videoData);
  }
}, [videoData]);
//! UPDATE USER CREDITS
const updateUserCredits = async () => {
  const result = await db
    .update(Users)
    .set({ credits: userDetail?.credits - 10 })
    .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
  ////console.log(result);
  setUserDetail((prev) => ({
    ...prev,
    credits: userDetail?.credits - 10,
  }));
  setVideoData(null);
};
return (
  <div>
    <h2 className="font-bold text-3xl text-primary ">Create New</h2>
    <div className="mt-10 shadow-md shadow-neutral-900 rounded-md p-10">
      {/* Select Topic */}
      <SelectTopic onUserSelect={onHandleInputChange} />
        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />
        {/* Select voice */}
        <SelectVoice onUserSelect={onHandleInputChange} />
        {/* Select Dimensions */}
        <SelectDimensions onUserSelect={onHandleInputChange} />
        {/* Create Button */}
        <Button
          onClick={onCreateClickHandler}
          className="mt-10 w-full font-bold"
        >
          Create Short Video
        </Button>
      </div>
      {/* Custom Loading Component */}

      <CustomLoading
        loading={
          isGeneratingScript ||
          isGeneratingAudio ||
          isGeneratingCaptions ||
          isGeneratingImages ||
          isSavingVideoData
        }
        title={" Video"}
        message={
          isGeneratingScript
            ? "Generating video script..."
            : isGeneratingAudio
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
      {/* Player Dialog */}
      <PlayerDialog playVideo={playVideo} videoId={videoId} />
    </div>
  );
}

export default CreateNew;




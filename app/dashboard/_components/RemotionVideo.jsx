import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

function RemotionVideo({
  script,
  imageList,
  audioFileUrl,
  captions,
  setDurationInFrame = () => {},
}) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const getDurationFrame = () => {
      // Determine total video duration based on captions
  const totalVideoDurationInSeconds =
  captions && captions.length > 0
    ? captions[captions.length - 1].end / 1000
    : 30; // Default fallback to 30 seconds

    setDurationInFrame((captions[captions?.length - 1]?.end / 1000) * fps);
    return (captions[captions?.length - 1]?.end / 1000) * fps;
  };

  const getCurrentCaptions = () => {
    const currentTime = (frame / fps) * 1000;
    console.log("Current time (ms):", currentTime);
    console.log("Captions:", captions);
    const currentCaption = captions.find(
      (word) => currentTime >= word.start && currentTime <= word.end
    );
    console.log("Selected caption:", currentCaption);
    return currentCaption ? currentCaption.text : "";
  };
    // Check if the first caption has confidence < 0.9
  const shouldShowCaptions =
    captions && captions.length > 0 && captions[0].confidence >= 0.9;
  

  return (
    script && (
      <AbsoluteFill className="bg-black">
        {imageList?.map((item, index) => {
          const startTime = (index * getDurationFrame()) / imageList?.length;
          const duration = getDurationFrame();

          const scale = (index) =>
            interpolate(
              frame,
              [startTime, startTime + duration / 2, startTime + duration], // Zoom in and then zoom out
              index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8], // Scale from 1 (original) to 1.2 (zoomed-in) and back to 1
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
          return (
            <Sequence
              key={item.id || index}
              from={startTime}
              durationInFrames={getDurationFrame()}
            >
               <AbsoluteFill
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Img
                  src={item}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale(index)})`,
                  }}
                />
                <AbsoluteFill
                  style={{
                    color: "white",
                    justifyContent: "center",
                    top: undefined,
                    bottom: 50,
                    height: 150,
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {shouldShowCaptions &&<h2 className="text-2xl">{getCurrentCaptions()}</h2>}
                </AbsoluteFill>
              </AbsoluteFill>
        
            </Sequence>
          );
        })}
        <Audio src={audioFileUrl} />
      </AbsoluteFill>
    )
  );
}

export default RemotionVideo;

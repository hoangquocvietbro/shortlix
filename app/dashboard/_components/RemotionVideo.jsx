import React from "react";
import { preloadAudio, resolveRedirect } from "@remotion/preload";
import applyAnimation from "./ApplyAnimation"
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig, Series
} from "remotion";

function RemotionVideo({
  script,
  imageList,
  audioFileUrl,
  captions,
  animationType = "zoom",
  captionPosition = "bottom",
  captionColor = "#FFFFFF",
  captionSize = 50,
  captionFont = "Arial",
  showCaptions = true,
  captionBold = false,
  captionItalic = false,
  captionUppercase = false,
  setDurationInFrame = () => { },
}) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();



  const getDurationFrame = () => {
    const totalVideoDurationInSeconds =
      captions && captions.length > 0
        ? captions[captions.length - 1].end / 1000
        : 30;

    setDurationInFrame(
      (captions[captions?.length - 1]?.end / 1000) * fps
    );
    return (captions[captions?.length - 1]?.end / 1000) * fps;
  };

  const getCurrentCaptions = () => {
    //console.log("ádaddddddas")
    //console.log(frame)
    //console.log(fps)
    const currentTime = (frame / fps) * 1000;
    //console.log("currentTime: " + currentTime)
    const currentCaption = captions.find(
      (word) => currentTime >= word.start && currentTime <= word.end
    );

    let text = currentCaption ? currentCaption.text : "";
    //console.log("currentCaption: " + text)
    if (captionUppercase) {
      text = text?.toUpperCase();
    }
    return text;
  };

  const shouldShowCaptions =
    showCaptions && captions && captions.length > 0 && captions[0].confidence >= 0;//nếu confidence nhỏ quá thì không hiển thị captions


  const getCaptionPosition = () => {
    switch (captionPosition) {
      case "top":
        return { top: 0, bottom: undefined };
      case "bottom":
      default:
        return { bottom: 0, top: undefined };
    }
  };
  const getCaptionStyle = () => {
    return {
      fontWeight: captionBold ? "bold" : "normal",
      fontStyle: captionItalic ? "italic" : "normal",
      textTransform: captionUppercase ? "uppercase" : "none",
    };
  };

  return (
    script && (
      <AbsoluteFill className="bg-black">
        {imageList?.map((item, index) => {

          const duration = getDurationFrame();
          let endCaption = captions.filter(
            (word) => word.start == null
          );
          endCaption.unshift({ "end": 0 });
          endCaption.pop();
          const startTime = endCaption[index].end / 1000 * fps
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
                    ...applyAnimation(index, startTime, duration, animationType,frame,interpolate),
                  }}
                />
                {shouldShowCaptions && (
                  <AbsoluteFill
                    style={{
                      transform: `scale(${300 / 720})`,
                      color: captionColor,
                      fontSize: `${captionSize?captionSize:50}px`,
                      fontFamily: captionFont,
                      justifyContent: "center",
                      textAlign: "center",
                      width: "100%",
                      textShadow: `${6}px ${6}px ${'#000000'}`,
                      height: 100 / 720 * 300,
                      ...getCaptionPosition(),
                      ...getCaptionStyle(),
                    }}
                  >
                    <h2>{getCurrentCaptions()}</h2>
                  </AbsoluteFill>
                )}
                <Audio src={audioFileUrl[index]} preload="auto" />
              </AbsoluteFill>
            </Sequence>
          );
        })}
      </AbsoluteFill>
    )
  );
}

export default RemotionVideo;


import RemotionVideo from "../app/dashboard/_components/RemotionVideo";
import React from "react";
import { Composition, getInputProps } from "remotion";

const defaultProps = {
    script: [], 
    imageList: [],
    audioFileUrl: [],
    captions: [],
    setDurationInFrame: () => {}
  };

const inputProps = getInputProps();

  // Set a fallback duration in case `--durationInFrames` isn't provided
const durationInFrames = inputProps.durationInFrames ?? 2000;
const fps = inputProps.fps ?? 30;
  
  
function RemotionRoot() {
  return (
    <>
      <Composition 
        id="Empty"
        component={RemotionVideo}
        durationInFrames={durationInFrames}
        fps={fps}
        width={720}
        height={1280}
        defaultProps={defaultProps}
      />
    </>
  );
}

export default RemotionRoot;

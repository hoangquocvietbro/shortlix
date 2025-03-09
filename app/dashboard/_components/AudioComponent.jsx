"use client";
import { preloadAudio, resolveRedirect } from "@remotion/preload";
import { Audio } from "remotion";

const AudioComponent = (audioFiles) => {

audioFiles.map((urlToLoad)=>resolveRedirect(urlToLoad)
  .then((resolved) => {
    // Was able to resolve a redirect, setting this as the audio to load
    urlToLoad = resolved;
  })
  .catch((err) => {
    // Was unable to resolve redirect e.g. due to no CORS support
    console.log("Could not resolve redirect", err);
  })
  .finally(() => {
    // In either case, we try to preload the original or resolved URL
    preloadAudio(urlToLoad);
  }));
 
// This code only executes once the component gets mounted

  return audioFiles;

};

export default AudioComponent;


import React from 'react';

function VideoSettings({ videoData, onVideoDataChange }) {

  const animations =["fadeInZoom","spinAndFade","bounceIn","parallax","slideInUp","slideInDown","slideOutLeft","slideOutRight","slideOutUp","slideOutDown","rotateIn","rotateOut","skewIn","skewOut","scaleIn","scaleOut","flipInX","flipOutX","flipInY","flipOutY","expandIn","contractOut","fadeInLeft","fadeInRight","fadeInUp","fadeInDown","fadeOutLeft","fadeOutRight","fadeOutUp","fadeOutDown","zoomIn","zoomOut","bounce","jelly","swing","pulse","shake","blurIn","blurOut","slitIn","slitOut","waveIn","waveOut","expandAndFadeIn","contractAndFadeOut","fade","pan","zoom"]
  const handleDimensionChange = (selectedDimension) => {
    let newWidth, newHeight;
    switch (selectedDimension) {
      case 'portrait':
        newWidth = 720;
        newHeight = 1280;
        break;
      case 'square':
        newWidth = 1080;
        newHeight = 1080;
        break;
      case 'landscape':
        newWidth = 1920;
        newHeight = 1080;
        break;
      default:
        newWidth = videoData.width || 720;
        newHeight = videoData.height || 1280; // Provide a default height
    }
    onVideoDataChange({ ...videoData, width: newWidth, height: newHeight });
  };


  return (
    <div>
      <label htmlFor="animationType" className="mr-2 text-white">Animation:</label>
      <select
        id="animationType"
        value={videoData.animationType || "zoom"}
        onChange={(e) => onVideoDataChange({ ...videoData, animationType: e.target.value })}
        className="bg-neutral-700 text-white p-1 rounded"
      >
                {animations.map((animation) => (
                    <option key={animation} value={animation}>
                        {animation}
                    </option>
                ))}
      </select>

      {/* Dimensions */}
      <br />
      <label htmlFor="dimension" className="mr-2 text-white">Dimensions:</label>
      <select
        id="dimension"
        value={
          videoData.width === 720 && videoData.height === 1280 ? "portrait" :
          videoData.width === 1080 && videoData.height === 1080 ? "square" :
          videoData.width === 1920 && videoData.height === 1080 ? "landscape" :
          "portrait" // Default
        }
        onChange={(e) => handleDimensionChange(e.target.value)}
        className="bg-neutral-700 text-white p-1 rounded"
      >
        <option value="portrait">Portrait</option>
        <option value="square">Square</option>
        <option value="landscape">Landscape</option>
      </select>



      {/* ... other settings ... */}
    </div>
  );
}

export default VideoSettings;

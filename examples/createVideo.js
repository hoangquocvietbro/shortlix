const VideoGenerator = require('../utils/videoGenerator');
const path = require('path');

async function main() {
  const generator = new VideoGenerator({
    fps: 30,
    transitionDuration: 1,
    imageDuration: 5
  });

  const imageList = [
    path.join(__dirname, '../public/abstract-art.jpeg'),
    path.join(__dirname, '../public/cartoon.jpeg'),
    path.join(__dirname, '../public/Watercolor.jpg'),
  ];

  const captions = [
    { start: 0, end: 2000, text: "Welcome to our video" },
    { start: 2000, end: 4000, text: "Created with FFmpeg" },
    { start: 4000, end: 6000, text: "And Node.js" },
  ];

  try {
    const outputPath = path.join(__dirname, 'output.mp4');
    await generator.createVideo({
      imageList,
      audioFileUrl: 'path/to/your/audio.mp3', // Replace with actual audio path
      outputPath,
      captions,
    });
    console.log('Video created successfully!');
  } catch (error) {
    console.error('Error creating video:', error);
  }
}

main(); 
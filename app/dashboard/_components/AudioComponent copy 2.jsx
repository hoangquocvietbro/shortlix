"use client";
import { useEffect, useState } from 'react';
import { Audio } from 'remotion';

const AudioComponent = ({ audioFiles }) => {
    const [audioUrl, setAudioUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFFmpegAndProcess = async () => {
            setIsLoading(true);
            try {
                const ffmpegModule = await import('@ffmpeg/ffmpeg');
                const { FFmpeg } = ffmpegModule;
                 const ffmpeg = new FFmpeg()

                await ffmpeg.load()

                const { fetchFile } = await import('@ffmpeg/util');
    
                // Write files to FFmpeg's virtual file system
                for (let i = 0; i < audioFiles.length; i++) {
                     await ffmpeg.writeFile(`audio${i}.mp3`, await fetchFile(audioFiles[i]));
                }
    
               // Create input file list
                const concatFileContent = audioFiles.map((_, i) => `file 'audio${i}.mp3'`).join('\n');
               await ffmpeg.writeFile('file-list.txt', concatFileContent);
                
                // Execute FFmpeg command for concatenation
                await ffmpeg.exec(['-f', 'concat', '-safe', '0', '-i', 'file-list.txt', '-c', 'copy', 'output.mp3']);
    
               // Read output file
               const data = await ffmpeg.readFile('output.mp3');
                const blob = new Blob([data.buffer], { type: 'audio/mp3' });
    
                // Create Blob URL
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);

                await ffmpeg.terminate()
            } catch (error) {
                console.error("Error processing audio:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFFmpegAndProcess();
    }, [audioFiles]);

    if (isLoading) {
        return <div>Processing audio...</div>;
    }

    if (!audioUrl) {
        return <div>Error processing audio.</div>;
    }
    return <Audio src={audioUrl} />;
};

export default AudioComponent;


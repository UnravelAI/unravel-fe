import React, { useState, useEffect, useRef } from "react";
import ReactHlsPlayer from 'react-hls-player';
import transcription from "./exampleTranscription.json";

type RemovedDuration = {
    index: number,
    startTime: number,
    duration: number
}

const VideoPlayer = ({ streamingURL }: { streamingURL: string }) => {
    const playerRef = useRef<HTMLVideoElement>(null);
    const [currentPosition, setCurrentPosition] = useState<number>(0);
    const [removedIndices, setRemovedIndices] = useState<number[]>([]);
    const [removedDurations, setRemovedDurations] = useState<RemovedDuration[]>([]);

    useEffect(() => {
        // Update currentPosition to the current video timeline
        if (playerRef.current) {
            playerRef.current?.addEventListener('timeupdate', (e) => {
                const position = (e.target as HTMLVideoElement).currentTime;
                setCurrentPosition(position);
            });
        }
    }, []);

    // Toggle the removal of a word
    const toggleRemoveWord = (index: number, startTime: number, duration: number) => {
        setRemovedIndices((removedIndices) => {
            const newIndices = [...removedIndices];
            // if it already exists
            const currentIndex = removedIndices.indexOf(index);
            if (currentIndex !== -1) {
                // Remove index
                newIndices.splice(currentIndex, 1);
                // Remove duration
                const newDurations = removedDurations?.filter((duration) => {
                    return duration.index !== index;
                });
                setRemovedDurations(newDurations);
                return newIndices;
            }
            newIndices.push(index);
            const newDurations = removedDurations?.concat({
                index,
                startTime,
                duration
            });
            console.log(newDurations);
            setRemovedDurations(newDurations);
            return newIndices;
        });
    }

    const optimizeRemovedDurations = (removedDurations: RemovedDuration[]) => {
        const removedDurationsCopy = [...removedDurations];
        return removedDurations.map((duration, index) => {
            /*
                index
                starttime,
                duration
            */
            if (removedDurations[index + 1]) {

            }
        });
    }

    // Watch currentPosition to seek if the word was removed
    useEffect(() => {
        removedDurations?.forEach((duration) => {
            if (Math.abs(duration.startTime - currentPosition) < 0.2) {
                let seekedDuration = duration.duration;
                (playerRef.current as HTMLVideoElement).currentTime = currentPosition + seekedDuration;
            }
        });
    }, [currentPosition]);

    return (
        <>
            <ReactHlsPlayer
                src={streamingURL}
                autoPlay={false}
                playerRef={playerRef}
                controls={true}
                width="100%"
                height="auto"
            />
            <div className="transcriptionArea">
                <p>
                    {transcription.results.items.map((word, index) => {
                        if (word.type === "pronunciation") {
                            let className = "word";
                            if (currentPosition > Number(word.start_time)) {
                                className += " highlightedWord";
                            } else {
                                className += " nonHighlightedWord";
                            }
                            if (removedIndices.includes(index)) {
                                className += " removed"
                            }
                            return (
                                <a className={className} onClick={() => toggleRemoveWord(index, Number(word.start_time), (Number(word.end_time) - Number(word.start_time)))}> {word.alternatives[0].content}</a>
                            );
                        }
                    })}
                </p>
            </div>
        </>
    );
}

export default VideoPlayer;

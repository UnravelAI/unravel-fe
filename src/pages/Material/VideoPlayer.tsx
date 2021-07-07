import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactHlsPlayer from "react-hls-player";
import { Button } from "@material-ui/core";
import API from "../../axios";

type RemovedDuration = {
  index: number;
  startTime: number;
  duration: number;
};

type Interval = {
  start: number;
  end: number;
};

type Material = {
  id?: number;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  description: string;
  video: any;
  document?: any;
};

const VideoPlayer = ({
  material,
  streamingURL,
}: {
  material: any;
  streamingURL: string;
}) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [removedIndices, setRemovedIndices] = useState<number[]>([]);
  const [removedDurations, setRemovedDurations] = useState<RemovedDuration[]>(
    []
  );
  const [word, setWord] = useState<string>("");
  const [intervals, setIntervals] = useState<Interval[]>([]);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const transcription = useMemo(() => {
    if (material.video.status === "published") return;
    const transcribed = material.video.transcription.results.items.map(
      (word: any, index: number) => {
        if (!word.start_time && !word.end_time) {
          word.start_time =
            material.video.transcription.results.items[index - 1].end_time;
          word.end_time =
            material.video.transcription.results.items[index + 1]?.start_time;
          if (!word.end_time) {
            word.end_time = word.start_time;
          }
        }
        return word;
      }
    );

    return transcribed;
  }, []);

  useEffect(() => {
    // Update currentPosition to the current video timeline
    if (playerRef.current) {
      playerRef.current?.addEventListener("timeupdate", (e) => {
        const position = (e.target as HTMLVideoElement).currentTime;
        setCurrentPosition(position);
      });
    }
  }, []);

  // Toggle the removal of a word
  const toggleRemoveWord = (
    index: number,
    startTime: number,
    duration: number,
    toggle: boolean
  ) => {
    if (!toggle && removedIndices.indexOf(index) !== -1) {
      return;
    }
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
        duration,
      });
      setRemovedDurations(newDurations);
      return newIndices;
    });
  };

  // Watch currentPosition to seek if the word was removed
  useEffect(() => {
    removedDurations?.forEach((duration) => {
      if (Math.abs(duration.startTime - currentPosition) < 0.2) {
        let seekedDuration = duration.duration;
        (playerRef.current as HTMLVideoElement).currentTime =
          currentPosition + seekedDuration;
      }
    });

    const elements = document.querySelectorAll(".highlightedWord");
    const element = elements[elements.length - 1];
    if (element) {
      setWord((word: string) => {
        if (element.innerHTML !== word) {
          return element.innerHTML;
        }
        return word;
      });
    }
  }, [currentPosition]);

  useEffect(() => {
    const elements = document.querySelectorAll(".highlightedWord");
    const element = elements[elements.length - 1];
    const elementPosition =
      element?.getBoundingClientRect()?.top + window.pageYOffset - 700;
    if (elementPosition) {
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  }, [word]);

  // publish video
  const publish = async () => {
    try {
      console.log(intervals);
      await API.put("/cloud/video/edit", {
        fileName: material.video.fileName,
        intervals: intervals,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (material.video.status === "published") return;
    if (removedDurations.length === 0) return;
    const sorted = removedDurations.sort(
      (duration1: RemovedDuration, duration2: RemovedDuration) =>
        duration1.startTime - duration2.startTime
    );
    console.log(sorted);
    const intervals = [];
    intervals.push({
      start: 0,
      end: sorted[0].startTime,
    });

    let transcriptionEnd = Number(
      transcription[transcription.length - 1]?.end_time
    );
    if (!transcriptionEnd) {
      transcriptionEnd = Number(
        transcription[transcription.length - 2]?.end_time
      );
    }

    for (let i = 0; i < sorted.length - 1; i++) {
      if (!sorted[i + 1]) return;
      const duration = sorted[i];
      const nextDuration = sorted[i + 1];
      const end = duration.startTime + duration.duration;

      if (nextDuration.startTime - end > 0.05) {
        intervals.push({
          start: end,
          end: nextDuration.startTime,
        });
      }

      // if last item
      if (i === sorted.length - 2) {
        intervals.push({
          start: nextDuration.startTime + nextDuration.duration,
          end: transcriptionEnd,
        });
      }
    }
    if (sorted.length === 1) {
      intervals.push({
        start: sorted[0].startTime + sorted[0].duration,
        end: transcriptionEnd,
      });
    }
    console.log(intervals);
    setIntervals(intervals);
  }, [removedDurations]);

  return (
    <>
      <ReactHlsPlayer
        src={streamingURL}
        autoPlay={false}
        playerRef={playerRef}
        controls={true}
        width="100%"
        height="500"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 9999,
          backgroundColor: "#2d2d2d",
        }}
      />
      {material.video.status === "editable" && (
        <div className="transcriptionArea">
          <p>
            {transcription.map((word: any, index: any) => {
              let className = "word";
              let text = word.alternatives[0].content;
              if (currentPosition > Number(word.start_time)) {
                className += " highlightedWord";
              } else {
                className += " nonHighlightedWord";
              }
              if (removedIndices.includes(index)) {
                className += " removed";
              }
              if (text === "." || text === ",") {
                className += " silence";
                text = "SILENCE";
              }
              return (
                <a
                  className={className}
                  onMouseEnter={(e) => {
                    if (e.buttons == 1)
                      toggleRemoveWord(
                        index,
                        Number(word.start_time),
                        Number(word.end_time) - Number(word.start_time),
                        false
                      );
                  }}
                  onMouseDown={() => {
                    toggleRemoveWord(
                      index,
                      Number(word.start_time),
                      Number(word.end_time) - Number(word.start_time),
                      true
                    );
                  }}
                >
                  {" "}
                  {text}
                </a>
              );
            })}
          </p>
          <div style={{ alignSelf: "flex-end" }}>
            <Button
              onClick={() => publish()}
              variant="contained"
              color="inherit"
              style={{
                backgroundColor: "#3e9681",
                color: "#fff",
                padding: "20px 30px",
                marginTop: "20px",
              }}
            >
              Publish Video
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;

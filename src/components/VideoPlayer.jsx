import React, { useRef, useState, useEffect } from "react";
import "../App.css";

const VideoPlayer = ({ videoURL, captions, onDurationUpdate }) => {
  const videoRef = useRef(null);
  const [currentCaption, setCurrentCaption] = useState("");

  const handleTimeUpdate = () => {
    const currentTime = videoRef.current.currentTime;

    // Check if the current time falls within any caption intervals
    const matchedCaption = captions.find(
      (cap) => currentTime >= cap.start && currentTime <= cap.end
    );

    if (matchedCaption) {
      setCurrentCaption(matchedCaption.text);
    } else {
      setCurrentCaption("");
    }
  };

  const handleVideoEnded = () => {
    setCurrentCaption(""); // Clear caption when the video ends
  };

  const handleLoadedMetadata = () => {
    const duration = videoRef.current.duration;
    onDurationUpdate(duration); // Send duration to parent (App)
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        src={videoURL}
        width="640"
        height="360"
        controls
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onLoadedMetadata={handleLoadedMetadata} // Fetch video duration
      />
      {/* Caption Overlay */}
      {currentCaption && <div className="caption-overlay">{currentCaption}</div>}
    </div>
  );
};

export default VideoPlayer;

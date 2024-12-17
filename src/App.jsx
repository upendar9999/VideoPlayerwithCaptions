import React, { useEffect, useState } from "react";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer";
import CaptionForm from "./components/CaptionForm";

function App() {
  const [videoURL, setVideoURL] = useState("");
  const [captions, setCaptions] = useState([]);
  const [videoDuration, setVideoDuration] = useState(0); // State for video duration

  // Function to add captions with start and end time
  const addCaption = (startTime, endTime, text) => {
    setCaptions([...captions, { start: Number(startTime), end: Number(endTime), text }]);
    console.log(captions);
  };

  // Function to update video duration
  const handleDurationUpdate = (duration) => {
    setVideoDuration(duration);
  };

  // Function to delete a caption
  const deleteCaption = (index) => {
    const updatedCaptions = captions.filter((_, i) => i !== index);
    setCaptions(updatedCaptions);
  };

  // Reset captions whenever the videoURL changes
  useEffect(() => {
    if (videoURL) {
      setCaptions([]);
    }
  }, [videoURL]);

  return (
    <div className="app">
      <h1>Video Caption App</h1>

      {/* Input for Video URL */}
      <input
        type="text"
        placeholder="Enter video URL"
        value={videoURL}
        onChange={(e) => setVideoURL(e.target.value)}
      />

      {/* Render Video Player and Caption Form */}
      {videoURL && (
        <>
          <VideoPlayer 
            videoURL={videoURL} 
            captions={captions} 
            onDurationUpdate={handleDurationUpdate} 
          />
          <CaptionForm addCaption={addCaption} videoDuration={videoDuration} captions={captions} />

           {/* Display the time intervals with captions */}
           <div className="caption-list">
            <h2>Caption Intervals</h2>

            {/* Check if captions array is empty */}
            {captions.length > 0 ? (
              captions.map((caption, index) => (
                <div key={index} className="caption-item">
                  <span>
                    <strong>Start:</strong> {caption.start}s - <strong>End:</strong> {caption.end}s
                  </span>
                  <p>{caption.text}</p>
                  <button className="delete-btn" onClick={() => deleteCaption(index)}>
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No captions available. Please add some captions to display.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

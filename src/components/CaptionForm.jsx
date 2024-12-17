import React, { useState } from "react";

const CaptionForm = ({ addCaption, videoDuration, captions }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const clearErrorAfterDelay = () => {
    setTimeout(() => {
      setError("");
    }, 3000);  // Clear error after 3 seconds
  };

  // Function to check for overlapping intervals
  const isOverlapping = (start, end) => {
    return captions.some((caption) => {
      return start < caption.end && end > caption.start;
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const start = Number(startTime);
    const end = Number(endTime);

    // Input validation
      if (start < 0 || end > videoDuration) {
      setError("Start or end time cannot exceed video duration.");
      clearErrorAfterDelay();
      return;
    }

    if (start >= end) {
      setError("End time must be greater than start time.");
      clearErrorAfterDelay();
      return;
    }

    if (isOverlapping(start, end)) {
      setError("The interval overlaps with an existing caption. Please adjust.");
      clearErrorAfterDelay();
      return;
    }

    setError(""); // Clear any previous errors
    addCaption(start, end, text.trim());
    setStartTime("");
    setEndTime("");
    setText("");
  };

  return (
    <form className="caption-form" onSubmit={handleSubmit}>
      <h3>Add Caption</h3>

      <label>
        Start Time:
        <input
          type="number"
          min="0"
          step="0.1"
          placeholder="Enter start time in seconds"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </label>

      <label>
        End Time:
        <input
          type="number"
          min="0"
          step="0.1"
          placeholder="Enter end time in seconds"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </label>

      <label>
        Caption Text:
        <input
          type="text"
          placeholder="Enter caption text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </label>

      <button type="submit">Add</button>

      {/* Error message display */}
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default CaptionForm;

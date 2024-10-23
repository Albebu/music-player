import { useEffect, useRef } from 'react'; // Import React hooks

const NowPlaying = ({ song, currentTime, duration, handleSeek, sound }) => {
  const canvasRef = useRef(null); // Create a reference for the canvas element

  if (!song) return null; // If no song is provided, render nothing

  return (
    <section>
      <h2>Now Playing</h2> {/* Title for the currently playing section */}
      <p>{song.title}</p> {/* Display the title of the currently playing song */}
      
      {/* Input range for seeking within the song */}
      <input
        id="time"
        name="time"
        type="range"
        step={1} // Step value for the range slider
        max={duration} // Maximum value set to the duration of the song
        value={currentTime} // Current playback time
        onChange={handleSeek} // Event handler for seeking
      />
      
      <p>
        Current Time: {currentTime.toFixed(0)} / {duration.toFixed(0)}
        {/* Display current time and duration, formatted to zero decimal places */}
      </p>
      
      <canvas ref={canvasRef} width={500} height={300}></canvas>
      {/* Canvas element for rendering visualizations or waveforms */}
    </section>
  );
};

export default NowPlaying; // Export the NowPlaying component

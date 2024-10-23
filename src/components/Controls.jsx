const Controls = ({ handleVolumeChange, handleLoopButton, handleRateChange, loop, rate, handlePlayButton, isPaused, setIsPaused, soundRef }) => {
  
    // Function to handle play/stop button click
    const handleButton = () => {
      console.log("Entered the button handler"); 
      // Log message for debugging
      console.log(soundRef.current); 
      // Log the current sound reference
      if (soundRef.current) { 
        // Check if there is a sound instance
        if (!isPaused) { 
          // If currently playing
          soundRef.current.stop(); 
          // Stop the playback
          setIsPaused(true); 
          // Update state to indicate it is paused
        } else { 
          // If currently paused
          soundRef.current.play(); 
          // Play the audio
          setIsPaused(false); 
          // Update state to indicate it is playing
        }
      }
    }
  
    return (
      <section className="w-full h-[4.5em] bg-strongBlue text-cornsilk flex items-center px-4 fixed bottom-0">
        {/* Main control section */}
        <div className="flex items-center gap-4">
          {/* Loop button */}
          <button onClick={handleLoopButton}>
            {loop ? 'Do not loop' : 'Loop'} 
            {/* Display button text based on loop state */}
          </button>
          
          <div>
            <label htmlFor="rate">Rate</label>
            {/* Label for playback rate selection */}
            <select 
              className="text-black" 
              onChange={(e) => handleRateChange(e.target.value)} 
              name="rate" 
              id="rate" 
              defaultValue={rate}
            >
              {/* Dropdown for selecting playback rate */}
              <option value="0.5">x 0.5</option>
              <option value="1.0">x 1.0</option>
              <option value="1.25">x 1.25</option>
              <option value="1.5">x 1.5</option>
              <option value="2.0">x 2.0</option>
              <option value="2.5">x 2.5</option>
              <option value="3.0">x 3.0</option>
            </select>
          </div>
        </div>
        
        <div className="flex-grow flex justify-center">
          {/* Play/Stop button */}
          <button 
            onClick={handleButton} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {!isPaused ? 'Stop' : 'Play'} 
            {/* Display button text based on pause state */}
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          {/* Volume control section */}
          <label htmlFor="volume">Volume</label>
          <input
            id="volume"
            name="volume"
            type="range"
            step={0.05}
            max={1}
            onChange={(e) => handleVolumeChange(e.target.value)} 
            // Handle volume changes
          />
        </div>
      </section>
    );
  };
  
  export default Controls; 
  // Export the Controls component
  
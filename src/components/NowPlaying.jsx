const NowPlaying = ({ song, currentTime, duration, handleSeek }) => {
    if (!song) return null;
  
    return (
      <section>
        <h2>Now Playing</h2>
        <p>{song.title}</p>
        <input
          id="time"
          name="time"
          type="range"
          step={1}
          max={duration}
          value={currentTime}
          onChange={handleSeek} // Control the seek operation
        />
        <p>Current Time: {currentTime.toFixed(0)} / {duration.toFixed(0)}</p>
      </section>
    );
  };
  
  export default NowPlaying;
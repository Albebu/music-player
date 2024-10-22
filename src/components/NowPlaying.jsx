import { useEffect, useRef } from 'react';
import { setupVisualizer } from '../js/audioVisualizer';

const NowPlaying = ({ song, currentTime, duration, handleSeek, sound }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && sound) {
      setupVisualizer(canvasRef.current, sound);
    }
  }, [sound]);

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
        onChange={handleSeek}
      />
      <p>Current Time: {currentTime.toFixed(0)} / {duration.toFixed(0)}</p>
      <canvas ref={canvasRef} width={500} height={300}></canvas>
    </section>
  );
};

export default NowPlaying;

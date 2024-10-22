import { Howl, Howler } from 'howler';
import { useEffect, useState, useRef } from 'react';

const App = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const soundRef = useRef(null); // Holds the Howl instance

  const [playingSong, setPlayingSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  
  const [loop, setLoop] = useState(false);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('/songs.json'); 
        if (!response.ok) {
          throw new Error('Error loading songs');
        }
        const data = await response.json();
        setSongs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSongs();
  }, []);

  const handlePlayButton = (src) => {
    // Check if there is an active Howl instance
    if (soundRef.current) {
      soundRef.current.stop();
    }

    // Create a new Howl instance
    soundRef.current = new Howl({
      src: [src],
      html5: true,
      loop: loop,
      rate: rate, 
      onend: () => {
        soundRef.current = null; // Clear the reference when song ends
      }
    });

    setPlayingSong(src);
    soundRef.current.play();

    const updateCurrentTime = () => {
      if (soundRef.current) {
        setCurrentTime(soundRef.current.seek());
      }
    };
  
    const interval = setInterval(updateCurrentTime, 500);

    soundRef.current.on('end', () => {
      clearInterval(interval);
      setCurrentTime(0); 
    });

    // Clean up interval on unmount or change
    return () => clearInterval(interval);
  };

  if (loading) {
    return <div>Loading songs...</div>; 
  }

  const handleVolumeChange = (volume) => {
    Howler.volume(volume);
  };

  const handleLoopButton = () => {
    const newLoopState = !loop;
    setLoop(newLoopState);
    if (soundRef.current) {
      soundRef.current.loop(newLoopState); 
    }
  };

  const handleRateChange = (newRate) => {
    setRate(newRate);
    if (soundRef.current) {
      soundRef.current.rate(newRate); 
    }
    console.log(soundRef.current.rate());
  };

  return (
    <>
      <h1>Song List</h1>
      <ul>
        {songs.map(song => (
          <li key={song.id}>
            <strong>{song.title}</strong> by {song.artist_name}
            <button onClick={() => handlePlayButton(song.song_path)}>{soundRef.current ? 'Stop' : 'Play'}</button>
          </li>
        ))}
      </ul>
      <section>
        <h2>Now Playing</h2>
        <p>{playingSong}</p>
        <p>Current Time: {currentTime.toFixed(0)}</p>
      </section>
      <aside>
        <label htmlFor="volume">Volume</label>
        <input 
          id="volume" 
          name="volume" 
          type="range" 
          step={0.05} 
          max={1} 
          onChange={(e) => handleVolumeChange(e.target.value)}
        />
        <button onClick={handleLoopButton}>{loop ? 'Do not loop' : 'Loop'}</button>
        <label htmlFor="rate">Rate</label>
        <select onChange={(e) => {handleRateChange(e.target.value)}} name="rate" id="rate">
          <option value="0.5">x 0.5</option>
          <option value="1.0">x 1.0</option>
          <option value="1.25">x 1.25</option>
          <option value="1.5">x 1.5</option>
          <option value="2.0">x 2.0</option>
          <option value="2.5">x 2.5</option>
          <option value="3.0">x 3.0</option>
        </select>
      </aside>
    </>
  );
};

export default App;
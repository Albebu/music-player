import { Howl, Howler } from 'howler';
import { useEffect, useState, useRef } from 'react';
import SongList from './components/SongList';
import NowPlaying from './components/NowPlaying';
import Controls from './components/Controls';
import Nav from './components/Nav';

const App = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const soundRef = useRef(null); // Holds the Howl instance
  const [playingSongIndex, setPlayingSongIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); // To store the duration of the song
  const [loop, setLoop] = useState(false);
  const [rate, setRate] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

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
    };

    fetchSongs();

  }, []);

  
  const handlePlayButton = (song) => {
    console.log(song.id)
    // Stop the current sound if it's playing
    if (song.id === playingSongIndex) {
      if (soundRef.current && !isPaused) {
        soundRef.current.pause();
        setIsPaused(true);
      } else if (soundRef.current && isPaused) {
        soundRef.current.play();
        setIsPaused(false);
    }
    } else {
      if (soundRef.current) {
        soundRef.current.stop();
      }
        // Create a new Howl instance
      soundRef.current = new Howl({
        src: [songs[song.id].song_path],
        html5: true,
        loop: loop,
        rate: rate,
        onload: () => {
          setDuration(soundRef.current.duration()); // Set the duration once the sound is loaded
        },
        onend: () => {
          soundRef.current = null; // Clear the reference when the song ends
          setCurrentTime(0); // Reset current time when song ends
          playNextSong(); // Play the next song
        },
      });

      setPlayingSongIndex(song.id);
      soundRef.current.play();

      // Update currentTime every 500ms
      const updateCurrentTime = () => {
        if (soundRef.current) {
          setCurrentTime(soundRef.current.seek());
        }
      };

      const interval = setInterval(updateCurrentTime, 500);

      // Cleanup interval when the component unmounts or the song ends
      return () => clearInterval(interval);
      }
  };

  console.log(songs)

  const playNextSong = () => {
    const nextIndex = (playingSongIndex + 1) % songs.length;
    handlePlayButton(nextIndex);
  };

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
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    if (soundRef.current) {
      soundRef.current.seek(newTime); // Seek the audio to the new time
    }
  };

  if (loading) {
    return <div>Loading songs...</div>; 
  }

  return (
    <div className='grid grid-rows-[auto_1fr_auto] h-screen'>
  <Nav />
  <div className='grid grid-cols-2 h-full'> {/* Asegúrate de que este contenedor tiene h-full */}
    <SongList 
      songs={songs} 
      playingSongIndex={playingSongIndex} 
      handlePlayButton={handlePlayButton}
      isPaused={isPaused}
    />
    <NowPlaying 
      song={songs[playingSongIndex]} 
      currentTime={currentTime} 
      duration={duration} 
      handleSeek={handleSeek} 
      audioElement={soundRef.current} // Asegúrate de pasar el elemento de audio aquí
    />
  </div>
  <Controls 
    handleVolumeChange={handleVolumeChange} 
    handleLoopButton={handleLoopButton} 
    handleRateChange={handleRateChange} 
    loop={loop} 
    rate={rate}
    isPaused={isPaused}
    handlePlayButton={handlePlayButton}
  />
</div>

  );
};

export default App;
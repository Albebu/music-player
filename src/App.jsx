import { Howl, Howler } from 'howler'; 
// Import the Howler library for audio handling
import { useEffect, useState, useRef } from 'react'; 
// Import React hooks
import SongList from './components/SongList'; 
// Component for listing songs
import NowPlaying from './components/NowPlaying'; 
// Component to show the currently playing song
import Controls from './components/Controls'; 
// Component for playback controls
import Nav from './components/Nav'; 
// Navigation component

const App = () => {
  // State and references
  const [songs, setSongs] = useState([]); 
  // Stores the list of songs
  const [loading, setLoading] = useState(true); 
  // Loading state
  const soundRef = useRef(null); 
  // Reference for the Howl instance
  const [playingSongIndex, setPlayingSongIndex] = useState(null); 
  // Index of the currently playing song
  const [currentTime, setCurrentTime] = useState(0); 
  // Current playback time
  const [duration, setDuration] = useState(0); 
  // Total duration of the song
  const [loop, setLoop] = useState(false); 
  // Controls whether the song should loop
  const [rate, setRate] = useState(1); 
  // Playback speed
  const [isPaused, setIsPaused] = useState(false); 
  // Pause state

  useEffect(() => {
    // Function to fetch songs from a JSON file
    const fetchSongs = async () => {
      try {
        const response = await fetch('/songs.json'); 
        // Request the JSON file
        if (!response.ok) {
          throw new Error('Error loading songs'); 
          // Handle loading errors
        }
        const data = await response.json(); 
        // Convert response to JSON
        setSongs(data); 
        // Update state with songs
      } catch (err) {
        console.error(err); 
        // Log errors to console
      } finally {
        setLoading(false); 
        // Set loading state to false
      }
    };

    fetchSongs(); 
    // Call the function to load songs
  }, []); 
  // Runs only on component mount

  // Handles play button click
  const handlePlayButton = (song) => {
    if (song.id === playingSongIndex) { 
      // If the same song is selected
      if (soundRef.current && !isPaused) {
        soundRef.current.pause(); 
        // Pause the song
        setIsPaused(true); 
        // Update state to paused
      } else if (soundRef.current) {
        soundRef.current.play(); 
        // Resume playback
        setIsPaused(false); 
        // Update state to playing
      }
    } else { 
      // If a different song is selected
      if (soundRef.current) {
        soundRef.current.stop(); 
        // Stop the current song
      }
      // Create a new Howl instance
      soundRef.current = new Howl({
        src: [songs[song.id].song_path], 
        // Path to the audio file
        html5: true, 
        // Use HTML5 for playback
        loop: loop, 
        // Set looping
        rate: rate, 
        // Set playback speed
        onload: () => {
          setDuration(soundRef.current.duration()); 
          // Store duration once loaded
        },
        onend: () => { 
          // When the song ends
          soundRef.current = null; 
          // Clear the reference
          setCurrentTime(0); 
          // Reset current time
          playNextSong(); 
          // Play the next song
        },
      });

      setPlayingSongIndex(song.id); 
      // Update the currently playing song index
      soundRef.current.play(); 
      // Start playing the new song

      // Function to update the current playback time every 500 ms
      const updateCurrentTime = () => {
        if (soundRef.current) {
          setCurrentTime(soundRef.current.seek()); 
          // Update current time
        }
      };

      const interval = setInterval(updateCurrentTime, 500); 
      // Set interval to update current time

      // Cleanup interval on component unmount or when song changes
      return () => clearInterval(interval); 
    }
  };

  // Plays the next song in the list
  const playNextSong = () => {
    const nextIndex = (playingSongIndex + 1) % songs.length; 
    // Calculate the next index
    handlePlayButton(songs[nextIndex]); 
    // Call the play button handler for the next song
  };

  // Changes the volume
  const handleVolumeChange = (volume) => {
    soundRef.current.volume(volume); 
    // Set the volume on the current sound instance
  };

  // Toggles looping state
  const handleLoopButton = () => {
    const newLoopState = !loop; 
    // Toggle the loop state
    setLoop(newLoopState); 
    // Update the loop state
    if (soundRef.current) {
      soundRef.current.loop(newLoopState); 
      // Update the loop setting on the sound instance
    }
  };

  // Changes playback speed
  const handleRateChange = (newRate) => {
    setRate(newRate); 
    // Update the playback speed
    if (soundRef.current) {
      soundRef.current.rate(newRate); 
      // Set the new rate on the current sound instance
    }
  };

  // Seeks to a specific time in the song
  const handleSeek = (e) => {
    const newTime = e.target.value; 
    // Get the new time from input
    setCurrentTime(newTime); 
    // Update current time state
    if (soundRef.current) {
      soundRef.current.seek(newTime); 
      // Seek the audio to the new time
    }
  };

  if (loading) {
    return <div>Loading songs...</div>; 
    // Display loading message while songs are being fetched
  }

  return (
    <div className='grid grid-rows-[auto_1fr_auto] h-screen'>
      <Nav /> 
      {/* Navigation component */}
      <div className='grid grid-cols-2 h-full'>
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
          audioElement={soundRef.current} 
          // Pass the current audio element here
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
        soundRef={soundRef}
        setIsPaused={setIsPaused}
      />
    </div>
  );
};

export default App; 
// Export the main component

const SongList = ({ songs, playingSongIndex, handlePlayButton, isPaused }) => {
    return (
      <div>
        <h1>Song List</h1>
        <ul>
        {songs.map((song, index) => (
          <li key={song.id}>
          <strong>{song.title}</strong> by {song.artist_name}
          <button onClick={() => handlePlayButton(song)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {playingSongIndex === index && !isPaused ? 'Stop' : 'Play'}
          </button>
          </li>
        ))}
        </ul>
      </div>
    );
  };
  
  export default SongList;
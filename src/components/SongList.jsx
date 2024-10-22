const SongList = ({ songs, playingSongIndex, handlePlayButton }) => {
    return (
      <ul>
        {songs.map((song, index) => (
          <li key={song.id}>
            <strong>{song.title}</strong> by {song.artist_name}
            <button onClick={() => handlePlayButton(song)}>
              {playingSongIndex === index ? 'Stop' : 'Play'}
            </button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default SongList;
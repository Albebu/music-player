const SongList = ({ songs, playingSongIndex, handlePlayButton, isPaused }) => {
  return (
    <aside className="overflow-y-auto h-full bg-gray-200 mt-16"> {/* Asegúrate de usar overflow-y-auto */}
      <h1>Song List</h1>
      <ul className="space-y-2"> {/* Añade algo de espacio entre los elementos */}
        {songs.map((song, index) => (
          <li key={song.id} className="flex justify-between items-center">
            <img src={song.image_path} alt="Image cover the song" className="w-16"/>
            <strong>{song.title}</strong> by {song.artist_name}
            <button 
              onClick={() => handlePlayButton(song)} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {playingSongIndex === index && !isPaused ? 'Stop' : 'Play'}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SongList;

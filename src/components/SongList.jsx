const SongList = ({ songs, handlePlayButton }) => {
  return (
    <aside className="overflow-y-auto h-[46rem] bg-[#111111] mt-16 w-3/6 flex flex-col">
      {/* Limit height to 46rem and enable vertical scrolling */}
      <h2 className="text-xl font-semibold mb-4 text-white text-center">Lista de reproducción</h2>
      {/* Title for the playlist section */}
      
      <ul className="space-y-2">
        {/* Add some space between the list items */}
        {songs.map((song, index) => (
          <li 
            key={index} // Unique key for each list item
            className="flex text-[#E7E7E7] items-center p-2 hover:bg-teal-500 hover:bg-opacity-20 rounded cursor-pointer gap-4"
            onClick={() => handlePlayButton(song)} 
            // Pass the selected song to the play handler on click
          >
            <img src={song.image_path} alt="Image cover of the song" className="w-16 rounded-lg" />
            {/* Display the song cover image */}
            <div className="flex flex-col">
              <strong>{song.title}</strong>
              {/* Display the song title */}
              <span> by {song.artist_name}</span>
              {/* Display the artist's name */}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SongList; // Export the SongList component

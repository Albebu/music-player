const SongList = ({ songs, handlePlayButton }) => {
  return (
    <aside className="overflow-y-auto h-[46rem] bg-[#111111]  mt-16 w-3/6 flex flex-col " > {/* Limita la altura a 36rem y habilita el scroll vertical */}
      <h2 className="text-xl font-semibold mb-4 text-white text-center  ">Lista de reproducción</h2>
      <ul className="space-y-2"> {/* Añade algo de espacio entre los elementos */}
        {songs.map((song, index) => (
          <li key={index}
            className="flex text-[#E7E7E7] items-center p-2 hover:bg-teal-500 hover:bg-opacity-20 rounded cursor-pointer gap-4"
            onClick={() => handlePlayButton(song)}> {/* Asegúrate de pasar el índice correcto */}
            <img src={song.image_path} alt="Image cover the song" className="w-16 rounded-lg"/>
            <div className="flex flex-col">
              <strong>{song.title}</strong>
              <span> by {song.artist_name}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SongList;

// src/pages/SongDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Controls from '../components/Controls/Controls';

const SongDetail = () => {
    const { id } = useParams(); // Obtiene el ID de la canción de la URL
    const [song, setSong] = useState(null);

    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
                // Simula una llamada a la API para obtener los detalles de la canción
                const response = await fetch('/songsData/songsData.json');
                const data = await response.json();
                
                const foundSong = data.find(item => item.id === parseInt(id));
                setSong(foundSong);
            } catch (error) {
                console.error('Error fetching song details:', error);
            }
        };

        fetchSongDetails();
    }, [id]);

    console.log(song);

    if (!song) return <div>Cargando...</div>; // Manejo de carga

    return (
        <div className="flex flex-col h-screen pt-20 pb-4 bg-[#121212] text-white"> {/* Contenedor principal */}
            <div className="h-[25%] flex flex-row items-center border-2 border-black gap-4">
                <img src={song.image} className='w-36 ml-4' alt={song.title} />
                <div className='flex flex-col'>
                    <h4 className='font-[800] text-5xl'>{song.title}</h4>
                    <div className='flex flex-row gap-4 font-[300] text-lg mt-4'>
                        <p>{song.artist}</p>
                        <p>{song.duration}</p>
                        <p>{song.album}</p>
                    </div>
                </div>
            </div>
            <Controls songInformation={song}></Controls>
        </div>
    );
};

export default SongDetail;

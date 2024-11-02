// src/pages/AlbumDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AlbumDetail = () => {
    const { id } = useParams(); // Obtiene el ID del álbum de la URL
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        const fetchAlbumDetails = async () => {
            try {
                // Simula una llamada a la API para obtener los detalles del álbum
                const response = await fetch('/localData/albums-info.json');
                const data = await response.json();
                
                const foundAlbum = data.items.find(item => item.album.id === id);
                setAlbum(foundAlbum);
            } catch (error) {
                console.error('Error fetching album details:', error);
            }
        };

        fetchAlbumDetails();
    }, [id]);

    const calculateTotalDuration = () => {
        const totalDurationMs = album.album.tracks.items.reduce((total, track) => total + track.duration_ms, 0);
        const totalDurationMinutes = Math.floor(totalDurationMs / 60000);
        return `${totalDurationMinutes} mins`;
    }

    if (!album) return <div>Cargando...</div>; // Manejo de carga

    return (
        <div className="flex flex-col h-screen pt-20 pb-4 bg-[#121212] text-white"> {/* Contenedor principal */}
            <div className="h-[25%] flex flex-row items-center border-2 border-black gap-4">
                <img src={album.album.images[0].url} className='w-36 ml-4' />
                <div className='flex flex-col'>
                    <h4 className='font-[800] text-5xl'>{album.album.name}</h4>
                    <div className='flex flex-row gap-4 font-[300] text-lg mt-4'>
                        <p className=''>{album.album.artists[0].name}</p>
                        <p>{album.album.release_date}</p>
                        <p>{album.album.total_tracks} songs,</p>
                        <p>{calculateTotalDuration()}</p>
                    </div>
                </div>
            </div>
            <div className="flex-grow flex flex-col border-2 border-black p-6 overflow-y-scroll gap-2">
                {album.album.tracks.items.map((track, index) => (
                    <div className='flex flex-row items-center justify-between hover:bg-[#2A2A2A] h-20' key={track.id}>
                        <div className='flex flex-row gap-8'>
                            <p className='text-center w-8'>{index + 1}</p>
                            <div>
                                <p className='font-[400]'>{track.name}</p>
                                <div className='flex flex-row gap-2 font-[200]'>
                                    {track.artists.map((artist, i) => (
                                        <p key={i}>{artist.name}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>{(track.duration_ms / 60000).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumDetail;

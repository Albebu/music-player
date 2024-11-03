// src/pages/SongDetail.js
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Controls from '../components/Controls/Controls';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import Equalizer from '../components/Equalizer'; // Importa el ecualizador

const SongDetail = () => {
    const { id } = useParams();
    const [song, setSong] = useState(null);
    const soundRef = useRef(null);
    const [isPaused, setIsPaused] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(100);

    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
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

    if (!song) return <div>Cargando...</div>;

    return (
        <div className="flex flex-col h-screen pt-20 pb-4 bg-[#121212] text-white">
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
            <Controls songInformation={song} soundRef={soundRef} setIsPaused={setIsPaused} />
            <Equalizer soundRef={soundRef} /> {/* Añadir el ecualizador */}
            <AudioPlayer 
                src={song.src} 
                isPaused={isPaused} 
                setCurrentTime={setCurrentTime} 
                volume={volume} 
                currentTime={currentTime} 
                soundRef={soundRef} 
            />
        </div>
    );
};

export default SongDetail;

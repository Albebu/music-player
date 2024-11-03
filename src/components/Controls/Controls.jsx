import { useEffect, useState } from 'react';
import images from '../../assets/images-control';
import AudioPlayer from "../AudioPlayer/AudioPlayer";

const Controls = ({ handleLikeButton, isLiked, songInformation, soundRef }) => {
    const [isPaused, setIsPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [audioPlayerSrc, setAudioPlayerSrc] = useState(null);
    const [volume, setVolume] = useState(25);

    useEffect(() => {
        if (songInformation) {
            setAudioPlayerSrc(`http://83.40.227.248:3000/audio/${songInformation.title}.mp3`);
            setCurrentTime(0);
            setTotalTime(songInformation.duration);
        }
    }, [songInformation]);

    // Formatear el tiempo en minutos y segundos
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Controlador para el cambio en la barra de progreso
    const handleProgressBarChange = (event) => {
        const newTime = parseFloat(event.target.value);
        setCurrentTime(newTime);
    };

    return (
        <section className="fixed bottom-0 left-0 w-screen bg-black text-white">
            {audioPlayerSrc && (
                <AudioPlayer
                    src={audioPlayerSrc}
                    isPaused={isPaused}
                    setCurrentTime={setCurrentTime}
                    volume={volume}
                    currentTime={currentTime}
                    soundRef={soundRef} // Pasamos currentTime como prop
                />
            )}
            <div className="flex flex-row justify-between items-center h-24 ml-4 mr-4">
                <div className="flex flex-row items-center">
                    <div>
                        <img className="w-24" src={songInformation.image} alt="Album image"/>
                    </div>
                    <div className="ml-2 w-64">
                        <h4 className="font-semibold">{songInformation ? songInformation.title : "Titulo de la canción"}</h4>
                        <p className="font-light">{songInformation ? songInformation.artist : "Artista"}</p>
                    </div>
                    <div className=''>
                        <img className="w-5 ml-5 cursor-pointer" src={images.plusSign} alt={!isLiked ? "Añadir a favoritos" : "Quitar de favoritos"} onClick={handleLikeButton} />
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center w-full pr-12'>
                    <div className='flex flex-row space-x-4'>
                        <img className="w-8 cursor-pointer" src={images.random} alt="Aleatorio" />
                        <img className="w-6 cursor-pointer" src={images.back} alt="Anterior canción" />
                        <img
                            className="w-10 cursor-pointer"
                            src={!isPaused ? images.pause : images.play}
                            alt={!isPaused ? "Pausar" : "Play"}
                            onClick={() => setIsPaused(!isPaused)} // Alternar entre pausar y reproducir
                        />
                        <img className="w-6 transform rotate-180 cursor-pointer" src={images.back} alt="Siguiente canción" />
                        <img className="w-6 cursor-pointer" src={images.loop} alt="Repetir" />
                    </div>
                    <div className="mt-2 w-[35em] flex flex-row gap-4 items-center">
                        <span>{formatTime(currentTime)}</span>
                        <input
                            className="progress-bar w-full"
                            type="range"
                            min="0"
                            max={totalTime}
                            value={currentTime}
                            onChange={handleProgressBarChange} // Añadimos el controlador
                        />
                        <span>{formatTime(totalTime)}</span>
                    </div>
                </div>
                <div className='flex flex-row items-center space-x-4'>
                    <img className="w-6" src={images.microphone} alt="Lyrics" />
                    <img className="w-6" src={images.queue} alt="" />
                    <input className="progress-bar w-full" defaultValue="25" type="range" min="0" max="100" onChange={(e) => setVolume(e.target.value)}/>
                </div>
            </div>
        </section>
    );
};

export default Controls;

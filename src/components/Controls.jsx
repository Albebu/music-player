import plusSign from '../assets/plus.svg'
import random from '../assets/random.svg'
import back from '../assets/back.svg'
import pause from '../assets/pause.svg';
import play from '../assets/play.svg';
import loop from '../assets/loop.svg'

const Controls = ({ songName, songArtist, handleLikeButton, isLiked, isPaused }) => {
    return(
        <section className="fixed bottom-0 left-0 w-screen bg-black text-white">
            <div className="flex flex-row justify-between items-center h-20">
                <div className="flex flex-row items-center">
                    <div>
                        <img className="w-12" src="https://placehold.co/40x40" alt="Album image"/>
                    </div>
                    <div className="ml-2">
                        <h4 className="font-[600]">{songName ? songName : "Titulo de la canción"}</h4>
                        <p className="font-[200]">{songArtist ? songArtist : "Artista"}</p>
                    </div>
                    <div> <img className="w-5 ml-5" src={plusSign} alt={!isLiked ? "Añadir a favoritos" : "Quitar de favoritos"} /> </div>
                </div>
                <div className='flex flex-col items-center justify-center w-full'>
                    <div className='flex flex-row space-x-4'>
                        <img className="w-8" src={random} alt="Aleatorio" />
                        <img className="w-6" src={back} alt="Anterior canción" />
                        <img className="w-10" src={!isPaused ? pause : play} alt={!isPaused ? "Pausar" : "Play"} />
                        <img className="w-6 transform rotate-180" src={back} alt="Siguiente canción" />
                        <img className="w-6 invert" src={loop} alt="Anterior canción" />
                    </div>
                    <div className='mt-2'>
                        <p>Barra reproducción</p>
                    </div>
                </div>
                <div className='flex flex-row items-center space-x-4'>
                    <p>Lyrics</p>
                    <p>Cola</p>
                    <p>Volumen</p>
                </div>
            </div>
        </section>
    );
};

export default Controls;
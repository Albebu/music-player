import plusSign from '../assets/plus.svg'
import random from '../assets/random.svg'
import back from '../assets/back.svg'
import pause from '../assets/pause.svg';
import play from '../assets/play.svg';
import loop from '../assets/loop.svg';
import microphone from '../assets/microphone.svg'
import queue from '../assets/queue.svg'

const Controls = ({ songName, songArtist, handleLikeButton, isLiked, isPaused }) => {
    return(
        <section className="fixed bottom-0 left-0 w-screen bg-black text-white">
            <div className="flex flex-row justify-between items-center h-20 ml-4 mr-4">
                <div className="flex flex-row items-center">
                    <div>
                        <img className="w-20" src="https://placehold.co/40x40" alt="Album image"/>
                    </div>
                    <div className="ml-2">
                        <h4 className="font-[600]">{songName ? songName : "Titulo de la canción"}</h4>
                        <p className="font-[200]">{songArtist ? songArtist : "Artista"}</p>
                    </div>
                    <div> <img className="w-5 ml-5 cursor-pointer" src={plusSign} alt={!isLiked ? "Añadir a favoritos" : "Quitar de favoritos"} onClick={handleLikeButton} /> </div>
                </div>
                <div className='flex flex-col items-center justify-center w-full pr-12'>
                    <div className='flex flex-row space-x-4'>
                        <img className="w-8 cursor-pointer" src={random} alt="Aleatorio" />
                        <img className="w-6 cursor-pointer" src={back} alt="Anterior canción" />
                        <img className="w-10 cursor-pointer" src={!isPaused ? pause : play} alt={!isPaused ? "Pausar" : "Play"} />
                        <img className="w-6 transform rotate-180 cursor-pointer" src={back} alt="Siguiente canción" />
                        <img className="w-6 cursor-pointer" src={loop} alt="Repetir" />
                    </div>
                    <div className="mt-2 w-[35em] flex flex-row gap-4 items-center">
                        <span>0:00</span>
                        <input className="progress-bar w-full" type="range" min="0" max="100"/>
                        <span>3:30</span>
                    </div>
                </div>
                <div className='flex flex-row items-center space-x-4'>
                    <img className="w-6" src={microphone} alt="Lyrics" />
                    <img className="w-6" src={queue} alt="" />
                    <input className="progress-bar w-full" type="range" min="0" max="100"/>
                </div>
            </div>
        </section>
    );
};

export default Controls;
import React, { useState } from 'react';
import spotifyIcon from '../assets/spotify-icon.svg'; // Importa el archivo SVG
import loupe from '../assets/loupe.svg'; // Importa el icono de la lupa
import broswer from '../assets/broswer.svg'
import home from '../assets/home.svg'
import Modal from './Modal'; // Importa el componente del modal

const Navegation = ({ profileImage, profileName }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    return (
        <nav className="bg-black text-white p-2 fixed w-screen">
            <ul className="flex flex-row justify-between items-center">
                <div>
                    <li>
                        <a href="/">
                            <img className="w-8" src={spotifyIcon} alt="Spotify Logo" />
                        </a>
                    </li>
                </div>
                <div className="flex flex-row ml-20 space-x-4 focus-within:outline focus-within:outline-white focus-within:outline-4 focus-within:rounded-full">
                    <li className="flex items-center bg-[#535353]/40 rounded-full p-4">
                        <a href="/" className="flex items-center ">
                            <Modal modalContent={"Home"} onMouseEnter={showModal} onMouseLeave={hideModal}>
                                <img src={home} alt="Home" className="w-6" />
                            </Modal>
                        </a>
                    </li>
                    <li className=""> {/* Ajusta el valor de max-w-* según sea necesario */}
                        <div className='flex flex-row bg-[#535353]/40 p-4 rounded-full w-full'>
                            <img src={loupe} alt="" className='w-6 mr-4' />
                            <input 
                            type="text" 
                            className='bg-white/0 w-full pr-40 border-r focus:outline-none' 
                            placeholder='What do you want to play?' 
                            />
                            <Modal modalContent={"Brows"} onMouseEnter={showModal} onMouseLeave={hideModal}>
                                <img src={broswer} alt="" className='ml-5 w-8 mr-4'/>
                            </Modal>
                        </div>
                    </li>
                </div>
                <div className="flex flex-row space-x-4">
                    <li>
                        <a href="/">
                            Notificaciones
                        </a>
                    </li>
                    <li>
                        <div className="relative" onMouseEnter={showModal} onMouseLeave={hideModal}>
                            <Modal modalContent={"Profile"}>
                                <img src={profileImage ? profileImage : spotifyIcon} alt="Profile" className="cursor-pointer w-12" />
                            </Modal>
                        </div>
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default Navegation;
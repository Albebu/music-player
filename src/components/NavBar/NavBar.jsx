import React, { useState } from 'react';
import images from '../../assets/images-navegation';
import Modal from '../Modal'; // Importa el componente del modal
import { useNavigate } from 'react-router-dom';

const Navegation = ({ profileImage, profileName }) => {
    const navigate = useNavigate();

    return (
        <nav className="bg-black text-white p-2 fixed w-screen">
            <ul className="flex flex-row justify-between items-center">
                <div className='pl-4'>
                    <li>
                        <Modal modalContent={"Home"}>
                            <button onClick={() => navigate("/")} aria-label="Ir a la página de inicio">
                                <img className="w-8" src={images.spotifyIcon} alt="Spotify Logo" />
                            </button>
                        </Modal>
                    </li>
                </div>
                <div className="flex flex-row ml-20 space-x-4">
                    <li className="flex items-center bg-[#535353]/40 rounded-full p-4">
                        <Modal modalContent={"Home"}>
                            <button onClick={() => navigate("/")} aria-label="Ir a la página de inicio">
                                <img src={images.home} alt="Home" className="w-6" />
                            </button>
                        </Modal>
                    </li>
                    <li>
                        <div className='flex flex-row bg-[#535353]/40 p-4 rounded-full w-full'>
                            <img src={images.loupe} alt="Buscar" className='w-6 mr-4' />
                            <input 
                                type="text" 
                                className='bg-transparent w-full pr-40 border-r focus:outline-none' 
                                placeholder='What do you want to play?' 
                            />
                            <Modal modalContent={"Browse"}>
                                <button aria-label="Explorar">
                                    <img src={images.broswer} alt="Browser" className='ml-5 w-8 mr-4'/>
                                </button>
                            </Modal>
                        </div>
                    </li>
                </div>
                <div className="flex flex-row space-x-4">
                    <li>
                        <Modal modalContent={"Notifications"}>
                            <a href="/" className="hover:underline">Notificaciones</a>
                        </Modal>
                    </li>
                    <li>
                        <Modal modalContent={"Profile"}>
                            <button aria-label={`Perfil de ${profileName || 'Usuario'}`}>
                                <img src={profileImage ? profileImage : images.spotifyIcon} alt="Profile" className="cursor-pointer w-12" />
                            </button>
                        </Modal>
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default Navegation;

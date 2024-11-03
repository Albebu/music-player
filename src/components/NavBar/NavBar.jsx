import React from 'react';
import { useState } from 'react';
import images from '../../assets/images-navegation';
import Modal from '../Modal'; // Importa el componente del modal
import { useNavigate } from 'react-router-dom';

const Navegation = ({ profileImage, profileName }) => {
  const navigate = useNavigate();
    const [isFocused, setIsFocused] = useState(false);

  return (

    <nav>
        <ul className='flex items-center justify-between w-screen bg-black text-white h-16 pl-2'>
            {/* Content small screen */}
            <div className='block sm:hidden flex justify-between w-full'>
                {/* Icon, Home, Search */}
                <div className='flex flex-row gap-4'>
                    <li>
                        <Modal modalContent={"Home"}>
                            <button onClick={() => navigate("/")} aria-label="Ir a la página de inicio">
                                <img className="w-8" src={images.spotifyIcon} alt="Spotify Logo" />
                            </button>
                        </Modal>
                    </li>
                    <li>
                        <Modal modalContent={"Home"}>
                            <button onClick={() => navigate("/")} aria-label="Ir a la página de inicio">
                                <img src={images.home} alt="Home" className="w-8" />
                            </button>
                        </Modal>
                    </li>
                    <li>
                        <Modal modalContent={"Home"}>
                            <button onClick={() => navigate("/")} aria-label="Ir a la página de inicio">
                                <img src={images.loupe} alt="Search" className="w-8" />
                            </button>
                        </Modal>
                    </li>
                </div>
                {/* Notification, Logo */}
                <div className='flex flex-row gap-4 pr-12'>
                    <li>
                    <Modal modalContent={"Notifications"}>
                        <button aria-label="Notifications">
                            <img src={images.loupe} alt="Notifications" className="w-8" />
                        </button>
                    </Modal>
                    </li>
                    <li>
                    <Modal modalContent={"Perfil"}>
                        <button aria-label="Perfil">
                            <img src={images.spotifyIcon} alt="Profile" className="w-8 h-8 rounded-full" />
                        </button>
                    </Modal>
                    </li>
                </div>
            </div>

            {/* Content large screen */}
            <div className='flex flex-row w-full hidden sm:flex justify-between'>
                {/* Icon */}
                <div className='flex'>
                    <Modal modalContent={"Home"}>
                        <button onClick={() => navigate("/")} aria-label="Ir a la página de inicio">
                            <img className="w-8" src={images.spotifyIcon} alt="Spotify Logo" />
                        </button>
                    </Modal>
                </div>
                {/* Home, Search */}
                <div className='flex items-center'>
                    <div className='mr-4'> {/* Espacio a la derecha del icono de inicio */}
                        <Modal modalContent={"Home"}>
                            <button onClick={() => navigate("/")} aria-label="Ir a la página de inicio">
                                <img src={images.home} alt="Home" className="w-8" />
                            </button>
                        </Modal>
                    </div>
                    <div className='flex flex-grow'> {/* Hace que el input ocupe el espacio disponible */}
                        <li 
                            className={`flex flex-row bg-[#535353]/40 rounded-full w-full items-center border ${isFocused ? 'border-white border-2' : 'border-transparent'}`}
                            onFocus={() => setIsFocused(true)} 
                            onBlur={() => setIsFocused(false)} 
                            tabIndex="0" // Permitir que el <li> reciba foco
                        >
                            <img src={images.loupe} alt="Buscar" className='w-6 mr-4 ml-2' />
                            <input 
                                type="text" 
                                className='bg-transparent w-full pr-40 border-r focus:outline-none' 
                                placeholder='What do you want to play?' 
                                onFocus={() => setIsFocused(true)} // Establece foco al hacer clic en el input
                                onBlur={() => setIsFocused(false)} // Limpia el foco al salir del input
                            />
                            <Modal modalContent={"Browse"}>
                                <button aria-label="Explorar">
                                    <img src={images.broswer} alt="Browser" className='ml-4 w-8 mr-2' />
                                </button>
                            </Modal>
                        </li>
                    </div>
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
                                <img src={profileImage ? profileImage : images.spotifyIcon} alt="Profile" className="cursor-pointer w-8 mr-2" />
                            </button>
                        </Modal>
                    </li>
                </div>
            </div>
        </ul>
    </nav>
    );
};

export default Navegation;
// src/components/LeftSeccion/LeftBar.js
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Album from "./Album";
import images from '../../assets/images-leftBar';
import Button from "../Button";

const LeftSeccion = () => {
    const [data, setData] = useState({});
    const [albumInformation, setAlbumInformation] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para cargar
    const [error, setError] = useState(null); // Estado para errores
    const navigate = useNavigate(); // Usa el hook useNavigate

    const fetchData = async () => {
        try {
            const response = await fetch('/localData/albums-info.json');
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const jsonData = await response.json();
            setData(jsonData);
            setError(null); // Resetea el error si la carga es exitosa
        } catch (error) {
            setError(error.message); // Establece el mensaje de error
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Cambia el estado de carga al final
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data.items) {
            const newAlbumInformation = data.items.map(item => ({
                album_id: item.album.id,
                album_type: item.album.album_type,
                album_name: item.album.name,
                album_image: item.album.images[0]?.url, // Manejo de posibles errores
                album_artist: item.album.artists[0]?.name // Manejo de posibles errores
            }));
            setAlbumInformation(newAlbumInformation);
        }
    }, [data]);

    const handleAlbumClick = (albumId) => {
        navigate(`/album/${albumId}`); // Navega a la ruta del álbum usando su ID
    };

    const displayData = () => {
        return albumInformation.map(album => (
            <Album
                key={album.album_id}
                album={album}
                onAlbumClick={() => handleAlbumClick(album.album_id)} // Pasa el ID del álbum
            />
        ));
    };

    return (
        <nav className="mr-2 ml-2 rounded-lg bg-[#121212] flex flex-col h-[calc(100vh-165px)] mt-20">
            <div className="m-2 flex flex-col mb-4">
                <div className="text-white justify-between flex mb-4">
                    <img className="w-8" src={images.library} alt="" />
                    <img className="w-8" src={images.plus} alt="" />
                </div>
                <div className="text-white justify-between flex mr-4 ml-4">
                    <Button>PlayList</Button>
                    <Button>Artist</Button>
                    <Button>Albums</Button>
                    <Button>Podcast & Shows</Button>
                </div>
            </div>
            <section className="overflow-y-scroll">
                {loading ? (
                    <p className="text-white text-center">Cargando...</p> // Mensaje de carga
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p> // Mensaje de error
                ) : (
                    displayData() // Muestra los álbumes
                )}
            </section>
        </nav>
    );
};

export default LeftSeccion;

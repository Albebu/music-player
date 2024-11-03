import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Album from "./Album";
import images from '../../assets/images-leftBar';
import Button from "../Button";

const LeftSeccion = () => {
    const [data, setData] = useState({});
    const [albumInformation, setAlbumInformation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await fetch('/localData/albums-info.json');
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const jsonData = await response.json();
            setData(jsonData);
            setError(null);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
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
                album_image: item.album.images[0]?.url,
                album_artist: item.album.artists[0]?.name
            }));
            setAlbumInformation(newAlbumInformation);
        }
    }, [data]);

    const handleAlbumClick = (albumId) => {
        navigate(`/album/${albumId}`);
    };

    const displayData = () => {
        return albumInformation.map(album => (
            <Album
                key={album.album_id}
                album={album}
                onAlbumClick={() => handleAlbumClick(album.album_id)}
            />
        ));
    };

    return (
        <div className="">
            {/* Small Screen Navigation */}
            <nav className="ml-2 mr-2 rounded-lg bg-[#121212] flex flex-col h-[calc(100vh-4rem)] md:hidden w-16 overflow-y-scroll">
                <img className="w-8" src={images.library} alt="" />
                <section className="overflow-y-scroll">
                    {loading ? (
                        <p className="text-white text-center">Cargando...</p>
                    ) : error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : (
                        displayData()
                    )}
                </section>
            </nav>

            {/* Large Screen Navigation */}
            <nav className="hidden md:flex l-2 mr-2 md:flex-col rounded-lg bg-[#121212] h-[calc(100vh-4rem)] w-96 overflow-y-scroll">
                <div className="text-white justify-between flex">
                    <img className="w-8" src={images.library} alt="" />
                    <img className="w-8" src={images.plus} alt="" />
                </div>
                <div className="text-white justify-between flex pr-4 pl-4 pb-4">
                    <Button>PlayList</Button>
                    <Button>Artist</Button>
                    <Button>Albums</Button>
                    <Button>Podcast & Shows</Button>
                </div>
                <section className="overflow-y-scroll">
                    {loading ? (
                        <p className="text-white text-center">Cargando...</p>
                    ) : error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : (
                        displayData()
                    )}
                </section>
            </nav>
        </div>
    );
};

export default LeftSeccion;

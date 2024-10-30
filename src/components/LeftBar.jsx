import { useEffect, useState } from "react";
import Album from "./Album";
import images from '../assets/images-leftBar';
import Button from "./Button"; // Asegúrate de importar tus estilos

const LeftBar = () => {
    const [data, setData] = useState({});
    const [albumInformation, setAlbumInformation] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('/localData/albums-info.json');
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            setData(await response.json());
        } catch (error) {
            console.error('Error fetching data:', error);
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
                album_image: item.album.images[0].url,
                album_artist: item.album.artists[0].name
            }));
            setAlbumInformation(newAlbumInformation);
        }
    }, [data]);

    const displayData = () => {
        return albumInformation.map(album => (
            <Album
                key={album.album_id}
                image={album.album_image}
                albumName={album.album_name}
                albumType={album.album_type}
                artist={album.album_artist}
            />
        ));
    }

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
                {albumInformation.length > 0 ? displayData() : null}
            </section>
        </nav>
    );
}

export default LeftBar;

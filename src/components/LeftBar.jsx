import { useEffect, useState } from "react";
import Album from "./Album";
import images from '../assets/images-leftBar'
import Button from "./Button";

const LeftBar = () => {
    const [data, setData] = useState({});
    const [total, setTotal] = useState(0);

    const [albumInformation, setAlbumInformation] = useState([]);
    // Obtención de los albumes seguidos por el usuario
    const fetchData = async () => {
        try {
            // foto, nombre, tipo de album, autor

            const accessToken = localStorage.getItem("accessToken");
            // Limit: 50 offset: 0 country: accessToken
            //'https://api.spotify.com/v1/me/albums?limit=50'
            const response = await fetch('/localData/albums-info.json', {
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            
            setData(await response.json());
            setTotal(data.total);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    

    useEffect(() => {
        const getAlbumsInformation = async () => {
            data.items.forEach((item) => {
                const albumInfo = {
                    alubm_id: item.album.id,
                    album_type: item.album.album_type,
                    album_name: item.album.name,
                    album_image: item.album.images[0].url,
                    album_artist: item.album.artists[0].name
                };
                console.log(albumInfo);
                setAlbumInformation(prevState => [...prevState, albumInfo]);
            });
        }

        getAlbumsInformation()
    }, [data]);

    const displayData = () => {
        return albumInformation.map(album => {
            console.log("Dentro del renderizado de cada Album");
            return (
                <Album
                    key={album.album_id}  // Asegúrate de que el nombre del ID es correcto
                    image={album.album_image}
                    albumName={album.album_name}
                    albumType={album.album_type}
                    artist={album.album_artist}
                />
            );
        });
    }
    

    return (
        <nav className=" mr-2 ml-2 rounded-lg bg-[#121212] flex flex-col  h-[calc(100vh-165px)] mt-20">
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
            <section className=" overflow-y-scroll">
                {console.log("Album information, leftbar", albumInformation)}
                
                <div>
                    {albumInformation.length > 0 ? displayData() : null}
                </div>
            </section>
        </nav>
    );
    
}

export default LeftBar;
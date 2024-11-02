import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from 'react-router-dom';

const Home = ({ songInformation, setSongInformation }) => {
    const [term, setTerm] = useState("longTerm");
    const [mostListened, setMostListened] = useState([]);
    const [featuredSongs, setFeaturedSongs] = useState([]);
    const [recommendedArtists, setRecommendedArtists] = useState([]);
    const navigate = useNavigate(); 

    const handleTermChange = (newTerm) => {
        setTerm(newTerm);
    };

    useEffect(() => {
        const getMostListened = async () => {
            try {
                const response = await fetch(`/localData/most-listened-tracks-${term}.json`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                const tracks = data.items.map((track) => ({
                    name: track.name,
                    image: track.album.images[0].url
                }));
                setMostListened(tracks);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getMostListened();
    }, [term]);

    const displayMostListened = () => (
        mostListened.map((track, index) => (
            <div key={index} className="flex flex-row gap-4 truncate hover:bg-[#2A2A2A] items-center">
                <img src={track.image} className="w-14 h-14" alt={track.name} />
                <p>{track.name}</p>
            </div>
        ))
    );

    useEffect(() => {
        const getFeaturedSongs = async () => {
            try {
                const response = await fetch('/songsData/songsData.json');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setFeaturedSongs(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getFeaturedSongs();
    }, []);

    const handleSongClick = (songId) => {
        navigate(`/song/${songId}`); 
    };

    const displayFeaturedSongs = () => (
        featuredSongs.map((song) => (
            <div key={song.id} className="flex flex-col min-w-[8rem] max-w-[8rem] gap-2 hover:bg-[#2A2A2A] items-center text-white" onClick={() => {
                setSongInformation({
                    title: song.title,
                    artist: song.artist,
                    image: song.image,
                    duration: song.duration,
                    audio: `http://83.40.227.248:3000/audio/${song.title}.mp3`,
                });
                handleSongClick(song.id); // Llama a la función de manejo al hacer clic
            }}>
                <img src={song.image} className="w-32 h-32 pt-2" alt={song.title} />
                <p className="truncate text-center w-full">{song.title}</p>
            </div>
        ))
    );
    

    useEffect(() => {
        const getRecommendedArtists = async () => {
            try {
                const response = await fetch('/songsData/recomendedArtist.json');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                const artists = data.map((artist) => ({
                    name: artist.name,
                    image: artist.image,
                }));
                setRecommendedArtists(artists);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getRecommendedArtists();
    }, []);

    const displayRecommendedArtists = () => (
        recommendedArtists.map((artist, index) => (
            <div key={index} className="flex flex-col min-w-[8rem] max-w-[8rem] gap-2 hover:bg-[#2A2A2A] items-center text-white">
                <img src={artist.image} className="w-32 h-32 pt-2 rounded-full" alt={artist.name} />
                <p className="truncate text-center w-full">{artist.name}</p>
            </div>
        ))
    );

    return (
        <div className="bg-[#121212] h-screen pt-24 pl-4">
            <section className="flex flex-col pt-2">
                <section className="flex flex-row gap-4 text-white h-8">
                    <Button onClick={() => handleTermChange("shortTerm")}>Último mes</Button>
                    <Button onClick={() => handleTermChange("mediumTerm")}>Últimos 6 meses</Button>
                    <Button onClick={() => handleTermChange("longTerm")}>Último año</Button>
                </section>
                <section className="text-white pt-6">
                    <span className="font-[600] text-2xl">Most listened songs</span>
                    <div className="grid grid-rows-4 grid-cols-2 gap-4">
                        {displayMostListened()}
                    </div>
                </section>
            </section>
            <section className="flex flex-col pt-14">
                <span className="text-white font-[600] text-2xl mb-4">Featured Songs</span>
                <div className="flex flex-row gap-4 overflow-x-scroll max-w-full scrollbar-hide">
                    {displayFeaturedSongs()}
                </div>
            </section>
            <section className="flex flex-col mt-8">
                <span className="text-white font-[600] text-2xl mb-4">Recommended Artists</span>
                <div className="flex flex-row gap-4 overflow-x-scroll max-w-full scrollbar-hide">
                    {displayRecommendedArtists()}
                </div>
            </section>
        </div>
    );
};

export default Home;

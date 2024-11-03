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


    return (
        <div className="bg-[#121212] h-[calc(100vh-4rem)] text-white flex flex-col border- border-black rounded-lg">
            <div className="flex flex-row pt-2 gap-4">
                <Button onClick={() => handleTermChange("shortTerm")}>Último mes</Button>
                <Button onClick={() => handleTermChange("mediumTerm")}>Últimos 6 meses</Button>
                <Button onClick={() => handleTermChange("longTerm")}>Último año</Button>
            </div>

            {/* Large sección */}
            <section className="hidden lg:block">
                <span className="font-[600] text-lg lg:text-[2vw]">Most listened songs</span>
                <div className="grid grid-rows-2 grid-cols-4 gap-4 pr-6 pl-6 pt-4">
                    {mostListened.map((track, index) => (
                        <div key={index} className="flex flex-row gap-4 truncate bg-[#2A2A2A] hover:bg-[#3A3A3A] items-center">
                            <img src={track.image} className="w-14 h-14 lg:w-[4vw] lg:h-[4vw]" alt={track.name} />
                            <p className="text-xs 2xl:text-lg font-[800]">{track.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Small sección */}
            <section className="lg:hidden">
                <span className="font-[600] text-lg lg:text-[2vw]">Most listened songs</span>
                <div className="grid grid-rows-4 grid-cols-2 gap-4 pr-6 pl-6 pt-4 w-full">
                    {mostListened.map((track, index) => (
                        <div key={index} className="flex flex-row gap-4 truncate bg-[#2A2A2A] hover:bg-[#3A3A3A] items-center">
                            <img src={track.image} className="w-14 h-14 lg:w-[4vw] lg:h-[4vw]" alt={track.name} />
                            <p className="text-xs 2xl:text-lg font-[800] truncate">{track.name}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="flex flex-col">
                <div>
                    <span>Recommended Songs</span>
                </div>
                <div className="overflow-x-auto whitespace-nowrap max-w-[calc(100vw-24rem)] pl-6 pr-6 pb-2"> {/* Ajusta la altura máxima aquí */}
                    <div className="flex flex-row gap-4">
                        {featuredSongs.map((song) => (
                            <div 
                                key={song.id} 
                                className="flex flex-col min-w-[8rem] max-w-[8rem] gap-2 hover:bg-[#2A2A2A] items-center text-white"
                                onClick={() => {
                                    setSongInformation({
                                        title: song.title,
                                        artist: song.artist,
                                        image: song.image,
                                        duration: song.duration,
                                        audio: `http://83.40.227.248:3000/audio/${song.title}.mp3`,
                                    });
                                    handleSongClick(song.id);
                                }}
                            >
                                <img 
                                    src={song.image} 
                                    className="w-32 h-32 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 2xl:w-36 2xl:h-36 pt-2" 
                                    alt={song.title} 
                                />
                                <p className="truncate text-center w-full">{song.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="flex flex-col">
                <div>
                    <span>Recommended Artists</span>
                </div>
                <div className="overflow-x-auto whitespace-nowrap max-w-[calc(100vw-24rem)] pl-6 pr-6 pb-2">
                    <div className="flex flex-row gap-4">
                        {recommendedArtists.map((artist, index) => (
                            <div 
                                key={index} 
                                className="flex flex-col min-w-[8rem] max-w-[8rem] gap-2 hover:bg-[#2A2A2A] items-center text-white"
                            >
                                <img 
                                    src={artist.image} 
                                    className="rounded-full w-32 h-32 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 2xl:w-36 2xl:h-36 pt-2" 
                                    alt={artist.name} 
                                />
                                <p className="truncate text-center w-full">{artist.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

import { useEffect, useState } from "react";
import Button from "./Button";

const Content = () => {
    const [term, setTerm] = useState("longTerm");
    const [mostListened, setMostListened] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                const response = await fetch('/localData/most-lis', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                // Asumiendo que setData y setTotal no son necesarios
                // setData(data);
                // setTotal(data.total);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Añadimos una lista de dependencias vacía para que se ejecute solo una vez

    const handleTermChange = (newTerm) => {
        setTerm(newTerm);
    }

    useEffect(() => {
        const getMostListened = async () => {
            try {
                const response = await fetch(`/localData/most-listened-tracks-${term}.json`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                const tracks = data.items.map((track) => {
                    return {
                        name: track.name,
                    }
                });

                setMostListened(tracks);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        getMostListened();
    }, [term]);

    const displayMostListened = () => {
        return mostListened.map((track, index) => {
            return (
                <p key={index}>{track.name}</p>
            );
        });
    }

    return (
        <div className="bg-[#121212] h-screen pt-10 grid grid-rows-3 pl-4">
            <section className="flex flex-col">
                <section className="flex flex-row gap-4 text-white h-8 mt-14">
                    <Button onClick={() => handleTermChange("shortTerm")}>Último mes</Button>
                    <Button onClick={() => handleTermChange("mediumTerm")}>Últimos 6 meses</Button>
                    <Button onClick={() => handleTermChange("longTerm")}>Último año</Button>
                </section>
                <section className="grid grid-rows-2 grid-cols-4 text-white mt-12">
                    {displayMostListened()}
                </section>
            </section>
            <section className="grid grid-cols-6">
                <p>Most listened</p>
                <p>Most listened</p>
                <p>Most listened</p>
                <p>Most listened</p>
                <p>Most listened</p>
                <p>Most listened</p>
            </section>
            <section className="grid grid-cols-6">
                <p>Most listened</p>
                <p>Most listened</p>
                <p>Most listened</p>
                <p>Most listened</p>
                <p>Most listened</p>
                <p>Most listened</p>
            </section>
        </div>
    );
}

export default Content;
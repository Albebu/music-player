import { useEffect, useState } from "react";
import Button from "./Button";

const Content = () => {
    const [term, setTerm] = useState("medium_term");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // foto, nombre, tipo de album, autor
    
                const accessToken = localStorage.getItem("accessToken");
                // Limit: 50 offset: 0 country: accessToken
                //'https://api.spotify.com/v1/me/albums?limit=50'
                const response = await fetch('/localData/most-lis', {
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
    })

    return(
        <div className="bg-[#121212] h-screen pt-10 grid grid-rows-3 pl-4">
            <section className="flex flex-col">
                <section className="flex flex-row gap-4 text-white h-8 mt-12">
                    <Button>Último mes</Button>
                    <Button>Últimos 6 meses</Button>
                    <Button>Último año</Button>
                </section>
                <section className="grid grid-rows-2 grid-cols-4">
                    <p>Most listened</p>
                    <p>Most listened</p>
                    <p>Most listened</p>
                    <p>Most listened</p>
                    <p>Most listened</p>
                    <p>Most listened</p>
                    <p>Most listened</p>
                    <p>Most listened</p>    
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
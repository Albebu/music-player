import { useEffect, useState } from "react";

const LeftBar = () => {
    // Obtención de los albumes seguidos por el usuario
    const fetchData = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
    
            const response = await fetch('https://api.spotify.com/v1/me/albums?limit=50', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <aside className="bg-gray-600 ">

        </aside>
    );
}

export default LeftBar;
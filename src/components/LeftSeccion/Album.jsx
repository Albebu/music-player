// src/components/Album.js
import React from 'react';

const Album = ({ album, onAlbumClick }) => {
    const handleClick = () => {
        onAlbumClick(album);
    };

    return(
        <article onClick={handleClick} className="flex flex-row hover:bg-[#2A2A2A] hover:rounded align-middle">
            <div className="w-16 h-16 flex items-center justify-center">
                <img className="w-12 h-12 object-cover rounded" src={album.album_image} alt="" />
            </div>
            <div className="flex flex-col ml-4">
               <div>
                    <p className="text-white font-[500] truncate max-w-xs">{album.album_name}</p>
               </div>
                <div className="flex flex-row space-x-2 text-[#aba9a9]">
                    <span>{album.album_type}</span>
                    <span>{album.album_artist}</span>
                </div>
            </div>
        </article>
    );
};

export default Album;

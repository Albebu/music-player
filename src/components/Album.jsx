const Album = ({ image, albumName, albumType, artist }) => {
    return(
        <article className="flex flex-row hover:bg-[#2A2A2A] hover:rounded align-middle">
            {console.log("Dentro de album")}
            <div className="w-16 h-16 flex items-center justify-center">
                <img className="w-12 h-12 object-cover rounded" src={image} alt="" />
            </div>
            <div className="flex flex-col ml-4">
               <div>
                    <p className="text-white font-[500] truncate max-w-xs">{albumName}</p>
               </div>
                <div className="flex flex-row space-x-2 text-[#aba9a9]">
                    <span>{albumType}</span>
                    <span>{artist}</span>
                </div>
            </div>
        </article>
    );
}

export default Album;
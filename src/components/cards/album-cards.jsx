import React from "react";
import "./album.css"

function AlbumCards({ album }) {
  return (
    <div>
      <div  key={album.albumId} class="bg-white rounded-lg">
        <img
          class="rounded-lg album-cover-img"
          src={album.albumArtUrl}
          alt={album.albumName}
        />
        <div 
        class="pt-4"
        >
          <h5 class="mb-2 text-l font-medium tracking-tight text-black">
          {album.albumName}
          </h5>
          <p className="text-sm font-bold text-gray-600">{album.artists}</p>
        </div>
      </div>
    </div>
  );
}

export default AlbumCards;

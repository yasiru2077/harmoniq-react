import React from "react";
import "./album.css"

function AlbumCards() {
  return (
    <div>
      <div class="bg-white rounded-lg">
        <img
          class="rounded-lg album-cover-img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpqmzmrmfYnjeSbJlag2f0K9YW4uhwAYFgyg&s"
          alt=""
        />
        <div 
        class="pt-4"
        >
          <h5 class="mb-2 text-l font-medium tracking-tight text-black">
            Noteworthy technology acquisitions 2021
          </h5>
        </div>
      </div>
    </div>
  );
}

export default AlbumCards;

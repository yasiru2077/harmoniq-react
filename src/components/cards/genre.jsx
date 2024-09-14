import React from "react";
import blues from "../../assets/images/blues.jpg";
import classical from "../../assets/images/classical.jpg";
import country from "../../assets/images/country.jpg";
import electronic from "../../assets/images/electronic.jpg";
import folk from "../../assets/images/folk.jpg";
import hipHopRap from "../../assets/images/hipHopRap.jpg";
import jazz from "../../assets/images/jazz.jpg";
import latin from "../../assets/images/latin.jpg";
import metal from "../../assets/images/metal.jpg";
import pop from "../../assets/images/pop.jpg";
import reggae from "../../assets/images/reggae.jpg";
import rock from "../../assets/images/rock.jpg";
import musicGenres from "../../assets/music-genres";
import rnbSoul from "../../assets/images/rnbSoul.jpg"
import "./genre.css"

function Genre() {

    const genreImageMap = {
        blues: blues,
        classical: classical,
        country: country,
        electronic: electronic,
        folk: folk,
        hipHopRap: hipHopRap,
        jazz: jazz,
        latin: latin,
        metal: metal,
        pop: pop,
        reggae: reggae,
        rock: rock,
        rnbSoul:rnbSoul,
      };

    const genreEntries = Object.entries(musicGenres)
  return (
    <div className="Genre grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {genreEntries.map(([genre, subgenres]) => (
      <div key={genre} className="max-w-72 bg-white border border-gray-200 rounded-lg shadow">
        <img className="rounded-t-lg w-full h-48 object-cover" src={genreImageMap[genre]} alt={genre} />
        <div className="p-5 bg-[#F6E4FF]">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {genre}
          </h5>
          {/* <p className="text-sm text-gray-600">
            {subgenres.length} subgenres
          </p> */}
        </div>
      </div>
    ))}
  </div>
  );
}

export default Genre;

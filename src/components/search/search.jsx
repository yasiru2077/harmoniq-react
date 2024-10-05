import React, { useEffect, useState } from "react";
import "./search.css";
import { Search as SearchIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Search() {
  const [albums, setAlbums] = useState([]);
  // const [stats, setStats] = useState({ totalAlbums: 0, totalTracks: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          "https://zzb1t95lb3.execute-api.ap-south-1.amazonaws.com/Development/albums"
        );
        setAlbums(response.data.albums);

        // Calculate stats
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchAlbums();
  }, []);

  const filterAlbums = () => {
    if (!searchTerm.trim()) return albums;

    return albums.filter((album) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        album.genre.toLowerCase().includes(searchLower) ||
        album.albumName.toLowerCase().includes(searchLower) ||
        album.artists.some((artist) =>
          artist.toLowerCase().includes(searchLower)
        ) ||
        album.tracks.some((track) =>
          track.trackName.toLowerCase().includes(searchLower)
        )
      );
    });
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const Unkown = "Unkown";

  const handleAlbumClick = (album) => {
    navigate("/musicplayer", { state: { album } });
  };

  

  return (
    <React.Fragment>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          className="search-text"
          onChange={handleSearchChange}
          placeholder="Search albums, artists, genres, or tracks"
        />
        <button>
          <SearchIcon size={18} />
        </button>
      </div>
      {searchTerm === "" ? (
        ""
      ) : (
        <section className="album-grid">
          <h1 className="font-bold pb-4">Songs And Artist</h1>
          {filterAlbums().map((album) => (
            <div
              key={album.albumId}
              onClick={() => handleAlbumClick(album)}
              className="cursor-pointer rounded-lg flex gap-5 p-1 mb-3 bg-[#E8EEF3] "
            >
              <img
                src={album.albumArtUrl}
                alt={album.albumName}
                className="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition duration-200"
              />
              <div className="flex flex-col items-start justify-center">
                <p className="text-gray-900 font-semibold text-[16px] text-center ">
                  {album.albumName}
                </p>
                <p className="text-gray-600 font-medium text-[14px] text-center">
                  {album.artists || Unkown}
                </p>
                <p className="text-gray-400 font-normal text-[12px] text-center">
                  {album.genre}
                </p>
              </div>

            </div>
          ))}
        </section>
      )}
    </React.Fragment>
  );
}

export default Search;

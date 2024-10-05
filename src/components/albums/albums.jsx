import React, { useEffect, useState } from "react";
import "./albums.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import AlbumCards from "../cards/album-cards";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          "https://zzb1t95lb3.execute-api.ap-south-1.amazonaws.com/Development/albums"
        );
        setAlbums(response.data.albums);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  const handleAlbumClick = (album) => {
    navigate("/musicplayer", { state: { album } });
  };

  return (
    <div className="albums-container">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          1000: { slidesPerView: 3 },
          800: { slidesPerView: 2 },
          500: { slidesPerView: 2 },
          0: {
            slidesPerView: 1,
          },
        }}  
      >
        {albums.map((album) => (
          <SwiperSlide key={album.id}>
            <div onClick={() => handleAlbumClick(album)}>
              <AlbumCards album={album} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Albums;

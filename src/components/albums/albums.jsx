import React from "react";
import "./albums.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import AlbumCards from "../cards/album-cards";

function Albums() {
  return (
    <div className="albums-container">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          1000:{slidesPerView:3},
          800:{slidesPerView:2},
          500:{slidesPerView:2},
          0: {
            slidesPerView: 1,
          },
        }}
      >
        <SwiperSlide>
          <AlbumCards />
        </SwiperSlide>
        <SwiperSlide>
          <AlbumCards />
        </SwiperSlide>
        <SwiperSlide>
          <AlbumCards />
        </SwiperSlide>
        <SwiperSlide>
          <AlbumCards />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Albums;

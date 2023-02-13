import { Navigation } from "swiper";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { IBanner } from "types";
import styles from "./homeBanner.module.scss";
import WrapLink from "components/WrapLink";
import { PATH } from "constants/path";
import { Image } from "components/Image";
import { IMAGE_SIZE, resizeImageLoklok } from "constants/global";
import React, { useState, useEffect } from "react";


interface HomeBannerProps {
  banners: IBanner[];
}

const stylesSwiper = {
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: "#000"
};

const HomeBanner = ({ banners }: HomeBannerProps) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=80d38ce4b783b1c72330ca00da8dd2d3&language=en-US&page=1')
      .then(res => res.json())
      .then(data => setMovies(data.results))
  }, []);

  return (
    <section>
     
      <Swiper loop navigation={true} autoplay={true} modules={[Navigation, Autoplay]}  style={stylesSwiper} autoplay={{delay:7000, pauseOnMouseEnter:true, disableOnInteraction:false }} speed={1000}>
      
      {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            
            
            <div className={styles.movietitle}>{movie.title}<div className={styles.movierating}>{movie.vote_average}</div><div className={styles.movieoverview}>{movie.overview}</div></div>
            
               <img src={`https://www.themoviedb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
              

           
          </SwiperSlide>
        ))}

 

      </Swiper>
    </section>
  );
};

export default HomeBanner;

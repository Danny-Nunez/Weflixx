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
import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi"


interface HomeBannerProps {
  banners: IBanner[];
}


const stylesSwiper = {
  borderRadius: "8px",
  
  backgroundColor: "#000"
};

const HomeBanner = ({ banners }: HomeBannerProps) => {
  const [movies, setMovies] = useState([] as any[]);
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=80d38ce4b783b1c72330ca00da8dd2d3&language=en-US&page=1')
      .then(res => res.json())
      .then(data => setMovies(data.results))
  }, []);

  const [modal, setModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const openModal = () => {
    setModal(!modal);
  };

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  return (
    <section>
     
      <Swiper loop navigation={true} modules={[Navigation, Autoplay]}  style={stylesSwiper} autoplay={{delay:7000, pauseOnMouseEnter:true, disableOnInteraction:false }} speed={1000}>
      
      {movies.map((movie) => (
          <SwiperSlide key={movie} >
            
            <div className={styles.movieoverlay}>
            <div className={styles.movietitle}>{movie.title}
            <div className={styles.movierating}>{movie.vote_average}<span className={styles.moviespan}>&#9733;</span></div>
            <div className={styles.movieoverview}>{movie.overview}</div>
            <WrapLink href={`/search?keyword=${movie.title}`}>
            <button className={styles.moviewatchbutton}>WATCH NOW</button>
            </WrapLink>
            
            
            {/* <button onClick={openModal} className={styles.movietrailerbutton}>
        TRAILER
        {modal ? (
          <section className={styles.modal__bg}>
            <div className={styles.modal__align}>
              <div className={styles.modal__content} modal={modal}>
                <IoCloseOutline
                  className={styles.modal__close}
                  arial-label="Close modal"
                  onClick={setModal}
                />
                <div className={styles.modal__video_align}>
                  {videoLoading ? (
                    <div className={styles.modal__spinner}>
                      <BiLoaderAlt
                        className={styles.modal__spinner_style}
                        fadeIn="none"
                      />
                    </div>
                  ) : null}
                  <iframe
                    className={styles.modal__video_style}
                    onLoad={spinner}
                    loading="lazy"
                    width="800"
                    height="500"
                    src={`https://autoembed.to/trailer/movie/${movie.id}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                    </iframe>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </button> */}


            
            </div>
            
               <Image src={`https://www.themoviedb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
              
               
               </div>
           
        </SwiperSlide>
        ))}

 

      </Swiper>
    </section>
  );
};

export default HomeBanner;

import axiosClient from "configs/axiosClient";
import { REVALIDATE_TIME } from "constants/global";
import LayoutPrimary from "layouts/LayoutPrimary";
import CheckInView from "modules/CheckInView";
import HomeBanner from "modules/HomeBanner";
import MovieCard from "modules/MovieCard";
import MovieList from "modules/MovieList";
import { MovieListSkeleton } from "modules/MovieSkeleton";
import { GetStaticProps } from "next";
import queryString from "query-string";
import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { IBanner, ICategoryResult, IHomeSection } from "types";
// import SimpleImageSlider from "react-simple-image-slider";
import styles from "../styles/swipershell.module.scss";
import React from 'react';
import { Slide } from 'react-slideshow-image';

interface HomePageProps {
  banners: IBanner[];
}

const Example = () => {
  const slideImages = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];
}




// const slideImages = [
//   { url: "https://www.themoviedb.org/t/p/original/w8Oqg1C7t5rUU9S1tN1QHi7SLc5.jpg" },
//   { url: "https://www.themoviedb.org/t/p/original/bty0TwJGsxMqYRptgyzn28Cxq5y.jpg" },
//   { url: "https://www.themoviedb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg" },
//   { url: "https://www.themoviedb.org/t/p/original/lQsnGnrCGdjk4JcMI61qfOOiOzP.jpg" },
//   { url: "https://www.themoviedb.org/t/p/original/jy82OESqwC1dtT406IHtRUbkrRZ.jpg" },
// ];

const HomePage = ({ banners }: HomePageProps) => {
  const getApiUrl = (index: number, prevData: ICategoryResult[] | null) => {
    const isEmptyData = prevData?.length === 0;
    if (isEmptyData) return null;
    const sort = prevData?.[prevData.length - 1]?.sort || "";
    const apiURL = `/api/category?${queryString.stringify({ area: "61", size: 12, sort })}`;
    return apiURL;
  };
  const {
    data: movies = [],
    setSize,
    error
  } = useSWRInfinite(
    getApiUrl,
    async (apiURL: string) => {
      const { data } = await axiosClient.get(apiURL);
      return data;
    },
    { revalidateFirstPage: false, fallbackData: [] }
  );
  const isReachingEnd = movies?.[movies.length - 1]?.length === 0;
  const hasNextPage = movies && !error && !isReachingEnd;
  const handleLoadMore = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  return (
    <LayoutPrimary>
      <div className="container">
        
      
      
  
      
      {/* <Slide>
            <div className={styles.swipercontainer}>
                <div style={{ 'backgroundImage': `url(${slideImages[0]})` }}>
                    <span>Slide 1</span>
                </div>
            </div>
            <div className={styles.swipercontainer}>
                <div style={{ 'backgroundImage': `url(${slideImages[1]})` }}>
                    <span>Slide 2</span>
                </div>
            </div>
            <div className={styles.swipercontainer}>
                <div style={{ 'backgroundImage': `url(${slideImages[2]})` }}>
                    <span>Slide 3</span>
                </div>
            </div>
        </Slide> */}
      
  
      
      {/* <SimpleImageSlider
        width={900}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
      />
     */}
        <HomeBanner banners={banners} />
        
        
        <div style={{ marginTop: "40px" }}>
          {(movies.length as number) > 0 ? (
            <MovieList>
              {movies.flat().map((result: ICategoryResult) => (
                <MovieCard
                  key={result.id}
                  id={result.id}
                  title={result.name}
                  domainType={result.domainType}
                  poster={result.coverVerticalUrl}
                />
              ))}
            </MovieList>
          ) : (
            <MovieListSkeleton count={12} />
          )}
          {hasNextPage && (
            <CheckInView onInView={handleLoadMore}>
              <MovieListSkeleton />
            </CheckInView>
          )}
        </div>
      </div>
    </LayoutPrimary>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: banners } = await axiosClient.get(`/api/banner`);
    return {
      props: { banners },
      revalidate: REVALIDATE_TIME.success
    };
  } catch (error) {
    return {
      props: { banners: [] },
      revalidate: REVALIDATE_TIME.fail
    };
  }
};

export default HomePage;

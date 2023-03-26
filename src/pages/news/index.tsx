import { INewsCard } from "types";
import Meta from "components/Meta";
import axiosClient from "configs/axiosClient";
import { REVALIDATE_TIME } from "constants/global";
import LayoutPrimary from "layouts/LayoutPrimary";
import CheckInView from "modules/CheckInView";
import { NewsCard } from "modules/NewsCard";
import { NewsList, NewsListSkeleton } from "modules/NewsList";
import { GetServerSidePropsContext, GetStaticProps } from "next";
import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";

interface NewsPageProps {
  initialNews: INewsCard[];
}

const NewsPage = ({ initialNews }: NewsPageProps) => {
  const getApiUrl = (index: number) => `/api/news?page=${index + 1}`;
  const {
    data: news,
    error,
    setSize
  } = useSWRInfinite(
    getApiUrl,
    async (apiURL: string) => {
      const { data } = await axiosClient.get(apiURL);
      return data.list;
    },
    { revalidateFirstPage: false, fallbackData: [] }
  );
  const isReachingEnd = news?.[news.length - 1]?.length === 0;
  const hasNextPage = news && !error && !isReachingEnd;
  const handleLoadMore = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  return (
    <LayoutPrimary>
      <Meta title="News - NetFilm" />
      <div className="container">
        <NewsList>
          {initialNews.map((item) => (
            <NewsCard
              key={item.id}
              id={item.id}
              image={item.coverImg}
              title={item.title}
              introduction={item.introduction}
            />
          ))}
          {news?.flat().map((item) => (
            <NewsCard
              key={item.id}
              id={item.id}
              image={item.coverImg}
              title={item.title}
              introduction={item.introduction}
            />
          ))}
        </NewsList>
        {hasNextPage && (
          <CheckInView onInView={handleLoadMore}>
            <NewsListSkeleton />
          </CheckInView>
        )}
      </div>
    </LayoutPrimary>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await axiosClient.get(`/api/news`);
    return {
      props: { initialNews: data.list },
      revalidate: REVALIDATE_TIME.success
    };
  } catch (error) {
    return {
      props: { initialNews: [] },
      revalidate: 60,
      notFound: REVALIDATE_TIME.fail
    };
  }
};

export default NewsPage;

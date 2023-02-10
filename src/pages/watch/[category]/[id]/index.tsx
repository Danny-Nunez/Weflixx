import { IEpisode } from "types";
import axiosClient from "configs/axiosClient";
import { REVALIDATE_TIME } from "constants/global";
import { WatchPage } from "modules/WatchPage";
import { GetServerSideProps } from "next";

interface WatchTVPageProps {
  data: IEpisode;
}

const WatchTVPage = ({ data }: WatchTVPageProps) => {
  return <WatchPage data={data} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { data } = await axiosClient.get(`/api/episode`, { params: query });
    return {
      props: { data }
    };
  } catch (error) {
    return {
      props: {},
      notFound: true
    };
  }
};

export default WatchTVPage;

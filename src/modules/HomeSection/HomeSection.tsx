import MovieCard from "modules/MovieCard";
import MovieList from "modules/MovieList";
import { IHomeSection } from "types";

interface HomeListProps {
  homeSection: IHomeSection;
}

const HomeSection = ({ homeSection }: HomeListProps) => {
  return (
    <MovieList heading={homeSection.homeSectionName}>
      {homeSection.homeMovies.slice(0, 12).map((section) => {
        return (
          <MovieCard
            key={section.id}
            id={section.id.toString()}
            title={section.title}
            poster={section.imageUrl}
            domainType={section.category}
          />
        );
      })}
    </MovieList>
  );
};

export default HomeSection;

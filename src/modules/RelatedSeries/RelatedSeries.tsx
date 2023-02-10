import { IRefItem } from "types";
import WrapLink from "components/WrapLink";
import { PATH } from "constants/path";
import { Image } from "components/Image";
import styles from "./relatedSeries.module.scss";

interface RelatedSeriesProps {
  refList: IRefItem[];
}

const RelatedSeries = ({ refList }: RelatedSeriesProps) => {
  if (refList.length === 0) return null;
  return (
    <div className={styles.relatedList}>
      <span className={styles.relatedHeading}>Related series</span>
      {refList.map((movie) => (
        <div key={movie.id} className={styles.relatedMovie}>
          <WrapLink
            href={`${PATH.watch}/${movie.category}/${movie.id}`}
            className={styles.relatedThumb}
          >
            <Image src={movie.coverHorizontalUrl} width={130} height={70} alt={movie.name} />
          </WrapLink>
          <div className={styles.relatedInfo}>
            <WrapLink href={`${PATH.watch}/${movie.category}/${movie.id}`}>{movie.name}</WrapLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedSeries;

import { IStar } from "types";
import { StarItem } from "modules/StarItem";
import styles from "./watchStar.module.scss";

interface WatchStarProps {
  starList: IStar[];
}

const WatchStar = ({ starList }: WatchStarProps) => {
  if (starList.length === 0) return null;
  return (
    <div className={styles.list}>
      {starList.map((star) => (
        <StarItem key={star.starId} image={star.image} name={star.localName} starId={star.starId} />
      ))}
    </div>
  );
};

export default WatchStar;

import WrapLink from "components/WrapLink";
import { PATH } from "constants/path";
import { Image } from "components/Image";
import styles from "./starItem.module.scss";

interface CastProps {
  starId: number;
  image: string;
  name: string;
}

const StarItem = ({ image, name, starId }: CastProps) => {
  return (
    <div className={styles.star}>
      <div className={styles.avatar}>
        <WrapLink href={`${PATH.star}/${starId}`}>
          <Image src={image} width={100} height={100} alt={name} />
        </WrapLink>
      </div>
      <WrapLink href={`${PATH.star}/${starId}`} className={styles.name}>
        {name}
      </WrapLink>
    </div>
  );
};

export default StarItem;

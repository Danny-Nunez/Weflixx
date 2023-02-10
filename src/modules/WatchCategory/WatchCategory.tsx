import { IObjIdName } from "types";
import WrapLink from "components/WrapLink";
import { PATH } from "constants/path";
import styles from "./watchCategory.module.scss";

interface WatchCategoryProps {
  categories: IObjIdName[];
}

const WatchCategory = ({ categories }: WatchCategoryProps) => {
  return (
    <div className={styles.categories}>
      {categories.map((category) => (
        <WrapLink
          key={category.id}
          href={`${PATH.category}?category=${category.id}`}
          className={styles.category}
        >
          {category.name}
        </WrapLink>
      ))}
    </div>
  );
};

export default WatchCategory;

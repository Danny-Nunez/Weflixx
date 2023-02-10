import styles from "./newsCardSkeleton.module.scss";

const NewsCardSkeleton = () => {
  return (
    <div>
      <div className={styles.thumbnail} />
      <div className={styles.title} />
      <div className={styles.description} />
    </div>
  );
};

export default NewsCardSkeleton;

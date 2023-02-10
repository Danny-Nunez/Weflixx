import styles from "./movieSkeleton.module.scss";

const MovieSkeleton = ({}) => {
  return (
    <div>
      <div className={styles.poster}></div>
      <div className={styles.title}></div>
    </div>
  );
};

export default MovieSkeleton;

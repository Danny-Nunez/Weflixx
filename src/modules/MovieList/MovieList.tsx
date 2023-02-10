import React from "react";
import styles from "./movieList.module.scss";

interface MovieListProps {
  heading?: string;
  children: React.ReactNode;
}

const MovieList = ({ heading, children }: MovieListProps) => {
  return (
    <div className={styles.section}>
      {heading && <h3 className={styles.heading}>{heading}</h3>}
      <div className={styles.list}>{children}</div>
    </div>
  );
};

export default MovieList;

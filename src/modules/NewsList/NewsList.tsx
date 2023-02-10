import React from "react";
import styles from "./newsList.module.scss";

interface NewsListProps {
  children: React.ReactNode;
}

const NewsList = ({ children }: NewsListProps) => {
  return <div className={styles.list}>{children}</div>;
};

export default NewsList;

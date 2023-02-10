import { useState } from "react";
import styles from "./textToggleMore.module.scss";

interface TextToggleMoreProps {
  children: string;
  countLetter?: number;
}

const TextToggleMore = ({ children, countLetter = 150 }: TextToggleMoreProps) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const toggleReadMore = () => {
    setIsShowMore(!isShowMore);
  };
  return (
    <>
      <span>{isShowMore ? children : `${children.substring(0, countLetter)}...`}</span>
      {children.length > countLetter && (
        <button type="button" className={styles.toggle} onClick={toggleReadMore}>
          {isShowMore ? "Show Less" : "Show More"}
        </button>
      )}
    </>
  );
};

export default TextToggleMore;

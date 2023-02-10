import Link from "next/link";
import classNames from "utils/classNames";
import styles from "./movieTitle.module.scss";
import { AnchorHTMLAttributes } from "react";

interface MovieTitleProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const MovieTitle = ({ href, children, className, ...props }: MovieTitleProps) => {
  if (href) {
    return (
      <Link href={href}>
        <a className={classNames(styles.movieTitle, className)} {...props}>
          {children}
        </a>
      </Link>
    );
  }
  return (
    <span className={classNames(styles.movieTitle, className)} {...props}>
      {children}
    </span>
  );
};

export default MovieTitle;

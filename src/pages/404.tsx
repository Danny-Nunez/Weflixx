import Meta from "components/Meta";
import WrapLink from "components/WrapLink";
import { PATH } from "constants/path";
import styles from "styles/page404.module.scss";
import classNames from "utils/classNames";

const PageNotFound = () => {
  return (
    <div className={styles.page}>
      <Meta title="Page Not Found - NetFilm" />
      <h1 className={classNames("text-gradient", styles.heading)}>404</h1>
      <h2 className={styles.title}>Something is not right</h2>
      <p className={styles.description}>We can not find the page you are looking for.</p>
      <WrapLink href={PATH.home} className="button-gradient-purple">
        Return Home
      </WrapLink>
    </div>
  );
};

export default PageNotFound;

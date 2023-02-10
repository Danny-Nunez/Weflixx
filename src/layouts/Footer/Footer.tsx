import { IconGithub } from "components/Icons";
import { PATH } from "constants/path";
import classNames from "utils/classNames";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className={classNames(styles.footer, "container")}>
        <span>Nguyen Hoang Lam &copy; 2022</span>
        <div className={styles.footerContact}>
          <span>Source code: </span>
          <a target="_blank" rel="noopener noreferrer" href={PATH.projectGithub}>
            <IconGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

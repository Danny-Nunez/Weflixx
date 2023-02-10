import { IconGithub } from "components/Icons";
import { PATH } from "constants/path";
import classNames from "utils/classNames";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className={classNames(styles.footer, "container")}>
        
        <div className={styles.footerContact}>
        <span>WeFlixx &copy; 2023</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

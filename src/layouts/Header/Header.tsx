import WrapLink from "components/WrapLink";
import { IconClose, IconMenu, IconSearch } from "components/Icons";
import { defaultAvatar } from "constants/global";
import { PATH } from "constants/path";
import SearchBox from "modules/SearchBox";
import { useRef } from "react";
import { useAppSelector } from "store/global-store";
import classNames from "utils/classNames";
import styles from "./header.module.scss";

const links = [
  {
    path: PATH.news,
    display: "News"
  },
  {
    path: PATH.history,
    display: "History"
  },
  {
    path: PATH.discovery,
    display: "Discovery"
  },
  {
    path: PATH.explore,
    display: "Explore"
  }
];

const Header = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const menuRef = useRef<HTMLUListElement>(null);
  const toggleMenu = () => {
    if (menuRef.current) menuRef.current.classList.toggle("menu-hidden");
  };
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.navbar}>
          <div className={styles.left}>
            <WrapLink className={styles.logo}>Netfilm</WrapLink>
            <ul className={classNames(styles.menu, "menu-hidden")} ref={menuRef}>
              {links.map((link) => (
                <li key={link.path}>
                  <WrapLink className={styles.link} href={link.path}>
                    {link.display}
                  </WrapLink>
                </li>
              ))}
              <button className={styles.buttonCloseMenu} onClick={toggleMenu}>
                <IconClose />
              </button>
            </ul>
          </div>
          <div className={styles.right}>
            <SearchBox className={styles.searchBox} />
            <div className={styles.mobileAction}>
              <WrapLink href={PATH.search}>
                <IconSearch fill="#fff" />
              </WrapLink>
              <button className={styles.buttonOpenMenu} onClick={toggleMenu}>
                <IconMenu fill="#fff" />
              </button>
            </div>
            {currentUser ? (
              <WrapLink href={PATH.profile} className={styles.avatar}>
                <picture>
                  <img
                    src={currentUser?.photoURL || defaultAvatar}
                    alt={currentUser?.displayName}
                  />
                </picture>
              </WrapLink>
            ) : (
              <WrapLink href={PATH.signIn} className={styles.signIn}>
                Sign In
              </WrapLink>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

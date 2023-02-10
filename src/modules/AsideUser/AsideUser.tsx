import WrapLink from "components/WrapLink";
import { IconFollow, IconKeyPassword, IconLogout, IconUser } from "components/Icons";
import { Image } from "components/Image";
import { defaultAvatar } from "constants/global";
import { PATH } from "constants/path";
import { logout } from "store/auth.slice";
import { useAppDispatch, useAppSelector } from "store/global-store";
import styles from "./asideUser.module.scss";

const links = [
  {
    path: PATH.profile,
    icon: <IconUser />,
    display: "Profile"
  },
  {
    path: PATH.changePassword,
    icon: <IconKeyPassword />,
    display: "Password"
  },
  {
    path: PATH.follow,
    icon: <IconFollow />,
    display: "Follow"
  }
];

const AsideUser = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={styles.aside}>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <Image src={currentUser?.photoURL || defaultAvatar} alt="avatar" />
        </div>
        <div>
          <h3 className={styles.username}>{currentUser?.displayName}</h3>
          <span className={styles.email}>User</span>
        </div>
      </div>
      <div className={styles.links}>
        {links.map((link, index) => (
          <WrapLink href={link.path} className={styles.link} key={index}>
            {link.icon}
            <span>{link.display}</span>
          </WrapLink>
        ))}
        <button onClick={handleLogout} className={styles.logout}>
          <IconLogout />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AsideUser;

import { CheckAdmin } from "components/Authentication";
import WrapLink from "components/WrapLink";
import { PATH } from "constants/path";
import { HTMLAttributes } from "react";
import styles from "./layoutDashboard.module.scss";

interface LayoutDashboardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  desc: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}

const links = [
  {
    path: PATH.home,
    display: "Home"
  },
  {
    path: PATH.userManage,
    display: "User"
  }
];

const LayoutDashboard = ({ title, desc, subtitle, children }: LayoutDashboardProps) => {
  return (
    <CheckAdmin>
      <div className={styles.layout}>
        <main>
          <div className={styles.content}>
            <aside className={styles.sidebar}>
              <ul>
                {links.map((link) => (
                  <li key={link.path}>
                    <WrapLink className={styles.link} href={link.path}>
                      {link.display}
                    </WrapLink>
                  </li>
                ))}
              </ul>
            </aside>
            <div className={styles.main}>
              <div className={styles.mainHeader}>
                <div className={styles.mainInfo}>
                  <h2>{title}</h2>
                  <span>{desc}</span>
                </div>
                {subtitle && subtitle}
              </div>
              <div>{children}</div>
            </div>
          </div>
        </main>
      </div>
    </CheckAdmin>
  );
};

export default LayoutDashboard;

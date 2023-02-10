import classNames from "utils/classNames";
import { useDropdown } from "./dropdown-context";
import styles from "./dropdown.module.scss";

interface ListProps {
  children: React.ReactNode;
}

const List = ({ children }: ListProps) => {
  const { show } = useDropdown();
  return (
    <>{show && <div className={classNames(styles.dropdownList, "scrollbar")}>{children}</div>}</>
  );
};

export default List;

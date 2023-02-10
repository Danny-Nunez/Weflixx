import { DropdownProvider } from "./dropdown-context";
import Option from "./Option";
import Select from "./Select";
import List from "./List";
import styles from "./dropdown.module.scss";

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  placeholder?: string;
}

const Dropdown = ({ children, placeholder, className, ...props }: DropdownProps) => {
  return (
    <DropdownProvider placeholder={placeholder} {...props}>
      <div className={styles.dropdown}>{children}</div>
    </DropdownProvider>
  );
};

Dropdown.Option = Option;
Dropdown.Select = Select;
Dropdown.List = List;

export default Dropdown;

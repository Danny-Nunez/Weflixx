import { Dispatch, SetStateAction } from "react";
import { useDropdown } from "./dropdown-context";
import styles from "./dropdown.module.scss";

interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  handleClickOption?: (
    e: React.MouseEvent<HTMLOptionElement, MouseEvent>,
    setTitle: Dispatch<SetStateAction<string>>
  ) => void;
}

const Option = ({ handleClickOption, children }: OptionProps) => {
  const { setShow, setTitle } = useDropdown();
  const handleClick = (e: React.MouseEvent<HTMLOptionElement, MouseEvent>) => {
    if (handleClickOption) handleClickOption(e, setTitle);
    setShow(false);
  };
  return (
    <option onClick={handleClick} className={styles.dropdownOption}>
      {children}
    </option>
  );
};

export default Option;

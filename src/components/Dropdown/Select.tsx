import React from "react";
import { useDropdown } from "./dropdown-context";
import styles from "./dropdown.module.scss";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = ({}: SelectProps) => {
  const { toggle, show, title } = useDropdown();
  return (
    <div aria-hidden className={styles.dropdownSelect} onClick={toggle}>
      <span>{title}</span>
      {show ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </div>
  );
};

export default Select;

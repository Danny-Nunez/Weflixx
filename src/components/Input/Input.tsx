import { InputHTMLAttributes } from "react";
import classNames from "utils/classNames";
import styles from "./input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ name, className, ...props }: InputProps) => {
  return <input id={name} name={name} className={classNames(styles.input, className)} {...props} />;
};

export default Input;

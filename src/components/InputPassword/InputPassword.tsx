import { useState, InputHTMLAttributes } from "react";
import classNames from "utils/classNames";
import { IconHiddenPassword, IconShowPassword } from "components/Icons";
import styles from "./inputPassword.module.scss";

interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = ({ name, className, ...props }: InputPasswordProps) => {
  const [focus, setFocus] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const toggleVisiblePassword = () => {
    setVisiblePassword((prevState) => !prevState);
  };
  return (
    <div className={classNames(styles.inputWrapper, focus ? styles.focus : "")}>
      <input
        id={name}
        name={name}
        type={visiblePassword ? "text" : "password"}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
      />
      <button type="button" onClick={toggleVisiblePassword} className={styles.icon}>
        {visiblePassword ? <IconShowPassword /> : <IconHiddenPassword />}
      </button>
    </div>
  );
};

export default InputPassword;

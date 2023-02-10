import { TextareaHTMLAttributes, useEffect, useRef } from "react";
import classNames from "utils/classNames";
import styles from "./textarea.module.scss";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = ({ value, className, ...props }: TextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const resizeTextArea = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };
  useEffect(resizeTextArea, [value]);
  return (
    <textarea
      value={value}
      ref={textAreaRef}
      className={classNames(styles.textarea, className)}
      {...props}
    />
  );
};

export default TextArea;

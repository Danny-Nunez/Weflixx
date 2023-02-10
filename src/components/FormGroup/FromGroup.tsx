import styles from "./formGroup.module.scss";

interface FormGroupProps {
  children: React.ReactNode;
}

const FormGroup = ({ children }: FormGroupProps) => {
  return <div className={styles.formGroup}>{children}</div>;
};

export default FormGroup;

import styles from "./table.module.scss";

interface TableProps {
  children: React.ReactNode;
}

const Table = ({ children }: TableProps) => {
  return <div className={styles.table}>{children}</div>;
};

export default Table;

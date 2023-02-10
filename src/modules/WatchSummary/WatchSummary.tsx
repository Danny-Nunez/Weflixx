import TextToggleMore from "components/TextToggleMore";
import styles from "./watchSummary.module.scss";

interface WatchSummaryProps {
  introduction: string;
}

const WatchSummary = ({ introduction }: WatchSummaryProps) => {
  return (
    <div className={styles.summary}>
      <h4 className={styles.label}>Summary :</h4>
      <TextToggleMore countLetter={180}>{introduction}</TextToggleMore>
    </div>
  );
};

export default WatchSummary;

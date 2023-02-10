import classNames from "utils/classNames";
import styles from "./emojiReactions.module.scss";

interface EmojiReactionsProps {
  emoji: string;
  handleChangeEmoji: (value: string) => void;
}

const EmojiReactions = ({ emoji, handleChangeEmoji }: EmojiReactionsProps) => {
  return (
    <div className={styles.reaction}>
      <span className={styles[`text${emoji}`]}>{emoji}</span>
      <div className={styles.emojiContainer}>
        <div
          onClick={() => handleChangeEmoji("Like")}
          className={classNames(styles.emoji, styles.like)}
        >
          <div className={styles.icon} data-title="Like"></div>
        </div>
        <div
          onClick={() => handleChangeEmoji("Love")}
          className={classNames(styles.emoji, styles.love)}
        >
          <div className={styles.icon} data-title="Love"></div>
        </div>
        <div
          onClick={() => handleChangeEmoji("Haha")}
          className={classNames(styles.emoji, styles.haha)}
        >
          <div className={styles.icon} data-title="Haha"></div>
        </div>
        <div
          onClick={() => handleChangeEmoji("Wow")}
          className={classNames(styles.emoji, styles.wow)}
        >
          <div className={styles.icon} data-title="Wow"></div>
        </div>
        <div
          onClick={() => handleChangeEmoji("Sad")}
          className={classNames(styles.emoji, styles.sad)}
        >
          <div className={styles.icon} data-title="Sad"></div>
        </div>
        <div
          onClick={() => handleChangeEmoji("Angry")}
          className={classNames(styles.emoji, styles.angry)}
        >
          <div className={styles.icon} data-title="Angry"></div>
        </div>
      </div>
    </div>
  );
};

export default EmojiReactions;

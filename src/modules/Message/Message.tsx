import { Image } from "components/Image";
import { defaultAvatar } from "constants/global";
import classNames from "utils/classNames";
import styles from "./message.module.scss";

interface MessageProps {
  isMe: boolean;
  username: string;
  content: string;
  avatar: string;
}

const Message = ({ isMe, username, content, avatar }: MessageProps) => {
  if (isMe) return <div className={classNames(styles.message, styles.me)}>{content}</div>;
  return (
    <div className={styles.user}>
      <div className={styles.avatar}>
        <Image src={avatar || defaultAvatar} alt="" width={40} height={40} />
      </div>
      <div className={styles.userInfo}>
        <span className={styles.username}>{username}</span>
        <span className={styles.message}>{content}</span>
      </div>
    </div>
  );
};

export default Message;

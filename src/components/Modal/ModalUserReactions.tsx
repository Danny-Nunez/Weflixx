import { ICommentReaction } from "types";
import { IconClose } from "components/Icons";
import { Image } from "components/Image";
import Modal from "react-modal";
import styles from "./modal.module.scss";

interface ModalUserReactionsProps {
  isShow: boolean;
  toggleModal: () => void;
  reactions: ICommentReaction[];
}

const ModalUserReactions = ({ isShow, toggleModal, reactions }: ModalUserReactionsProps) => {
  return (
    <Modal
      isOpen={isShow}
      onRequestClose={toggleModal}
      contentLabel="Bảng cấp độ"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="p-5">
        <div className={styles.header}>
          <h4>People is reaction to this info</h4>
          <button className={styles.close} onClick={toggleModal}>
            <IconClose className="!w-5 !h-5" />
          </button>
        </div>
        <div>
          {reactions.map((reaction) => (
            <div className={styles.row} key={reaction.id}>
              <Image
                width={44}
                height={44}
                alt={reaction.fullname}
                className={styles.avatar}
                src={reaction.avatar}
              />
              <span className={styles.username}>{reaction.fullname}</span>
              <Image
                width={24}
                height={24}
                alt={reaction.reaction}
                className={styles.emoji}
                src={`/icon-${reaction.reaction}.png`}
              />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalUserReactions;

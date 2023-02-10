import { IComment } from "types";
import { Image } from "components/Image";
import { ModalUserReactions } from "components/Modal";
import { defaultAvatar } from "constants/global";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import useModal from "hooks/useModal";
import { db } from "libs/firebase-app";
import CommentEdit from "modules/CommentEdit";
import EmojiReactions from "modules/EmojiReactions";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "store/global-store";
import Swal from "sweetalert2";
import { checkTimeAgo } from "utils/helper";
import { v4 as uuidv4 } from "uuid";
import styles from "./commentItem.module.scss";

interface CommentItemProps {
  comment: IComment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { isShow, toggleModal } = useModal();
  const { currentUser } = useAppSelector((state) => state.auth);
  const foundMyReactionIndex = comment.reactions.findIndex(
    (item) => item.userId === currentUser?.uid
  );
  const reactionTypes: string[] = [];
  const myReaction = comment.reactions[foundMyReactionIndex];
  const [emoji, setEmoji] = useState(myReaction?.reaction || "Like");
  const handleChangeEmoji = async (value: string) => {
    const colRef = doc(db, "comments", comment.id);
    if (!currentUser) return;
    if (!myReaction) {
      comment.reactions.push({
        id: uuidv4(),
        userId: currentUser.uid,
        avatar: currentUser.photoURL || defaultAvatar,
        fullname: currentUser.displayName,
        reaction: value
      });
      await updateDoc(colRef, { reactions: comment.reactions });
      setEmoji(value);
      return;
    }
    comment.reactions[foundMyReactionIndex].reaction = value;
    await updateDoc(colRef, { reactions: comment.reactions });
    setEmoji(value);
  };
  const toggleOpenEdit = () => {
    if (!currentUser || currentUser.uid !== comment.userId) return;
    setIsEditing(!isEditing);
  };
  const handleDeleteComment = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const colRef = doc(db, "comments", comment.id);
          await deleteDoc(colRef);
          toast.success("Delete comment successfully!");
        } catch (error: any) {
          toast.error(error?.message);
        }
      }
    });
  };
  return (
    <div className={styles.comment}>
      <div className={styles.avatar}>
        <Image width={44} height={44} src={comment.avatar} alt={comment.fullname} />
      </div>
      <div>
        <div className={styles.content}>
          {isEditing && <CommentEdit comment={comment} toggleOpenEdit={toggleOpenEdit} />}
          {!isEditing && (
            <>
              <span className={styles.username}>{comment.fullname || "Unknown"}</span>
              <p className={styles.description}>{comment.content}</p>
            </>
          )}
          {comment.reactions.length > 0 && (
            <div className={styles.reactions} onClick={toggleModal}>
              {comment.reactions.slice(0, 3).map((item) => {
                const foundTypeIndex = reactionTypes.findIndex((type) => type === item.reaction);
                if (foundTypeIndex !== -1) return null;
                reactionTypes.push(item.reaction);
                return (
                  <Image
                    key={item.id}
                    alt={item.reaction}
                    className={styles.reaction}
                    src={`/icon-${item.reaction}.png`}
                  />
                );
              })}
              <span>{comment.reactions.length}</span>
            </div>
          )}
        </div>
        <div className={styles.actions}>
          <EmojiReactions emoji={emoji} handleChangeEmoji={handleChangeEmoji} />
          {currentUser?.uid === comment.userId && (
            <>
              <button className={styles.edit} onClick={toggleOpenEdit}>
                Edit
              </button>
              <button className={styles.delete} onClick={handleDeleteComment}>
                Delete
              </button>
            </>
          )}
          <span>{checkTimeAgo((comment?.createdAt?.seconds as number) * 1000)}</span>
        </div>
      </div>
      <ModalUserReactions isShow={isShow} toggleModal={toggleModal} reactions={comment.reactions} />
    </div>
  );
};

export default CommentItem;

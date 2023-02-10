import { IComment } from "types";
import TextArea from "components/TextAreaBox";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "libs/firebase-app";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "store/global-store";
import classNames from "utils/classNames";
import styles from "./commentEdit.module.scss";

interface CommentEditProps {
  comment: IComment;
  toggleOpenEdit: () => void;
}

const CommentEdit = ({ comment, toggleOpenEdit }: CommentEditProps) => {
  const [value, setValue] = useState(comment.content);
  const { currentUser } = useAppSelector((state) => state.auth);
  const handleUpdateComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return;
    if (currentUser.uid !== comment.userId) {
      toast.error("You have no right to do this action!");
      return;
    }
    try {
      const colRef = doc(db, "comments", comment.id);
      await updateDoc(colRef, { content: value.trim() });
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      toggleOpenEdit();
    }
  };
  return (
    <form onSubmit={handleUpdateComment}>
      <TextArea
        value={value}
        className={styles.textarea}
        onKeyDown={(e) => e.stopPropagation()}
        onKeyUp={(e) => e.stopPropagation()}
        onKeyPress={(e) => e.stopPropagation()}
        onChange={(e) => setValue(e.target.value)}
        rows={1}
      />
      <div className={styles.actions}>
        <button
          type="button"
          onClick={toggleOpenEdit}
          className={classNames(styles.action, styles.cancel)}
        >
          Cancel
        </button>
        <button type="submit" className={classNames(styles.action, styles.submit)}>
          Update
        </button>
      </div>
    </form>
  );
};

export default CommentEdit;

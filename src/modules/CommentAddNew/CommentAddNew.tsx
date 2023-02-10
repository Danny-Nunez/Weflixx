import { Image } from "components/Image";
import TextArea from "components/TextAreaBox";
import { defaultAvatar } from "constants/global";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "libs/firebase-app";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "store/global-store";
import styles from "./commentAddNew.module.scss";

const CommentAddNew = () => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [commentValue, setCommentValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const resizeTextArea = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };
  const handleAddNewComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please sign in!");
      return;
    }
    if (!commentValue) {
      toast.error("Please input comment!");
      return;
    }
    try {
      const colRef = collection(db, "comments");
      await addDoc(colRef, {
        userId: currentUser.uid,
        avatar: currentUser.photoURL || defaultAvatar,
        fullname: currentUser.displayName,
        content: commentValue.trim(),
        createdAt: serverTimestamp(),
        categoryId: router.query.category,
        movieId: router.query.id,
        episodeId: router.query.episode || 0,
        reactions: []
      });
      toast.success("Add new comment successfully!");
    } catch (error: any) {
      console.log("error: ", error);
      toast.error(error?.message);
    } finally {
      setCommentValue("");
    }
  };
  useEffect(resizeTextArea, [commentValue]);
  return (
    <form onSubmit={handleAddNewComment} className={styles.form}>
      <div className={styles.addNew}>
        <Image
          className={styles.avatar}
          src={currentUser?.photoURL || defaultAvatar}
          alt={currentUser?.displayName}
        />
        <TextArea
          rows={1}
          value={commentValue}
          placeholder="Write comment..."
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
          onChange={(e) => setCommentValue(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.submit}>
        Post
      </button>
    </form>
  );
};

export default CommentAddNew;

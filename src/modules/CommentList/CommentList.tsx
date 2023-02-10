import { IComment } from "types";
import { Unsubscribe } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "libs/firebase-app";
import CommentAddNew from "modules/CommentAddNew";
import CommentItem from "modules/CommentItem";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./commentList.module.scss";

const CommentList = () => {
  const router = useRouter();
  const { id, category, episode } = router.query;
  const [comments, setComments] = useState<IComment[]>([]);
  useEffect(() => {
    let unSubscribe: Unsubscribe;
    async function getComments() {
      try {
        if (!id) return;
        const colRef = collection(db, "comments");
        const queryRef = query(colRef, where("movieId", "==", id));
        unSubscribe = onSnapshot(queryRef, (snapshot) => {
          const results: IComment[] = [];
          snapshot.forEach((doc: any) => {
            results.push({
              id: doc.id,
              ...doc.data()
            });
          });
          setComments(results);
        });
        return unSubscribe;
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
    getComments();
    return () => {
      unSubscribe();
    };
  }, [id, category, episode]);
  return (
    <div className={styles.section}>
      <h4>Comments</h4>
      <CommentAddNew />
      <div className={styles.comments}>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;

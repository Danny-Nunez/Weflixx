import { IMovieCard } from "types";
import { IconBell, IconShare } from "components/Icons";
import { server } from "configs/server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "libs/firebase-app";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { setFollows } from "store/follow.slice";
import { useAppDispatch, useAppSelector } from "store/global-store";
import classNames from "utils/classNames";
import { copyToClipBoard } from "utils/copyToClipboard";
import styles from "./watchActions.module.scss";

const WatchActions = ({ id, domainType, title, poster }: IMovieCard) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { follows } = useAppSelector((state) => state.follow);
  const foundMovieIndex = follows.findIndex((movie) => movie.id === id);
  const handleShare = () => {
    copyToClipBoard(`${server}${router.asPath}`);
  };
  const handleClickFollowMovie = async () => {
    if (!currentUser) return;
    const colRef = doc(db, "users", currentUser.uid);
    if (foundMovieIndex !== -1) {
      const newFollows = follows.filter((movie) => movie.id !== id);
      await updateDoc(colRef, { follows: newFollows });
      dispatch(setFollows(newFollows));
      toast.success("This movie is removed from your follows");
      return;
    }
    const newFollows = [{ id, domainType, title, poster }, ...follows];
    await updateDoc(colRef, { follows: newFollows });
    dispatch(setFollows(newFollows));
    toast.success("This movie is now followed");
  };
  return (
    <div className={styles.actions}>
      <button
        onClick={handleClickFollowMovie}
        className={classNames(styles.action)}
        style={{ backgroundColor: foundMovieIndex === -1 ? "#0e6f6a" : "#e5525e" }}
      >
        <IconBell />
        <span>{foundMovieIndex === -1 ? "Follow" : "Unfollow"}</span>
      </button>
      <button className={classNames(styles.share, styles.action)} onClick={handleShare}>
        <IconShare fill="#fff" height={20} width={20} />
        <span>Share</span>
      </button>
    </div>
  );
};

export default WatchActions;

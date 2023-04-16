import { Image } from "components/Image";
import WrapLink from "components/WrapLink";
import { resizeImageLoklok } from "constants/global";
import { PATH } from "constants/path";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import LayoutPrimary from "layouts/LayoutPrimary";
import { db } from "libs/firebase-app";
import MovieTitle from "modules/MovieTitle";
import { useEffect, useState } from "react";
import styles from "styles/history.module.scss";
import { IRoomInfo } from "types";

const RoomTogetherPage = () => {
  const [rooms, setRooms] = useState<IRoomInfo[]>([]);
  useEffect(() => {
    const colRef = collection(db, "rooms");
    const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
      const roomsData: IRoomInfo[] = [];
      querySnapshot.forEach(async (document) => {
        const TIME_AUTO_DELETE = 60 * 60 * 5 * 1000; // 5 hours
        if (document.data().createdAt + TIME_AUTO_DELETE < Date.now()) {
          await deleteDoc(doc(db, "rooms", document.id));
        } else {
          const room = { ...document.data(), id: document.id };
          roomsData.push(room as IRoomInfo);
        }
      });
      setRooms(roomsData);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <LayoutPrimary>
      <div className="container">
        <WrapLink href={PATH.togetherCreate}>
          <button className="together-submit">Add New Room</button>
        </WrapLink>
        {rooms.length > 0 && (
          <div className="history-list" style={{ marginTop: "20px" }}>
            {rooms.map((room) => {
              return (
                <div className={styles.movieCard} key={room.title}>
                  <WrapLink href={`together/${room.id}`} className={styles.movieCardMedia}>
                    <Image
                      alt={room.title}
                      width={312}
                      height={175}
                      src={resizeImageLoklok(room.thumbnail, 312, 175)}
                      className={styles.movieCardPoster}
                    />
                    <picture>
                      <img src="/icon-play.png" alt="play" className={styles.movieCardPlay} />
                    </picture>
                  </WrapLink>
                  <MovieTitle href={`together/${room.id}`} className={styles.movieCardTitle}>
                    {room.title}
                  </MovieTitle>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </LayoutPrimary>
  );
};

export default RoomTogetherPage;

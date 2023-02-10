import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "libs/firebase-app";
import React, { useEffect } from "react";
import { setCurrentUser } from "store/auth.slice";
import { setFollows } from "store/follow.slice";
import { useAppDispatch } from "store/global-store";

interface AuthenticationProps {
  children: React.ReactNode;
}

const Authentication = ({ children }: AuthenticationProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch(setCurrentUser(null));
        return;
      }
      const docRef = query(collection(db, "users"), where("email", "==", user.email));
      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach(async (document) => {
          const userData = document.data();
          dispatch(
            setCurrentUser({
              uid: userData.uid,
              email: userData.email,
              photoURL: userData.photoURL,
              displayName: userData.displayName,
              role: userData.role,
              status: userData.status,
              emailVerified: user.emailVerified
            })
          );
          dispatch(setFollows(userData.follows));
        });
      });
    });
    return () => unsubscribe();
  }, [dispatch]);
  return <>{children}</>;
};

export default Authentication;

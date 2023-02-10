import ImageUpload from "components/ImageUpload";
import { defaultAvatar } from "constants/global";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { db } from "libs/firebase-app";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "store/global-store";

const UploadAvatar = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(currentUser?.photoURL || "");
  const deleteAvatar = async () => {
    if (!currentUser) return;
    const colRef = doc(db, "users", currentUser.uid);
    await updateDoc(colRef, {
      photoURL: ""
    });
    setAvatar("");
  };
  const handleUploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!files || !files[0].name || !currentUser) return;
      const storage = getStorage();
      const storageRef = ref(storage, "images/" + files[0].name);
      await uploadBytesResumable(storageRef, files[0]);
      const newAvatar = await getDownloadURL(storageRef);
      const colRef = doc(db, "users", currentUser.uid);
      await updateDoc(colRef, { photoURL: newAvatar });
      toast.success("Update avatar successfully!");
      setAvatar(newAvatar);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  return (
    <ImageUpload
      name="photoURL"
      image={avatar}
      handleDeleteImage={deleteAvatar}
      handleUploadImage={handleUploadAvatar}
    />
  );
};

export default UploadAvatar;

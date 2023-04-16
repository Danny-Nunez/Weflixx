import { ProtectedRoute } from "components/Authentication";
import FormGroup from "components/FormGroup";
import Input from "components/Input";
import Label from "components/Label";
import Meta from "components/Meta";
import { doc, updateDoc } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import LayoutPrimary from "layouts/LayoutPrimary";
import { db } from "libs/firebase-app";
import AsideUser from "modules/AsideUser";
import UploadAvatar from "modules/UploadAvatar";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "store/global-store";
import styles from "styles/profile.module.scss";

const ProfilePage = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [values, setValues] = useState({
    displayName: currentUser?.displayName || ""
  });
  const { onChange } = useInputChange(values, setValues);
  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!currentUser || !currentUser.uid) return;
      const colRef = doc(db, "users", currentUser.uid);
      await updateDoc(colRef, values);
      toast.success("Update profile successfully!");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  return (
    <ProtectedRoute>
      <Meta title="Profile - NetFilm" />
      <LayoutPrimary>
        <div className="container">
          <section className={styles.section}>
            <AsideUser />
            <div>
              <h1>Account information</h1>
              <span className={styles.desc}>Update your account information</span>
              <div className={styles.layout}>
                <form className={styles.form} onSubmit={handleUpdateProfile}>
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      disabled
                      placeholder="Input email"
                      defaultValue={currentUser?.email}
                      onChange={onChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="displayName">Fullname</Label>
                    <Input
                      type="text"
                      name="displayName"
                      value={values.displayName}
                      placeholder="Fullname"
                      onChange={onChange}
                    />
                  </FormGroup>
                  <button type="submit" className={styles.submit}>
                    Update
                  </button>
                </form>
                <div className={styles.uploadAvatar}>
                  <UploadAvatar />
                </div>
              </div>
            </div>
          </section>
        </div>
      </LayoutPrimary>
    </ProtectedRoute>
  );
};

export default ProfilePage;

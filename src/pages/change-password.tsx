import { ProtectedRoute } from "components/Authentication";
import FormGroup from "components/FormGroup";
import InputPassword from "components/InputPassword";
import Label from "components/Label";
import Meta from "components/Meta";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import useInputChange from "hooks/useInputChange";
import LayoutPrimary from "layouts/LayoutPrimary";
import { auth } from "libs/firebase-app";
import AsideUser from "modules/AsideUser";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import styles from "styles/profile.module.scss";

const ChangePasswordPage = () => {
  const [values, setValues] = useState({
    password: "",
    newPassword: "",
    confirmPassword: ""
  });
  const { onChange } = useInputChange(values, setValues);
  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAllInputFilled = Object.values(values).every((value) => value !== "");
    if (!isAllInputFilled) {
      toast.error("Please fill all inputs!");
      return;
    }
    if (values.newPassword !== values.confirmPassword) {
      toast.error("Password not same!");
      return;
    }
    try {
      if (!auth?.currentUser) return;
      const credential = EmailAuthProvider.credential(
        auth?.currentUser.email as string,
        values.password
      );
      await reauthenticateWithCredential(auth?.currentUser, credential);
      await updatePassword(auth?.currentUser, values.newPassword);
      toast.success("Change password successfully!");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <ProtectedRoute>
      <Meta title="Password - NetFilm" />
      <LayoutPrimary>
        <div className="container">
          <section className={styles.section}>
            <AsideUser />
            <div>
              <h1>Change password</h1>
              <span className={styles.desc}>Update your password</span>
              <form autoComplete="off" className={styles.form} onSubmit={handleChangePassword}>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <InputPassword
                    name="password"
                    placeholder="Input password"
                    onChange={onChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="newPassword">New password</Label>
                  <InputPassword
                    name="newPassword"
                    placeholder="Input new password"
                    onChange={onChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="confirmPassword">Confirm new password</Label>
                  <InputPassword
                    name="confirmPassword"
                    placeholder="Input confirm new password"
                    onChange={onChange}
                    required
                  />
                </FormGroup>
                <button type="submit" className={styles.submit}>
                  Change password
                </button>
              </form>
            </div>
          </section>
        </div>
      </LayoutPrimary>
    </ProtectedRoute>
  );
};

export default ChangePasswordPage;

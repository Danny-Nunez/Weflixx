import { CheckLoggedIn } from "components/Authentication";
import WrapLink from "components/WrapLink";
import FormGroup from "components/FormGroup";
import Input from "components/Input";
import Label from "components/Label";
import Meta from "components/Meta";
import { PATH } from "constants/path";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "libs/firebase-app";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import styles from "styles/auth.module.scss";
import classNames from "utils/classNames";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please input email!");
      return;
    }
    try {
      e.preventDefault();
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset link has been sent, please check your email!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <CheckLoggedIn>
      <Meta title="Sign In - NetFilm" />
      <div className={styles.section}>
        <div className={styles.container}>
          <form onSubmit={handleResetPassword}>
            <h1 className={styles.heading}>Reset password</h1>
            <div className={styles.main}>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <button type="submit" className={classNames(styles.button, styles.buttonLarge)}>
                Sign In
              </button>
            </div>
            <div className={styles.alreadyAccount}>
              Do not have an account? <WrapLink href={PATH.signUp}>Sign Up Here</WrapLink>
            </div>
          </form>
        </div>
      </div>
    </CheckLoggedIn>
  );
};

export default ResetPasswordPage;

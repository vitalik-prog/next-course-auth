import { useState, useRef, useContext } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import NotificationContext from "../../context/layout/NotificationContext";
import { createUser, signInUser } from "../../helpers/auth";
import HttpError from "../../common/types/HttpError";
import classes from "./css/AuthForm.module.css";

const AuthForm = () => {
  const { showNotification } = useContext(NotificationContext);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const switchAuthModeHandler = () => setIsLogin((prevState) => !prevState);

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value || "";
    const enteredPassword = passwordInputRef.current?.value || "";

    if (isLogin) {
      showNotification({
        title: "Signing in...",
        message: "Sending login request.",
        status: "pending",
      });
      await signInUser(enteredEmail, enteredPassword, showNotification, router);
    } else {
      try {
        showNotification({
          title: "Signing up...",
          message: "Registering new user.",
          status: "pending",
        });
        const result = await createUser(enteredEmail, enteredPassword);
        showNotification({
          title: "Success!",
          message: "User created successfully.",
          status: "success",
        });

        if (result && result.email) {
          await signInUser(
            enteredEmail,
            enteredPassword,
            showNotification,
            router
          );
        }
      } catch (error: unknown) {
        const err = error as HttpError;
        showNotification({
          title: "Error!",
          message: err.message || "Something went wrong!",
          status: "error",
        });
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing credentials"}
          </button>
        </div>
      </form>
      {isLogin && (
        <div className={classes.social}>
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payments`,
              })
            }
          >
            <FcGoogle fontSize={30} />
            &nbsp;
            <span>Sign in with Google</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default AuthForm;

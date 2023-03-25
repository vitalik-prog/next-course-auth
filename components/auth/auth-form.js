import { useState, useRef, useContext } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import NotificationContext from "../../store/notificationContext";
import classes from "./auth-form.module.css";

const createUser = async (email, password) => {
  const newUser = { email, password };
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
};

const AuthForm = () => {
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => setIsLogin((prevState) => !prevState);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      notificationCtx.showNotification({
        title: "Signing in...",
        message: "Sending login request.",
        status: "pending",
      });
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      if (!result.error) {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Logged in successfully.",
          status: "success",
        });
        router.replace("/");
      }
      if (result.error) {
        notificationCtx.showNotification({
          title: "Error!",
          message: result.error || "Something went wrong!",
          status: "error",
        });
      }
    } else {
      try {
        notificationCtx.showNotification({
          title: "Signing up...",
          message: "Registering new user.",
          status: "pending",
        });
        await createUser(enteredEmail, enteredPassword);
        notificationCtx.showNotification({
          title: "Success!",
          message: "User created successfully.",
          status: "success",
        });
      } catch (error) {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
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
          <button onClick={() => signIn("google")}>
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

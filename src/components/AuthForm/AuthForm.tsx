import { useState, useRef } from "react";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io";
import { BsTwitter } from "react-icons/bs";
import IAuthFormProps from "./interfaces/IAuthFormProps";
import classes from "./css/AuthForm.module.css";

const AuthForm: React.FC<IAuthFormProps> = ({
  onAuth,
  signInWithSocialNetworks,
  signInWithTwitter,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const switchAuthModeHandler = () => setIsLogin((prevState) => !prevState);

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    
    onAuth(
      isLogin,
      emailInputRef.current?.value,
      passwordInputRef.current?.value
    );
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={passwordInputRef} />
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
        <div className={classes.socialNetworks}>
          <button onClick={signInWithSocialNetworks.bind(null, new GoogleAuthProvider())}>
            <FcGoogle fontSize={30} />
            &nbsp;
            <span>Sign in with Google</span>
          </button>
          <button onClick={signInWithSocialNetworks.bind(null, new FacebookAuthProvider())}>
            <IoLogoFacebook fontSize={30} color="darkblue" />
            &nbsp;
            <span>Sign in with Facebook</span>
          </button>
          <button onClick={signInWithTwitter}>
            <BsTwitter fontSize={30} color="blue" />
            &nbsp;
            <span>Sign in with Twitter</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default AuthForm;

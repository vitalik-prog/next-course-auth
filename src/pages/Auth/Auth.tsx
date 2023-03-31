import { useContext, useCallback } from "react";
import { useRouter } from "next/router";
import { signInWithPopup } from "firebase/auth";
import NotificationContext from "../../context/Notification/NotificationContext";
import HttpError from "../../common/types/HttpError";
import { useAuth } from "../../context/Auth/AuthContext";
import { auth } from "../../helpers/firebaseDb";
import AuthForm from "../../components/AuthForm/AuthForm";
import validateCredentials from '../../helpers/validation';

const Auth = () => {
  const { showNotification } = useContext(NotificationContext);
  const { signUp, logIn } = useAuth();
  const router = useRouter();

  const onAuth = useCallback(
    async (isLogin: boolean, email: string = "", password: string = "") => {

      const { isValid } = validateCredentials(email, password);

      if (!isValid) {
        showNotification({
          title: "Error!",
          message: "Please enter valid credentials!",
          status: "error",
        });
        return;
      }

      if (isLogin) {
        showNotification({
          title: "Signing in...",
          message: "Sending login request.",
          status: "pending",
        });

        try {
          await logIn(email, password);
          showNotification({
            title: "Success!",
            message: "User logged in successfully!",
            status: "success",
          });
          router.push("/purchases");
        } catch (error: unknown) {
          const err = error as HttpError;
          showNotification({
            title: "Error!",
            message: err.message || "Something went wrong!",
            status: "error",
          });
        }
      } else {
        showNotification({
          title: "Signing up...",
          message: "Registering new user.",
          status: "pending",
        });

        try {
          await signUp(email, password);
          showNotification({
            title: "Success!",
            message: "User created successfully!",
            status: "success",
          });
          router.push("/purchases");
        } catch (error: unknown) {
          const err = error as HttpError;
          showNotification({
            title: "Error!",
            message: err.message || "Something went wrong!",
            status: "error",
          });
        }
      }
    },
    []
  );

  const signInWithSocialNetworks = useCallback(async (provider) => {
    showNotification({
      title: "Signing in...",
      message: "Sending login request.",
      status: "pending",
    });

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          showNotification({
            title: "Success!",
            message: "User logged in successfully!",
            status: "success",
          });
          router.push("/purchases");
        } else {
          showNotification({
            title: "Error!",
            message: "Something went wrong!",
            status: "error",
          });
          router.push("/auth");
        }
      })
      .catch((error) => {
        const err = error as HttpError;
        showNotification({
          title: "Error!",
          message: err.message || "Something went wrong!",
          status: "error",
        });
      });
  }, []);

  const signInWithTwitter = useCallback(() => {
    showNotification({
      title: "Signing in...",
      message: "Sending login request.",
      status: "pending",
    });

    const timer = setTimeout(() => {
      showNotification({
        title: "Error!",
        message: "Twitter authentication is not supported yet!",
        status: "error",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthForm
      onAuth={onAuth}
      signInWithSocialNetworks={signInWithSocialNetworks}
      signInWithTwitter={signInWithTwitter}
    />
  );
};

export default Auth;

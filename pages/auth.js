import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import AuthForm from "../components/auth/auth-form";
import Loader from "../components/loader/loader";

const AuthPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  return isLoading ? <Loader /> : <AuthForm />;
}

export default AuthPage;

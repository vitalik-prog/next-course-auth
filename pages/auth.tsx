import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Auth from "../src/pages/Auth/Auth";
import Loader from "../src/components/Loader/Loader";

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

  return isLoading ? <Loader /> : <Auth />;
}

export default AuthPage;

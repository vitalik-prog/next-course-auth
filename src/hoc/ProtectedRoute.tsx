import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();
  console.log(user);
  useEffect(() => {
    if (!user.uid) {
      router.push("/auth");
    }
  }, [router, user]);

  return <div>{user ? children : null}</div>;
};

export default ProtectedRoute;

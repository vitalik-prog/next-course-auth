import { useRouter } from "next/router";
import { useAuth } from "../context/Auth/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();

  if (!user.uid) {
    router.replace("/auth");
    return null;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;

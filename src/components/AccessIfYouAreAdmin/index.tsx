import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "src/context/authContext";
import { IsLoading } from "src/components";

const AccessIfYouAreAdmin = ({ children }: { children: ReactNode }) => {
  const { userInfo, loadingUser } = useAuth();

  if (loadingUser) return <IsLoading />;

  if (userInfo?.email !== "giuliconti1@gmail.com") return <Navigate to="/" />;

  return <>{children}</>;
};

export default AccessIfYouAreAdmin;

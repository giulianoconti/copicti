import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "src/context/authContext";
import { IsLoading } from "src/components";

const AccessIfLogged = ({ children }: { children: ReactNode }) => {
  const { userInfo, loadingUser } = useAuth();

  if (loadingUser) return <IsLoading />;

  if (!userInfo) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default AccessIfLogged;

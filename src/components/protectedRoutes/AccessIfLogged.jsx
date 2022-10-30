import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { IsLoading } from "../isLoading/IsLoading";
import PropTypes from "prop-types";

export const AccessIfLogged = ({ children }) => {
  const { userInfo, loadingUser } = useAuth();

  if (loadingUser) return <IsLoading />;

  if (!userInfo) return <Navigate to="/login" />;

  return <>{children}</>;
};

AccessIfLogged.propTypes = {
  children: PropTypes.node,
};

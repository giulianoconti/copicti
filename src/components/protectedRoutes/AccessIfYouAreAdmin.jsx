import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { IsLoading } from "../isLoading/IsLoading";
import PropTypes from "prop-types";

export const AccessIfYouAreAdmin = ({ children }) => {
  const { userInfo, loadingUser } = useAuth();

  if (loadingUser) return <IsLoading />;

  if (userInfo?.email !== "giuliconti1@gmail.com") return <Navigate to="/" />;

  return <>{children}</>;
};

AccessIfYouAreAdmin.propTypes = {
  children: PropTypes.node,
};

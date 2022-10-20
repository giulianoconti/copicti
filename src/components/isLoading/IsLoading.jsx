import React from "react";
import "./IsLoading.css";

export const IsLoading = () => {
  return (
    <div className="isLoading-box">
      <div className="isLoading-spinner-box">
        <div className="isLoading-spinner"></div>
      </div>
    </div>
  );
};

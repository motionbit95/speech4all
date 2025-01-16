import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, redirectPath = "/kla/intro", children }) {
  if (!user) {
    alert("로그인이 필요합니다.");
    return <Navigate to={redirectPath} replace />;
  }
  return children;
}

export default ProtectedRoute;

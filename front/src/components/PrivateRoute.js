import React from "react";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
}

export { PrivateRoute };

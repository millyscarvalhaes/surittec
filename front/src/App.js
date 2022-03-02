import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";

//Styles
import "bootstrap/dist/css/bootstrap.min.css";

//Pages
import { AuthLayout, HomeLayout } from "./pages";

const App = () => {
  const loggedIn = useSelector((state) => {
    let authenticationState = state.authenticationState || null;
    return authenticationState ? authenticationState.loggedIn : null;
  });

  console.log(loggedIn);

  if (!loggedIn) {
    return <AuthLayout />;
  } else {
    return <HomeLayout />;
  }
};

export default App;

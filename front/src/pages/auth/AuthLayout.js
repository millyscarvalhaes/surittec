import React, { useEffect } from "react";

//Router
import { Routes, Route, Link, useLocation } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../store/actions/alert-action";

//Pages
import { LoginPage } from "./LoginPage";

function AuthLayout(props) {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alertState);

  useEffect(() => {
    dispatch(alertActions.clear());
    // history.listen((location, action) => {});
  }, []);

  return (
    <div className="jumbotron mb-0 vh-100">
      <div className="container">
        <div className="col-md-8 offset-md-2">
          {alert !== undefined && alert.message && <div className={`text-center alert ${alert.type}`}>{alert.message}</div>}

          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<LoginPage />} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export { AuthLayout };

import { alertActions } from "../actions/alert-action";

import { userService } from "../../services/user-service";
import { createBrowserHistory } from "history";

export const USER_CONSTRAINTS = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
};

export const userActions = {
  login,
  logout,
};

function login(user, from) {
  const history = createBrowserHistory();

  return (dispatch) => {
    userService
      .login(user)
      .then((user) => {
        dispatch({ type: USER_CONSTRAINTS.LOGIN_SUCCESS, content: user });
        history.push(from);
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: USER_CONSTRAINTS.LOGIN_FAILURE, content: {} });
        dispatch(alertActions.error(error.message));
      });
  };
}

function logout() {
  return (dispatch) => {
    dispatch({ type: USER_CONSTRAINTS.LOGOUT, content: {} });
  };
}

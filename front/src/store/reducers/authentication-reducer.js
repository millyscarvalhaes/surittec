import { USER_CONSTRAINTS } from "../actions/user-actions";

let user = JSON.parse(localStorage.getItem("user"));
const authenticationState = user ? { loggedIn: true, user: user } : {};

export function authenticationReducer(state = authenticationState, dispatch) {
  switch (dispatch.type) {
    case USER_CONSTRAINTS.LOGIN_SUCCESS: {
      return { loggedIn: true, user: dispatch.content };
    }
    case USER_CONSTRAINTS.LOGOUT:
    case USER_CONSTRAINTS.LOGIN_FAILURE:
      return {};
    default:
      return state;
  }
}

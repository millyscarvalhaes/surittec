import values from "lodash/values";

export const authenticationFilter = ({ authenticationState }) => {
  return {
    loggedIn: authenticationState.loggedIn,
    user: authenticationState.user,
  };
};

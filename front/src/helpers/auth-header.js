import { isAuth } from "./is-auth";

const authHeader = () => {
  if (isAuth()) {
    let user = JSON.parse(localStorage.getItem("user"));
    return { Authorization: "Bearer " + user.jwtToken }; // for Spring Boot back-end
  } else {
    return {};
  }
};

export { authHeader };

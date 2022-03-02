const isAuth = () => {
  let user = JSON.parse(localStorage.getItem("user")) || {};
  if (user.hasOwnProperty("jwtToken")) {
    return true;
  }
  return false;
};

export { isAuth };

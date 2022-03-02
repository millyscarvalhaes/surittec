const isAdmin = () => {
  let user = JSON.parse(localStorage.getItem("user")) || {};
  if (user) {
    return user.roles.includes("ADMIN");
  }
  return false;
};

export { isAdmin };

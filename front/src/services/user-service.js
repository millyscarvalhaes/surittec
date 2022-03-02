import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const userService = {
  login,
};

function login(user) {
  return axios
    .post(API_URL, user)
    .then((res) => {
      if (res.data.jwtToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      }
    })
    .catch((error) => {
      throw new Error("Usuário ou Senha incorretos!");
    });
}

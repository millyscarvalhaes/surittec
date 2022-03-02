import axios from "axios";

const API_URL = "https://viacep.com.br/ws/";

export const viaCepService = {
  findCep,
};
function findCep(cep) {
  return axios.get(API_URL + "/" + cep + "/json/");
}

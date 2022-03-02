import axios from "axios";
import { authHeader } from "../helpers/auth-header";

const URL = "http://localhost:8080/cliente";

export const clientService = {
  list,
  findById,
  save,
  deleteById,
};

function list() {
  return axios.get(URL, { headers: authHeader() });
}

function findById(id) {
  return axios.get(`${URL}/${id}`, { headers: authHeader() });
}

function save(client) {
  if (client.id) {
    return axios.put(URL, client, { headers: authHeader() });
  } else {
    return axios.post(URL, client, { headers: authHeader() });
  }
}

function deleteById(id) {
  return axios.delete(`${URL}/${id}`, { headers: authHeader() });
}

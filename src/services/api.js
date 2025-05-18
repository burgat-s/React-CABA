import axios from 'axios';

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const homeProducts = async () => {
  const respuesta = await api.get("/products");
  return respuesta.data;
};

export const electronicsProducts = async () => {
  const respuesta = await api.get("/category/electronics");
  return respuesta.data;
};
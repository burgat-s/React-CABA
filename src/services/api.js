import axios from 'axios';

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const homeProducts = async (forceError) => {
  if (forceError === "error") {
    throw new Error("Error en la petición");
  };
  const respuesta = await api.get("/products");
  return respuesta.data;
};

export const electronicsProducts = async () => {
  const respuesta = await api.get("/products/category/electronics");
  return respuesta.data;
};
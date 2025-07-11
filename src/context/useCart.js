// src/context/useCart.js
import { useContext } from "react";
import { CartContext } from "./CartContext";

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};

export default useCart;

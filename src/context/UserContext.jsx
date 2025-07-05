import { createContext, useContext, useState } from "react";
import useCart from "../context/useCart.js";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { clearCart } = useCart();

  const login = (userData) => {
    setUser(userData)
  };
  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    clearCart();
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const UseUser = () => {
  return useContext(UserContext);
};

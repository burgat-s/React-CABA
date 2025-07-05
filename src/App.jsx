import Header from "./components/Header"
import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import Electronics from "./pages/Electronics"
import Cart from "./pages/Cart";
import UserList from "./pages/UserList";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer"
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <CartProvider>
        <UserProvider>
          <Router>
            <Header />
            <div className="flex-grow-1">
              <Routes>
                <Route path="/:error?" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/electronics" element={<Electronics />} />
                <Route path="/usuarios" element={<UserList />} />
              </Routes>
            </div>
            <Footer className="fixed-bottom" />
          </Router>
        </UserProvider>
      </CartProvider>
    </div>
  );
}

export default App

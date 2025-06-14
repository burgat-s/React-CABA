import Header from "./components/Header"
import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import Electronics from "./pages/Electronics"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer"




function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Router>
        <Header />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/:error?" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/electronics" element={<Electronics />} />
          </Routes>
        </div>
        <Footer className="fixed-bottom" />
      </Router>
    </div>
  );
}

export default App

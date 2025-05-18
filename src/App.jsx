import Header from "./components/Header"
import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import Electronics from "./pages/Electronics"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer"




function App() {
  return (
    <div class="min-vh-100 d-flex flex-column">
      <Router>
        <Header />
        <div class="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/electronics" element={<Electronics />} />
          </Routes>
        </div>
        <Footer class="fixed-bottom" />
      </Router>
    </div>
  );
}

export default App

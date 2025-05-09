import Header from "./components/Header"
import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import Electronics from "./pages/Electronics"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";




function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/electronics" element={<Electronics />} />
        </Routes>  
      </Router>  
    </div>
  );
}

export default App

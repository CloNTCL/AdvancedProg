import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Student from "../pages/Student";
import Authentification from "../pages/authentification"; 

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/student">Student</Link></li>
          <li><Link to="/authentification">Authentification</Link></li> 
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="/authentification" element={<Authentification />} /> 
      </Routes>
    </Router>
  );
}

export default App;

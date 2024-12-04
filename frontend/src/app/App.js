import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Student from "../pages/Student";
import Authentification from "../pages/authentification";
import TeacherHome from "../pages/teacherhome";
import TeacherCourseDetails from "../pages/teachercoursedetails";
import Admin from "../pages/Admin";
import AdminModuleDetails from '../pages/AdminModuleDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentification" element={<Authentification />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/module/:code" element={<AdminModuleDetails />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<TeacherHome />} /> 
        <Route path="/teacher/cours/:courseCode" element={<TeacherCourseDetails />} /> 
      </Routes>
    </Router>
  );
}

export default App;

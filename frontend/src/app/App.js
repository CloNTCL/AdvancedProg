import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Student from "../pages/Student";
import Authentification from "../pages/authentification";
import TeacherHome from "../pages/teacherhome";
import TeacherCourseDetails from "../pages/teachercoursedetails";
import AdminHome from "../pages/AdminHome";
import CreateEvaluationForm from "../pages/CreateEvaluationForm";
import EvaluationForm from "../pages/EvaluationForm";
import ResultsPage from "../pages/ResultsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentification />}/>
        <Route path="/admin" element={<AdminHome />}/>
        <Route path="/admin/create-evaluation/:courseId" element={<CreateEvaluationForm />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<TeacherHome />} /> 
        <Route path="/teacher/cours/:courseId" element={<TeacherCourseDetails />} /> 
        <Route path="/student/evaluate/:courseId" element={<EvaluationForm />} /> 
        <Route path="/admin/results/:courseId" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

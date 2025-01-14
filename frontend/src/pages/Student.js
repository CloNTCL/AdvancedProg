import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour la navigation
import Header from "../pages/header";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import "../styles/student.css";

const StudentHome = () => {
  const [ongoingEvaluations, setOngoingEvaluations] = useState([]);
  const [pastEvaluations, setPastEvaluations] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fullName = localStorage.getItem("fullName"); // Nom complet de l'étudiant
  const email = localStorage.getItem("email"); // L'email de l'étudiant (stocké dans le localStorage)
  const navigate = useNavigate();

  // Récupérer les évaluations (cours)
  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/evaluations/getAllEvaluation");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
  
        const data = await response.json();
        // Filtrer les cours où l'étudiant est inscrit
        const studentCourses = data.evaluation.filter((course) =>
          course.students.includes(email)
        );
  
        // Séparer les évaluations en cours et passées
        const ongoing = studentCourses.filter((course) => {
          // Vérifie si la date de fin est dans le futur ET que l'étudiant n'a pas encore complété le cours
          return new Date(course.end_date) > new Date() && !course.completed_students.includes(email);
        });
  
        const past = studentCourses.filter((course) => {
          // Vérifie si la date de fin est dans le passé OU que l'étudiant a déjà complété l'évaluation
          return (
            new Date(course.end_date) <= new Date() || course.completed_students.includes(email)
          );
        });
  
        setOngoingEvaluations(ongoing);
        setPastEvaluations(past);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchEvaluations();
  }, [email]);
  

  // Rediriger l'utilisateur vers la page d'évaluation
  const handleNavigate = (courseId) => {
    navigate(`/student/evaluate/${courseId}`);
  };

  // Rediriger l'utilisateur vers la page des soumissions passées
  const handleViewSubmission = (courseId) => {
    navigate(`/student/submissions/${courseId}`);
  };

  // Afficher le message de chargement ou d'erreur
  if (isLoading) {
    return <p>Loading evaluations...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="student-home-container">
      <Header />
      <main className="student-content">
        <Typography variant="h4" gutterBottom>
          Hello {fullName}, here are your evaluations
        </Typography>

        {/* Section des évaluations en cours */}
        <section className="evaluations-section">
          <Typography variant="h5" gutterBottom>
            Ongoing Evaluations
          </Typography>
          <Box className="course-list">
            {ongoingEvaluations.length > 0 ? (
              ongoingEvaluations.map((course) => (
                <Card className="course-card" key={course._id}>
                  <CardContent>
                    <Typography variant="h6" className="course-title">
                      {course.course_name}
                    </Typography>
                    <Typography variant="subtitle1" className="course-code">
                      Code: {course.course_id}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      className="course-button"
                      onClick={() => handleNavigate(course.course_id)}
                    >
                      Start Evaluation
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" className="no-courses">
                No ongoing evaluations available.
              </Typography>
            )}
          </Box>
        </section>

        {/* Section des évaluations passées */}
        <section className="evaluations-section">
          <Typography variant="h5" gutterBottom>
            Past Evaluations
          </Typography>
          <Box className="course-list">
            {pastEvaluations.length > 0 ? (
              pastEvaluations.map((course) => (
                <Card className="course-card" key={course._id}>
                  <CardContent>
                    <Typography variant="h6" className="course-title">
                      {course.course_name}
                    </Typography>
                    <Typography variant="subtitle1" className="course-code">
                      Code: {course.course_id}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" className="no-courses">
                No past evaluations found.
              </Typography>
            )}
          </Box>
        </section>
      </main>
    </div>
  );
};

export default StudentHome;

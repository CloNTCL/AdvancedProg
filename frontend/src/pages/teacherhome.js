import React, { useEffect, useState } from "react";
import Header from "../pages/header";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import "../styles/teacherhome.css";

const TeacherHome = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fullName = localStorage.getItem("fullName"); // Nom complet du professeur

  // Récupérer les cours du professeur
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        // Filtrer les cours par nom de l'enseignant connecté
        const teacherCourses = data.courses.filter(
          (course) => course.teacher_name === fullName
        );
        setCourses(teacherCourses);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [fullName]);

  // Afficher le message de chargement ou d'erreur
  if (isLoading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="teacher-home-container">
      <Header />
      <main className="teacher-content">
        <Typography variant="h4" gutterBottom>
          Hello {fullName}, Here are your courses
        </Typography>
        <Box className="course-list">
          {courses.length > 0 ? (
            courses.map((course) => (
              <Card className="course-card" key={course._id}>
                <CardContent>
                  <Typography variant="h5" className="course-title">
                    {course.course_name}
                  </Typography>
                  <Typography variant="subtitle1" className="course-code">
                    Code : {course.course_id}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className="course-button"
                    href={`/teacher/cours/${course.course_id}`}
                  >
                    Voir les détails
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="h6" className="no-courses">
              You have no courses assigned.
            </Typography>
          )}
        </Box>
      </main>
    </div>
  );
};

export default TeacherHome;

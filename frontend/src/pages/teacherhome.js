import React from "react";
import Header from "../pages/header";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import "../styles/teacherhome.css";

const TeacherHome = () => {
  const courses = [
    { name: "Mathematics - L2", code: "ST299ZE" },
    { name: "Java Programming - M2", code: "ST299ZEG" },
    { name: "Physics - L3", code: "ST299PH" },
  ];

  return (
    <div className="teacher-home-container">
      <Header />
      <main className="teacher-content">
        <Typography variant="h4" gutterBottom>
          Mes Cours
        </Typography>
        <Box className="course-list">
          {courses.map((course, index) => (
            <Card className="course-card" key={index}>
              <CardContent>
                <Typography variant="h5" className="course-title">
                  {course.name}
                </Typography>
                <Typography variant="subtitle1" className="course-code">
                  Code : {course.code}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className="course-button"
                  href={`/teacher/cours/${course.code}`}
                >
                  Voir les détails
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </main>
    </div>
  );
};

export default TeacherHome;

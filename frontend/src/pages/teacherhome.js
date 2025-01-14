import React, { useEffect, useState } from "react";
import Header from "../pages/header";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import "../styles/teacherhome.css";

const TeacherHome = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [evaluatingCourses, setEvaluatingCourses] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fullName = localStorage.getItem("fullName"); // Teacher's full name

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        // Filter courses by the teacher's name
        const teacherCourses = data.courses.filter(
          (course) => course.teacher_name === fullName
        );
        setAllCourses(teacherCourses);

        // Fetch courses currently being evaluated
        const evaluatingResponse = await fetch(
          "http://localhost:3000/api/v1/evaluations/getAllEvaluation"
        );
        if (!evaluatingResponse.ok) {
          throw new Error("Failed to fetch evaluating courses");
        }

        const evaluatingData = await evaluatingResponse.json();
        const teacherEvaluatingCourses = evaluatingData.evaluation.filter(
          (course) => course.teacher_name === fullName
        );

        setEvaluatingCourses(teacherEvaluatingCourses);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [fullName]);

  // Loading and error states
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

        {/* All Courses Section */}
        <section className="course-section">
          <Typography variant="h5" gutterBottom>
            All Courses
          </Typography>
          <Box className="course-list">
            {allCourses.length > 0 ? (
              allCourses.map((course) => (
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
                No courses found.
              </Typography>
            )}
          </Box>
        </section>

        {/* Courses Being Evaluated Section */}
        <section className="course-section">
          <Typography variant="h5" gutterBottom>
            Courses Being Evaluated Or Already Evaluated
          </Typography>
          <Box className="course-list">
            {evaluatingCourses.length > 0 ? (
              evaluatingCourses.map((course) => (
                <Card className="course-card" key={course._id}>
                  <CardContent>
                    <Typography variant="h6" className="course-title">
                      {course.course_name}
                    </Typography>
                    <Typography variant="subtitle1" className="course-code">
                      Code: {course.course_id}
                    </Typography>
                    <Typography variant="body2" className="evaluation-status">
                      Start Date: {new Date(course.start_date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" className="evaluation-status">
                      End Date: {new Date(course.end_date).toLocaleDateString()}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      className="course-button"
                      href={`/teacher/cours/${course.course_id}`}
                    >
                      View Details and Evaluation Statistics
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" className="no-courses">
                No courses currently being evaluated.
              </Typography>
            )}
          </Box>
        </section>
      </main>
    </div>
  );
};

export default TeacherHome;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../pages/header";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next"; // Import pour les traductions
import "../styles/student.css";

const StudentHome = () => {
  const { t } = useTranslation(); // Hook pour les traductions
  const [ongoingEvaluations, setOngoingEvaluations] = useState([]);
  const [pastEvaluations, setPastEvaluations] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fullName = localStorage.getItem("fullName");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/evaluations/getAllEvaluation"
        );
        if (!response.ok) {
          throw new Error(t("errorS.failedToFetchCourses"));
        }

        const data = await response.json();
        const studentCourses = data.evaluation.filter((course) =>
          course.students.includes(email)
        );

        const ongoing = studentCourses.filter((course) => {
          return (
            new Date(course.end_date) > new Date() &&
            !course.completed_students.includes(email)
          );
        });

        const past = studentCourses.filter((course) => {
          return (
            new Date(course.end_date) <= new Date() ||
            course.completed_students.includes(email)
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
  }, [email, t]);

  const handleNavigate = (courseId) => {
    navigate(`/student/evaluate/${courseId}`);
  };

  if (isLoading) {
    return <p>{t("loadingS")}</p>;
  }

  if (error) {
    return <p>{t("errorS.generic")}: {error}</p>;
  }

  return (
    <div className="student-home-container">
      <Header />
      <main className="student-content">
        <Typography variant="h4" gutterBottom>
          {t("studentHome.greeting", { fullName })}
        </Typography>

        {/* Ongoing Evaluations */}
        <section className="evaluations-section">
          <Typography variant="h5" gutterBottom>
            {t("studentHome.ongoingEvaluations")}
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
                      {t("studentHome.courseCode")}: {course.course_id}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      className="course-button"
                      onClick={() => handleNavigate(course.course_id)}
                    >
                      {t("studentHome.startEvaluation")}
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" className="no-courses">
                {t("studentHome.noOngoingEvaluations")}
              </Typography>
            )}
          </Box>
        </section>

        {/* Past Evaluations */}
        <section className="evaluations-section">
          <Typography variant="h5" gutterBottom>
            {t("studentHome.pastEvaluations")}
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
                      {t("studentHome.courseCode")}: {course.course_id}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" className="no-courses">
                {t("studentHome.noPastEvaluations")}
              </Typography>
            )}
          </Box>
        </section>
      </main>
    </div>
  );
};

export default StudentHome;

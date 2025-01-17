import React, { useEffect, useState } from "react";
import Header from "../pages/header";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next"; // Import pour les traductions
import "../styles/teacherhome.css";

const TeacherHome = () => {
  const { t } = useTranslation(); // Hook pour les traductions
  const [allCourses, setAllCourses] = useState([]);
  const [evaluatingCourses, setEvaluatingCourses] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fullName = localStorage.getItem("fullName");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://advancedprog-anut.onrender.com/api/v1/courses");
        if (!response.ok) {
          throw new Error(t("errorT.failedToFetchCourses"));
        }

        const data = await response.json();
        const teacherCourses = data.courses.filter(
          (course) => course.teacher_name === fullName
        );
        setAllCourses(teacherCourses);

        const evaluatingResponse = await fetch(
          "https://advancedprog-anut.onrender.com/api/v1/evaluations/getAllEvaluation"
        );
        if (!evaluatingResponse.ok) {
          throw new Error(t("errorT.failedToFetchEvaluations"));
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
  }, [fullName, t]);

  if (isLoading) {
    return <p>{t("loadingT")}</p>;
  }

  if (error) {
    return <p>{t("errorT.generic")}: {error}</p>;
  }

  return (
    <div className="teacher-home-container">
      <Header />
      <main className="teacher-content">
        <Typography variant="h4" gutterBottom>
          {t("teacherHome.greeting", { fullName })}
        </Typography>

        {/* All Courses Section */}
        <section className="course-section">
          <Typography variant="h5" gutterBottom>
            {t("teacherHome.allCourses")}
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
                      {t("teacherHome.courseCode")}: {course.course_id}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" className="no-courses">
                {t("teacherHome.noCourses")}
              </Typography>
            )}
          </Box>
        </section>

        {/* Courses Being Evaluated Section */}
        <section className="course-section">
          <Typography variant="h5" gutterBottom>
            {t("teacherHome.evaluatingCourses")}
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
                      {t("teacherHome.courseCode")}: {course.course_id}
                    </Typography>
                    <Typography variant="body2" className="evaluation-status">
                      {t("teacherHome.startDate")}: {new Date(course.start_date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" className="evaluation-status">
                      {t("teacherHome.endDate")}: {new Date(course.end_date).toLocaleDateString()}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      className="course-button"
                      href={`/teacher/cours/${course.course_id}`}
                    >
                      {t("teacherHome.viewDetails")}
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" className="no-courses">
                {t("teacherHome.noEvaluatingCourses")}
              </Typography>
            )}
          </Box>
        </section>
      </main>
    </div>
  );
};

export default TeacherHome;

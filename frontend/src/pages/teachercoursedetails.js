import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../pages/header";
import { useTranslation } from "react-i18next"; // Import pour les traductions
import "../styles/teachercoursedetails.css";

const TeacherCourseDetails = () => {
  const { t } = useTranslation(); // Hook pour les traductions
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`https://advancedprog-anut.onrender.com/api/v1/courses`);
        if (!response.ok) {
          throw new Error(t("errorD.failedToFetchCourses"));
        }

        const data = await response.json();
        const matchedCourse = data.courses.find(
          (course) => course.course_id === courseId
        );

        if (!matchedCourse) {
          setError(t("errorD.courseNotFound"));
        } else {
          setCourse(matchedCourse);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchResults = async () => {
      try {
        const response = await fetch(
          "https://advancedprog-anut.onrender.com/api/v1/results/getAllResults"
        );
        if (!response.ok) {
          throw new Error(t("errorD.failedToFetchResults"));
        }

        const data = await response.json();
        setResults(data.results.filter((result) => result.course_id === courseId));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
    fetchResults();
  }, [courseId, t]);

  const calculateStatistics = (questionText) => {
    const responses = results.map((result) => result.responses[questionText]);
    const responseCounts = responses.reduce((acc, response) => {
      acc[response] = (acc[response] || 0) + 1;
      return acc;
    }, {});
    const totalResponses = responses.length;

    return {
      labels: ["Too much", "Enough", "Too little"],
      data: ["Too much", "Enough", "Too little"].map(
        (label) => Math.round(((responseCounts[label] || 0) / totalResponses) * 100)
      ),
    };
  };

  const importantQuestions = [
    {
      text: "Rate the amount of work you did during this course",
    },
    {
      text: "Rate your level of involvement in the activities of this course",
    },
    {
      text: "How much practical knowledge have you gained from this course?",
    },
  ];

  if (isLoading) {
    return <p>{t("loadingD")}</p>;
  }

  if (error) {
    return <p>{t("errorD.generic")}: {error}</p>;
  }

  if (!course) {
    return <h2>{t("errorD.courseNotAssigned")}</h2>;
  }

  return (
    <div>
      <Header />
      <main className="teacher-course-content">
        <h1>{t("courseDetails.title", { courseName: course.course_name })}</h1>
        <p>
          <strong>{t("courseDetails.courseCode")}:</strong> {course.course_id}
        </p>
        <p>
          <strong>{t("courseDetails.teacher")}:</strong> {course.teacher_name}
        </p>
        <p>
          <strong>{t("courseDetails.dates")}:</strong>{" "}
          {new Date(course.start_date).toLocaleDateString()} -{" "}
          {new Date(course.end_date).toLocaleDateString()}
        </p>

        {/* Graphique des statistiques */}
        <div className="charts-container">
          {importantQuestions.map((question, index) => {
            const { labels, data } = calculateStatistics(question.text);

            return (
              <div key={index} className="chart-item">
                <h3>{question.text}</h3>
                {results.length > 0 ? (
                  <div className="progress-bars">
                    {labels.map((label, idx) => (
                      <div key={label} className="progress-bar-item">
                        <span>{label}</span>
                        <div
                          className="progress-bar"
                          style={{
                            backgroundColor: ["#FF6384", "#36A2EB", "#4CAF50"][idx],
                            width: `${data[idx]}%`,
                          }}
                        >
                          <div style={{ color: "black" }}>{data[idx]}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>{t("noResponses")}</p>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default TeacherCourseDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Header from "../pages/header";
import { useTranslation } from "react-i18next"; // Import pour les traductions
import "../styles/resultsPage.css";

const ResultsPage = () => {
  const { t } = useTranslation(); // Hook pour les traductions
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/courses`);
        if (!response.ok) {
          throw new Error(t("error.failedToFetchCourses"));
        }

        const data = await response.json();
        const matchedCourse = data.courses.find(
          (course) => course.course_id === courseId
        );

        if (!matchedCourse) {
          setError(t("error.courseNotFound"));
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
          `http://localhost:3000/api/v1/results/getAllResults`
        );
        if (!response.ok) {
          throw new Error(t("error.failedToFetchResults"));
        }

        const data = await response.json();
        const filteredResults = data.results.filter(
          (result) => result.course_id === courseId
        );
        setResults(filteredResults);
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
    return <p>{t("loading")}</p>;
  }

  if (error) {
    return <p>{t("error.generic")}: {error}</p>;
  }

  if (!course) {
    return <h2>{t("error.courseNotAssigned")}</h2>;
  }

  return (
    <div>
      <Header />
      <Box className="results-container">
        <Typography variant="h4" gutterBottom>
          {t("resultsPage.title", { courseId })}
        </Typography>

        {/* Graphique des statistiques */}
        <Box className="charts-container">
          {importantQuestions.map((question, index) => {
            const { labels, data } = calculateStatistics(question.text);

            return (
              <div key={index} className="chart-item">
                <Typography variant="h6" gutterBottom>
                  {question.text}
                </Typography>
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
                  <Typography variant="body2">{t("noResponses")}</Typography>
                )}
              </div>
            );
          })}
        </Box>

        <Typography variant="h5" className="results-subtitle">
          {t("resultsPage.detailsSubtitle")}
        </Typography>

        {/* Tableau des réponses */}
        {results.length > 0 ? (
          <TableContainer component={Paper} className="styled-table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">{t("table.question")}</TableCell>
                  <TableCell className="table-header">{t("table.response")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result, index) =>
                  Object.keys(result.responses).map((key, idx) => (
                    <TableRow key={`${index}-${idx}`} className="table-row">
                      <TableCell className="table-cell">{key}</TableCell>
                      <TableCell className="table-cell">{result.responses[key]}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>{t("noResults")}</Typography>
        )}
      </Box>
    </div>
  );
};

export default ResultsPage;

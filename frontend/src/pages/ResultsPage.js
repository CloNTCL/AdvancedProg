import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent } from "@mui/material";
import Header from "../pages/header";
import '../styles/resultsPage.css';

const ResultsPage = () => {
  const { courseId } = useParams(); // Get course code from URL
  const [course, setCourse] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/courses`);
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        const matchedCourse = data.courses.find(
          (course) => course.course_id === courseId // Matching by course_code
        );

        if (!matchedCourse) {
          setError("Course not found");
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
          throw new Error("Failed to fetch survey results");
        }

        const data = await response.json();
        // Filter results by courseId after fetching all results
        const filteredResults = data.results.filter(
            (result) => result.course_id === courseId
        );
        console.log("Fetched results:", data.results);
        console.log("Filtering by courseId:", courseId);

          
        setResults(filteredResults);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
    fetchResults();
  }, [courseId]);

  if (isLoading) {
    return <p>Loading course details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!course) {
    return <h2>This course does not exist or is not assigned to you.</h2>;
  }

  return (
    <div>
      <Header />
      <Box className="results-container">
        <Typography variant="h4">Results for Course: {courseId}</Typography>
        {results.length > 0 ? (
          results.map((result, index) => (
            <Card key={index} className="result-card">
            <CardContent>
                <Typography variant="h6">Anonyme responses</Typography>
                {Object.keys(result.responses).map((key, idx) => (
                <Typography variant="body1" key={idx}>
                    {key}: {JSON.stringify(result.responses[key])}
                </Typography>
                ))}
            </CardContent>
            </Card>

          ))
        ) : (
          <Typography>No results available.</Typography>
        )}
      </Box>
    </div>
  );
};

export default ResultsPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../pages/header";
import "../styles/teachercoursedetails.css";

const TeacherCourseDetails = () => {
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
          (course) => course.course_id === courseId
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
          "http://localhost:3000/api/v1/results/getAllResults"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch survey results");
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

  // Calculate statistics for the selected questions
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

  return (
    <div className="teacher-course-details-container">
      <Header />
      <main className="teacher-course-content">
        <h1>Course Details: {course.course_name}</h1>
        <p>
          <strong>Course Code:</strong> {course.course_id}
        </p>
        <p>
          <strong>Teacher:</strong> {course.teacher_name}
        </p>
        <p>
          <strong>Dates:</strong> {new Date(course.start_date).toLocaleDateString()} -{" "}
          {new Date(course.end_date).toLocaleDateString()}
        </p>

        <div className="charts-container">
          {importantQuestions.map((question, index) => {
            const { labels, data } = calculateStatistics(question.text);

            return (
              <div key={index} className="chart-item">
                <h3>{question.text}</h3>
                {results.length > 0 ? (
                  <div className="progress-bars">
                    {labels.map((label, index) => (
                      <div key={label} className="progress-bar-item">
                        <span>{label}</span>
                        <div
                          className="progress-bar"
                          style={{
                            backgroundColor: ["#FF6384", "#36A2EB", "#4CAF50"][index],
                            width: `${data[index]}%`,
                          }}
                        >
                          <div style={{ color: "black" }}>{data[index]}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No responses yet.</p>
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

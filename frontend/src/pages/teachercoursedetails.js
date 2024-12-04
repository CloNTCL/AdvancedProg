import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "../pages/header";
import "../styles/teachercoursedetails.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const TeacherCourseDetails = () => {
  const { courseCode } = useParams(); // Récupérer le code du cours depuis l'URL
  const [course, setCourse] = useState(null);
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
        // Trouver le cours avec le code correspondant
        const matchedCourse = data.courses.find(
          (course) => course.course_id === courseCode
        );

        if (!matchedCourse) {
          setError("Course not found");
        } else {
          setCourse(matchedCourse);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseCode]);

  // Gestion des états de chargement et des erreurs
  if (isLoading) {
    return <p>Loading course details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!course) {
    return <h2>Ce cours n'existe pas ou ne vous appartient pas.</h2>;
  }

  // Exemple fictif de statistiques pour le cours
  const courseStats = {
    "Teacher's availability": 80,
    "Amount of work": 70,
    "Overall satisfaction": 85,
  };

  const getChartData = (stats) => ({
    labels: Object.keys(stats),
    datasets: [
      {
        label: "Course Evaluation",
        data: Object.values(stats),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  });

  return (
    <div className="teacher-course-details-container">
      <Header />
      <main className="teacher-course-content">
        <h1>Détails du Cours : {course.course_name}</h1>
        <p><strong>Code du cours :</strong> {course.course_id}</p>
        <p><strong>Professeur :</strong> {course.teacher_name}</p>
        <p><strong>Dates :</strong> {new Date(course.start_date).toLocaleDateString()} - {new Date(course.end_date).toLocaleDateString()}</p>

        <div className="charts-container">
          {Object.keys(courseStats).map((category, index) => (
            <div key={index} className="chart-item">
              <h3>{category}</h3>
              <Pie data={getChartData({ [category]: courseStats[category] })} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TeacherCourseDetails;

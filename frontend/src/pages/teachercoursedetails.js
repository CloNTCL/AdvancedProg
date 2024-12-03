import React from "react";
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
  const { courseCode } = useParams();

  const courseStats = {
    ST299ZE: {
      name: "Mathematics - L2",
      stats: {
        "Teacher's availability": 80,
        "Amount of work": 60,
        "Overall satisfaction": 75,
      },
    },
    ST299ZEG: {
      name: "Java Programming - M2",
      stats: {
        "Teacher's availability": 90,
        "Amount of work": 70,
        "Overall satisfaction": 85,
      },
    },
  };

  const course = courseStats[courseCode];

  if (!course) {
    return <h2>Ce cours n'existe pas</h2>;
  }

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
        <h1>Détails du Cours : {course.name}</h1>
        <div className="charts-container">
          {Object.keys(course.stats).map((category, index) => (
            <div key={index} className="chart-item">
              <h3>{category}</h3>
              <Pie data={getChartData({ [category]: course.stats[category] })} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TeacherCourseDetails;

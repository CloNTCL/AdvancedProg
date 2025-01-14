import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Select, MenuItem, IconButton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/evaluationForm.css";

const CreateEvaluationForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "Rate the amount of work you did during this course",
      type: "Single Choice",
      choices: ["Too much", "Enough", "Too little"],
    },
    {
      id: 2,
      text: "Rate your level of involvement in the activities of this course",
      type: "Single Choice",
      choices: ["Too much", "Enough", "Too little"],
    },
    {
      id: 3,
      text: "How much practical knowledge have you gained from this course?",
      type: "Single Choice",
      choices: ["Too much", "Enough", "Too little"],
    },
    {
      id: 4,
      text: "The course objectives were clear",
      type: "Rating",
      choices: [],
    },
    {
      id: 5,
      text: "What overall rating will you give this course?",
      type: "Rating",
      choices: [],
    },
    {
      id: 6,
      text: "What are the major strengths of this course?",
      type: "Open-Ended",
      choices: [],
    },
    {
      id: 7,
      text: "What overall rating will you give this course?",
      type: "Rating",
      choices: [],
    },
    {
      id: 8,
      text: "What are the major strengths of this course?",
      type: "Open-Ended",
      choices: [],
    },
    {
      id: 9,
      text: "What are the major weaknesses of this course?",
      type: "Open-Ended",
      choices: [],
    },
    {
      id: 10,
      text: "Are you satisfy with this course?",
      type: "Single Choice",
      choices: ["Very satisfy", "satisfy", "Not satisfy"],
    },
  ]);
  
  const [startDate] = useState(today);
  const [endDate, setEndDate] = useState("");
  const [courseDetails, setCourseDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/courses/${courseId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course details.");
        }
        const data = await response.json();
        setCourseDetails(data.course);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: "",
      type: "Open-Ended",
      choices: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (id, text) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  const handleTypeChange = (id, type) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? { ...q, type, choices: type === "Multiple Choice" || type === "Single Choice" ? [""] : [] }
          : q
      )
    );
  };

  const handleSubmit = async () => {
    if (!courseDetails) {
      alert("Course details not loaded yet.");
      return;
    }

    const evaluationData = {
      course_id: courseId,
      course_name: courseDetails.course_name,
      teacher_name: courseDetails.teacher_name,
      students: courseDetails.students,
      start_date: startDate,
      end_date: endDate,
      questions,
    };

    try {
      const evaluationResponse = await fetch("http://localhost:3000/api/v1/evaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evaluationData),
      });

      if (!evaluationResponse.ok) {
        throw new Error("Failed to create evaluation.");
      }

      const courseUpdateResponse = await fetch(`http://localhost:3000/api/v1/courses/${courseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_being_evaluated: true }),
      });

      if (!courseUpdateResponse.ok) {
        throw new Error("Failed to update course status.");
      }

      navigate("/admin");
    } catch (error) {
      alert(error.message);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!courseDetails) {
    return <p>Loading course details...</p>;
  }

  return (
    <Box className="evaluation-form-container">
      <Typography variant="h4" gutterBottom>
        Create Evaluation for {courseDetails.course_name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Teacher: {courseDetails.teacher_name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Enrolled Students: {courseDetails.students.join(", ")}
      </Typography>

      <Box className="date-inputs">
        <TextField
          type="date"
          label="Start Date"
          value={startDate}
          disabled
          className="date-input"
        />
        <TextField
          type="date"
          label="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="date-input"
        />
      </Box>

      <Box className="questions-list">
        {questions.map((question, index) => (
          <Box key={question.id} className="question-item">
            <TextField
              fullWidth
              label={`Question ${index + 1}`}
              value={question.text}
              onChange={(e) => handleQuestionChange(question.id, e.target.value)}
              className="question-input"
              placeholder="Enter your question"
            />
            <Select
              value={question.type}
              onChange={(e) => handleTypeChange(question.id, e.target.value)}
              className="question-type-select"
            >
              <MenuItem value="Open-Ended">Open-Ended</MenuItem>
              <MenuItem value="Single Choice">Single Choice</MenuItem>
              <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
              <MenuItem value="Rating">Rating</MenuItem>
            </Select>
          </Box>
        ))}
        <Button variant="outlined" color="primary" onClick={handleAddQuestion}>
          Add Question
        </Button>
      </Box>

      <Button variant="contained" color="primary" onClick={handleSubmit} className="submit-button">
        Submit Evaluation
      </Button>
    </Box>
  );
};

export default CreateEvaluationForm;

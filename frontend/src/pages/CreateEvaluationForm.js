import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, MenuItem, Select, IconButton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/evaluationForm.css";

const CreateEvaluationForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  // Preloaded questions from the PDF
  const defaultQuestions = [
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
      choices: ["Active", "Moderate", "Passive"],
    },
    {
      id: 3,
      text: "How much practical knowledge have you gained from this course?",
      type: "Single Choice",
      choices: ["A lot", "Moderate", "Very little"],
    },
    {
      id: 4,
      text: "The course objectives were clear",
      type: "Rating",
      choices: [],
    },
    {
      id: 5,
      text: "The course presentations explained the concepts effectively",
      type: "Rating",
      choices: [],
    },
    {
      id: 6,
      text: "The course syllabus was clear and useful in my career",
      type: "Rating",
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
  ];

  const [questions, setQuestions] = useState(defaultQuestions);
  const [startDate] = useState(today); // Automatically set to today's date
  const [endDate, setEndDate] = useState("");

  // Add a custom question
  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: "",
      type: "Open-Ended",
      choices: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  // Update question text
  const handleQuestionChange = (id, text) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  // Update question type
  const handleTypeChange = (id, type) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? { ...q, type, choices: type === "Multiple Choice" || type === "Single Choice" ? [""] : [] }
          : q
      )
    );
  };

  // Add a choice to a question
  const handleAddChoice = (id) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, choices: [...q.choices, ""] } : q
      )
    );
  };

  // Update choice text
  const handleChoiceChange = (id, index, text) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              choices: q.choices.map((choice, i) => (i === index ? text : choice)),
            }
          : q
      )
    );
  };

  // Remove a choice
  const handleRemoveChoice = (id, index) => {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? { ...q, choices: q.choices.filter((_, i) => i !== index) }
          : q
      )
    );
  };

  // Remove a question
  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Move question to a new position
  const handleMoveQuestion = (id, direction) => {
    const index = questions.findIndex((q) => q.id === id);
    if (direction === "up" && index > 0) {
      const reordered = [...questions];
      [reordered[index - 1], reordered[index]] = [reordered[index], reordered[index - 1]];
      setQuestions(reordered);
    }
    if (direction === "down" && index < questions.length - 1) {
      const reordered = [...questions];
      [reordered[index + 1], reordered[index]] = [reordered[index], reordered[index + 1]];
      setQuestions(reordered);
    }
  };

  // Submit evaluation form
  const handleSubmit = async () => {
    const evaluationData = {
      course_id: courseId,
      start_date: startDate,
      end_date: endDate,
      questions,
    };

    try {
      const response = await fetch("http://localhost:3000/api/v1/evaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evaluationData),
      });

      if (response.ok) {
        alert("Evaluation created successfully!");
        navigate("/admin");
      } else {
        throw new Error("Failed to create evaluation");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box className="evaluation-form-container">
      <Typography variant="h4" gutterBottom>
        Create Evaluation for Course: {courseId}
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
            {(question.type === "Multiple Choice" || question.type === "Single Choice") && (
              <Box className="choices-container">
                {question.choices.map((choice, i) => (
                  <Box key={i} className="choice-item">
                    <TextField
                      fullWidth
                      value={choice}
                      onChange={(e) => handleChoiceChange(question.id, i, e.target.value)}
                      className="choice-input"
                      placeholder={`Choice ${i + 1}`}
                    />
                    <IconButton onClick={() => handleRemoveChoice(question.id, i)} color="error">
                      ❌
                    </IconButton>
                  </Box>
                ))}
                <Button variant="outlined" color="primary" onClick={() => handleAddChoice(question.id)}>
                  Add Choice
                </Button>
              </Box>
            )}
            <Box className="action-buttons">
              <Button
                variant="text"
                onClick={() => handleMoveQuestion(question.id, "up")}
                disabled={index === 0}
              >
                ↑
              </Button>
              <Button
                variant="text"
                onClick={() => handleMoveQuestion(question.id, "down")}
                disabled={index === questions.length - 1}
              >
                ↓
              </Button>
              <Button variant="text" color="error" onClick={() => handleRemoveQuestion(question.id)}>
                🗑️
              </Button>
            </Box>
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

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, Button, TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import "../styles/evaluationForm.css";

const EvaluationForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [evaluation, setEvaluation] = useState(null);
  const [responses, setResponses] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Nom de l'étudiant depuis le localStorage
  const studentName = localStorage.getItem("fullName");

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/evaluations/${courseId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch evaluation");
        }
        const data = await response.json();
        setEvaluation(data.evaluation);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvaluation();
  }, [courseId]);

  const handleResponseChange = (questionId, value) => {
    setResponses({ ...responses, [questionId]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/results/${courseId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_name: studentName, responses }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit evaluation");
      }
  
      // Mark the evaluation as completed for the student
      const completeResponse = await fetch(`http://localhost:3000/api/v1/evaluations/${courseId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentEmail: localStorage.getItem("email") }), // Student's email from localStorage
      });
  
      if (!completeResponse.ok) {
        throw new Error("Failed to mark evaluation as completed");
      }
  
      navigate("/student");
    } catch (error) {
      alert(error.message);
    }
  };
  

  if (isLoading) return <p>Loading evaluation...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box className="evaluation-form-container">
      <Typography variant="h4" gutterBottom>
        Evaluation for Course: {courseId}
      </Typography>

      <Box className="questions-list">
        {evaluation.questions.map((question) => (
          <Box key={question._id} className="question-item">
            <Typography variant="h6">{question.text}</Typography>
            {question.type === "Open-Ended" && (
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Write your response..."
                value={responses[question.text] || ""}
                onChange={(e) => handleResponseChange(question.text, e.target.value)}
              />
            )}
            {question.type === "Single Choice" && (
              <RadioGroup
                value={responses[question.text] || ""}
                onChange={(e) => handleResponseChange(question.text, e.target.value)}
              >
                {question.choices.map((choice, index) => (
                  <FormControlLabel key={index} value={choice} control={<Radio />} label={choice} />
                ))}
              </RadioGroup>
            )}
            {question.type === "Rating" && (
              <TextField
                type="number"
                inputProps={{ min: 1, max: 5 }}
                value={responses[question.text] || ""}
                onChange={(e) => handleResponseChange(question.text, e.target.value)}
              />
            )}
          </Box>
        ))}
      </Box>

      <Button variant="contained" color="primary" onClick={handleSubmit} className="submit-button">
        Submit Evaluation
      </Button>
    </Box>
  );
};

export default EvaluationForm;

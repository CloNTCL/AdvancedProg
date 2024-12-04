const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, required: true }, // Open-Ended, Single Choice, etc.
  choices: { type: [String], default: [] }, // Applicable for Multiple Choice/Single Choice
});

const EvaluationSchema = new mongoose.Schema({
  course_id: { type: String, required: true },
  course_name: { type: String},
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  questions: { type: [QuestionSchema], required: true },
  teacher_name: { type: String},
  students: { type: [String]}, 
  completed_students: { type: [String], default: [] }, 
});

module.exports = mongoose.model("Evaluation", EvaluationSchema);

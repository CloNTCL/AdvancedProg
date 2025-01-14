const express = require("express");
const { createEvaluation, getEvaluationByCourseId, getAllEvaluationCourses, completeEvaluation } = require("../controllers/evaluationController");

const router = express.Router();

// Créer une nouvelle évaluation
router.post("/", createEvaluation);

//Get All evaluation
router.get("/getAllEvaluation", getAllEvaluationCourses)

// Obtenir une évaluation par ID de cours
router.get("/:courseId", getEvaluationByCourseId);

// Mark an evaluation as completed by a student
router.post("/:courseId/complete", completeEvaluation);

module.exports = router;

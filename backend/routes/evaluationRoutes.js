const express = require("express");
const { createEvaluation, getEvaluationByCourseId } = require("../controllers/evaluationController");

const router = express.Router();

// Créer une nouvelle évaluation
router.post("/", createEvaluation);

// Obtenir une évaluation par ID de cours
router.get("/:courseId", getEvaluationByCourseId);

module.exports = router;

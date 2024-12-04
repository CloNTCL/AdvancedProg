const express = require("express");
const { submitEvaluation } = require("../controllers/resultController");

const router = express.Router();

// Route pour soumettre une évaluation
router.post("/:courseId/submit", submitEvaluation);

module.exports = router;

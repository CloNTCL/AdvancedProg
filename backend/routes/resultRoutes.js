const express = require("express");
const { submitEvaluation, getAllResults, getResultByCourseId } = require("../controllers/resultController");

const router = express.Router();

// Route pour soumettre une évaluation
router.post("/:courseId/submit", submitEvaluation);

router.get("/getAllResults", getAllResults);

router.get("/:courseId", getResultByCourseId);

module.exports = router;

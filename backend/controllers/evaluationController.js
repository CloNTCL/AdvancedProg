const Evaluation = require("../models/Evaluation");

// Créer une évaluation
exports.createEvaluation = async (req, res) => {
  try {
    const { course_id, start_date, end_date, questions } = req.body;


    console.log("Received data:", req.body)

    // Validation simple
    if (!course_id || !start_date || !end_date || !questions) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const savedEvaluation = await Evaluation.create(req.body);
    res.status(201).json({
      message: "Evaluation created successfully",
      evaluation: savedEvaluation,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Récupérer une évaluation par ID de cours
exports.getEvaluationByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const evaluation = await Evaluation.findOne({ course_id: courseId });

    if (!evaluation) {
      return res.status(404).json({ message: "Evaluation not found" });
    }

    res.status(200).json({ evaluation });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

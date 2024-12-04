const Result = require("../models/Result");

exports.submitEvaluation = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { student_name, responses } = req.body;

    // Validation
    if (!student_name || !courseId || !responses) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Création d'un nouveau résultat
    const newResult = new Result({
      student_name,
      course_id: courseId,
      responses,
    });

    // Enregistrement dans la base de données
    const savedResult = await newResult.save();

    res.status(201).json({
      message: "Evaluation submitted successfully",
      result: savedResult,
    });
  } catch (error) {
    console.error("Error submitting evaluation:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

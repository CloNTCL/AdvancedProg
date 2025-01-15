const Evaluation = require("../models/Evaluation");
const { sendConfirmationEmail } = require("../utils/emailService");
const { sendConfirmationEmailToTeacher } = require("../utils/emailTeacherService"); // Import de la fonction pour les enseignants

// Créer une évaluation
exports.createEvaluation = async (req, res) => {
  try {
    const { course_id, course_name, start_date, end_date, questions, students, teacher_name, teacher_email } = req.body;

    console.log("Received data:", req.body);

    // Validation simple
    if (!course_id || !course_name || !start_date || !end_date || !questions || !students || students.length === 0 || !teacher_email) {
      return res.status(400).json({ message: "All fields are required, including teacher email and students." });
    }

    // Création de l'évaluation
    const savedEvaluation = await Evaluation.create(req.body);

    // Envoi d'un email à tous les étudiants
    const emailPromises = students.map((email) =>
      sendConfirmationEmail(email, teacher_name, course_name)
    );

    // Envoi de l'email au professeur
    const teacherEmailPromise = sendConfirmationEmailToTeacher(
      teacher_email,
      teacher_name,
      course_name,
      start_date,
      end_date
    );

    // Attendre que tous les emails soient envoyés
    await Promise.all([...emailPromises, teacherEmailPromise]);

    res.status(201).json({
      message: "Evaluation created successfully, emails sent to students and teacher.",
      evaluation: savedEvaluation,
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'évaluation :", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Récupérer toutes les évaluations
exports.getAllEvaluationCourses = async (req, res) => {
  try {
    const evaluation = await Evaluation.find();

    if (!evaluation || evaluation.length === 0) {
      return res.status(404).json({ message: "Evaluations not found" });
    }

    res.status(200).json({ evaluation });
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

// Marquer une évaluation comme complétée par un étudiant
exports.completeEvaluation = async (req, res) => {
  const { courseId } = req.params;
  const { studentEmail } = req.body;

  try {
    // Trouver l'évaluation et ajouter l'étudiant à la liste completed_students
    const evaluation = await Evaluation.findOneAndUpdate(
      { course_id: courseId },
      { $addToSet: { completed_students: studentEmail } }, // Ajout sans duplication
      { new: true }
    );

    if (!evaluation) {
      return res.status(404).json({ message: "Evaluation not found" });
    }

    res.status(200).json({ message: "Evaluation marked as completed", evaluation });
  } catch (error) {
    res.status(500).json({ message: "Error marking evaluation as completed", error: error.message });
  }
};

const Course = require('../models/courseModel');

// Récupérer la liste de tous les cours
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      message: "Successfully retrieved courses",
      courses
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while retrieving courses",
      error: error.message
    });
  }
};

// Récupérer un cours spécifique par son ID
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findOne({ course_id: id });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Successfully retrieved course",
      course
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while retrieving course",
      error: error.message
    });
  }
};

// Update course status
exports.updateCourseStatus = async (req, res) => {
  try {
    const { id } = req.params; // Course ID
    const { is_being_evaluated } = req.body;

    const updatedCourse = await Course.findOneAndUpdate(
      { course_id: id },
      { is_being_evaluated },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json({
      message: "Course status updated successfully.",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating course status.",
      error: error.message,
    });
  }
};
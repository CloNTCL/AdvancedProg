const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: [true, "Le champ 'course_id' est obligatoire"],
    unique: true
  },
  course_name: {
    type: String,
    required: [true, "Le champ 'course_name' est obligatoire"]
  },
  teacher_name: {
    type: String,
    required: [true, "Le champ 'teacher_name' est obligatoire"]
  },
  teacher_email: {
    type: String,
    required: [true, "Le champ 'teacher_email' est obligatoire"],
    match: [/.+@.+\..+/, "L'adresse email est invalide"]
  },
  students: {
    type: [String],
    required: [true, "La liste des étudiants est obligatoire"]
  },
  completed_students: {
    type: [String], // Students who completed the evaluation
    default: []
  },
  is_being_evaluated: {
    type: Boolean, // Whether the course is under evaluation
    default: false
  },
  start_date: {
    type: Date,
    required: [true, "Le champ 'start_date' est obligatoire"]
  },
  end_date: {
    type: Date,
    required: [true, "Le champ 'end_date' est obligatoire"]
  }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;

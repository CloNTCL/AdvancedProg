const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  student_name: { type: String, required: true },
  course_id: { type: String, required: true },
  responses: { type: Map, of: String, required: true }, // Stocke les réponses sous forme de clé-valeur
  submitted_at: { type: Date, default: Date.now }, // Date d'envoi
});

module.exports = mongoose.model("Result", ResultSchema);

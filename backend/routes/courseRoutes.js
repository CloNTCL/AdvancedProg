const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Récupérer tous les cours
router.get('/', courseController.getAllCourses);

// Récupérer un cours spécifique par son ID
router.get('/:id', courseController.getCourseById);

module.exports = router;

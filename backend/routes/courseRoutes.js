const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Get all courses
router.get('/', courseController.getAllCourses);

// Get a specific course by ID
router.get('/:id', courseController.getCourseById);

// Update a course's status
router.patch('/:id', courseController.updateCourseStatus);

module.exports = router;

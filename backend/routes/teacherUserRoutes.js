const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/teacherUserController');

// Route pour la connexion
router.post('/teacherLogin', loginUser);

module.exports = router;

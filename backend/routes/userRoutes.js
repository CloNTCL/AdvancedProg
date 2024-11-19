const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/userController');

// Route pour la connexion
router.post('/login', loginUser);

module.exports = router;

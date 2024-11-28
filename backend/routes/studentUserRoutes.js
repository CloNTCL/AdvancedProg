const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/studentUserController');

// Route pour la connexion
router.post('/studentLogin', loginUser);

module.exports = router;

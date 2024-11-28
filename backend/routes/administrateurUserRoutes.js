const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/administrateurUserController');

// Route pour la connexion
router.post('/adminLogin', loginUser);

module.exports = router;

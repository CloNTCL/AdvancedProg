const User = require('../models/administrateurUserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Contrôleur pour la connexion
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérification que les champs sont remplis
        if (!email || !password) {
            return res.status(400).json({ message: 'Veuillez remplir tous les champs.' });
        }

        // Recherche de l'utilisateur dans la base de données
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

         //Génération d'un token JWT
         const token = jwt.sign(
             { id: user._id, role: user.role },
             process.env.JWT_SECRET, 
             { expiresIn: '1d' }
         );

        // Réponse avec les informations de l'utilisateur et le token
        res.status(200).json({
            message: 'Connexion réussie.',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error: error.message });
    }
};

module.exports = {
    loginUser,
};

const axios = require('axios');

const articleMiddleware = async (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ message: 'Non authentifié. Veuillez vous connecter.' });
    }

    try {
        const response = await axios.get('http://localhost:3000/user', {
            headers: { Cookie: `authToken=${token}` },
        });

        const user = response.data;

        if (user.role !== 'admin' || !user.permissions.includes('write')) {
            return res.status(403).json({ message: 'Accès réservé.' });
        }

        next();
        console.log('Utilisateur authentifié dans articleMiddleware :', req.user);
    } catch (err) {
        console.error('Erreur dans le articleMiddleware :', err);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

module.exports = articleMiddleware;
const { UserModel } = require('../models/userModel');

const isAdmin = async (req, res, next) => {
    const token = req.cookies.authToken;
    const userCollection = db.collection('Users');

    if (!token) {
        return res.status(403).json({ message: 'Accès interdit. Veuillez vous connecter.' });
    }

    try {
        const tokenData = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
        const userId = tokenData.userId;

        const userModel = new UserModel(userCollection);
        const user = await userModel.getById(userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès interdit : administrateurs uniquement.' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Erreur lors de la vérification des droits d'admin :", err);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

module.exports = isAdmin;

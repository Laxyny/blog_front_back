const { ArticleModel } = require('../models/articleModel');
const axios = require('axios');

let articleModel;

exports.init = (blogCollection) => {
    articleModel = new ArticleModel(blogCollection);
};

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await articleModel.getAll();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des articles' });
    }
};

exports.getArticle = async (req, res) => {
    try {
        const id = req.params.id;
        const article = await articleModel.getById(id);
        if (article) {
            res.json(article);
        } else {
            res.status(404).json({ message: 'article non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'article' });
    }
};

exports.getUserArticles = async (req, res) => {
    try {
        const userId = req.user.userId;

        const articles = await articleModel.collection.find({ userId: userId }).toArray(); // Trouve toutes les boutiques
        if (!articles || articles.length === 0) {
            return res.status(404).json({ message: "Aucun article trouvée pour cet utilisateur." });
        }

        res.json(articles);
    } catch (err) {
        console.error("Erreur lors de la récupération des articles :", err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

exports.createArticle = async (req, res) => {
    const token = req.cookies.authToken;
    try {
        const { titre, intro, article } = req.body;

        const userId = req.user.userId;

        const response = await axios.get('http://localhost:3000/user', {
            headers: { Cookie: `authToken=${token}` },
        });

        const user = response.data;

        if (!user.permissions.includes('write')) {
            return res.status(403).json({ message: "Accès refusé : Seuls les utilisateurs avec la permission d\'écriture ont le droit de créer un article" });
        }

        if (!titre || !intro || ! article) {
            return res.status(400).json({ message: "Veuillez remplir tout les champs" });
        }

        const newArticle = {
            titre,
            intro,
            article,
            userId: userId
        };

        const createdArticle = await articleModel.create(newArticle);
        res.status(201).json(createdArticle);
    } catch (err) {
        console.error("Erreur lors de la création du magasin :", err);
        res.status(500).json({ message: "Erreur lors de la création du magasin" });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedFields = {
            titre: req.body.titre,
            intro: req.body.intro,
            article: req.body.article
        };
        const success = await articleModel.updateById(id, updatedFields);
        if (!success) {
            res.status(404).json({ message: 'Article non trouvé' });
        } else {
            res.json({ message: 'Article mis à jour' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'article' });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const id = req.params.id;
        const success = await articleModel.deleteById(id);
        if (!success) {
            res.status(404).json({ message: 'Article non trouvé' });
        } else {
            res.status(200).json({ message: 'Article supprimé' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'article' });
    }
};
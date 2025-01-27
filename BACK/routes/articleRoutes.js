const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middlewares/authMiddleware');
const articleMiddleware = require('../middlewares/articleMiddleware');

// Routes articles
router.post('/createArticle', authMiddleware, articleController.createArticle);
router.get('/getAllArticles', articleController.getAllArticles);

module.exports = router;
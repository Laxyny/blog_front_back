const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middlewares/authMiddleware');
const articleMiddleware = require('../middlewares/articleMiddleware');

// Routes articles
router.post('/createArticle', authMiddleware, articleController.createArticle);
router.get('/getAllArticles', articleController.getAllArticles);
router.get('/getArticle/:id', articleController.getArticle);
router.put('/updateArticle/:id', articleController.updateArticle);
router.delete('/deleteArticle/:id', articleController.deleteArticle);

module.exports = router;
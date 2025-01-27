const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes Users
router.get('/users', userController.getAllUsers);
router.get('/user', authMiddleware, userController.getUserFromToken);
router.get('/user/:id', authMiddleware, userController.getUser);
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logout);

router.put('/updateUser/:id', authMiddleware, userController.updateUser);
router.delete('/deleteUser/:id', authMiddleware, userController.deleteUser);

router.put('/users/:id/permissions', authMiddleware, userController.updateUserPermissions);

module.exports = router;
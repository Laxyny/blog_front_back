const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');

// Routes Users
router.get('/users', userController.getAllUsers);
router.get('/user', authMiddleware, userController.getUserFromToken);
router.get('/user/:id', userController.getUser);
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logout);

router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);

router.put('/users/:id/permissions', authMiddleware, isAdmin, userController.updateUserPermissions);

module.exports = router;
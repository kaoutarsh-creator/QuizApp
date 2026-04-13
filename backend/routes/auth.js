import express from 'express';
import { signup, login, getUsers, getProfile } from '../controllers/authController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/users', getUsers);
router.get('/profile', isAuthenticated, getProfile);

export default router;

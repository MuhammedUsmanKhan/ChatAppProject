import express from 'express';
import { register, login ,logout } from '../controllers/authController.js';
import authMiddleware from '../middleware/auth.Middleware.js'
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.use(authMiddleware)
router.use('/logout',logout)

export default router;

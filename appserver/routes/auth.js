import express from 'express';
import { register, login  } from '../controllers/authController.js';
import  authMiddleware  from '../middleware/auth.Middleware.js'
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.use(authMiddleware)

export default router;

import { register, login, healthCheck } from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', healthCheck);

export default router;

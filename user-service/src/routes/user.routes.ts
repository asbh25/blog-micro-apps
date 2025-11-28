import { register, login, healthCheck, validateJWT } from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', healthCheck);
router.get('/validate/:user_id', validateJWT);

export default router;

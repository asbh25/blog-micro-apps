import { createPost, healthCheck } from '../controllers/post.controller';
import { Router } from 'express';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/post', verifyToken, createPost);
router.get('/', healthCheck);

export default router;

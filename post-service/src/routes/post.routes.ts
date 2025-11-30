import { createPost, healthCheck, getPostsByUser } from '../controllers/post.controller';
import { Router } from 'express';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/post', verifyToken, createPost);
router.get('/posts', verifyToken, getPostsByUser);
router.get('/', healthCheck);

export default router;

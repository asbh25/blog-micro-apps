import { createPost, healthCheck, getPostsByUser, editPost, deletePost } from '../controllers/post.controller';
import { Router } from 'express';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/post', verifyToken, createPost);
router.get('/posts', verifyToken, getPostsByUser);
router.put('/post/:id', verifyToken, editPost);
router.delete('/post/:id', verifyToken, deletePost);

router.get('/', healthCheck);

export default router;

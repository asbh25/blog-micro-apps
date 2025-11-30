import { NextFunction, Request, Response } from 'express';
import { Post } from '../models/post.model';

export const createPost = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const post = new Post({ ...req.body, userId });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
}

export const getPostsByUser = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
}

export const editPost = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const postId = req.params.id;

  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const post = await Post.findOneAndUpdate(
      { _id: postId, userId },
      req.body,
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Post not found or unauthorized' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
}

export const deletePost = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const postId = req.params.id;

  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const post = await Post.findOneAndDelete({ _id: postId, userId });
    if (!post) return res.status(404).json({ message: 'Post not found or unauthorized' });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
}

export const healthCheck = (req: Request, res: Response): void => {
  res.status(200).json({ status: 'Post service is healthy' });
}

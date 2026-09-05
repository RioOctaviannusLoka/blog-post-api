import { Request, Response, NextFunction } from 'express';
import * as postService from '../services/post.service';
import { AppError } from '../utils/AppError';

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await postService.getPosts(page, limit);
    
    res.status(200).json({
      status: 'success',
      data: result.rows,
      meta: {
        total: result.count,
        page,
        limit,
        totalPages: Math.ceil(result.count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await postService.getPostById(Number(req.params.id));
    if (!post) throw new AppError(404, 'Post not found');
    
    res.status(200).json({ status: 'success', data: post });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json({ status: 'success', data: post });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await postService.updatePost(Number(req.params.id), req.body);
    if (!post) throw new AppError(404, 'Post not found');

    res.status(200).json({ status: 'success', data: post });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const success = await postService.deletePost(Number(req.params.id));
    if (!success) throw new AppError(404, 'Post not found');

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

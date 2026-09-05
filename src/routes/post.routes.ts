import { Router } from 'express';
import * as postController from '../controllers/post.controller';
import { validateRequest, postSchema, idParamSchema, paginationQuerySchema } from '../middlewares/validate';

const router = Router();

router.route('/')
  .get(validateRequest(paginationQuerySchema, 'query'),postController.getPosts)
  .post(validateRequest(postSchema, 'body'), postController.createPost);

router.route('/:id')
  .get(validateRequest(idParamSchema, 'params'), postController.getPostById)
  .put(
    validateRequest(idParamSchema, 'params'),
    validateRequest(postSchema, 'body'),
    postController.updatePost)
  .delete(validateRequest(idParamSchema, 'params'), postController.deletePost);

export default router;

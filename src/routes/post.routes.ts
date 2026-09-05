import { Router } from 'express';
import * as postController from '../controllers/post.controller';
import { validateRequest, postSchema } from '../middlewares/validate';

const router = Router();

router.route('/')
  .get(postController.getPosts)
  .post(validateRequest(postSchema), postController.createPost);

router.route('/:id')
  .get(postController.getPostById)
  .put(validateRequest(postSchema), postController.updatePost)
  .delete(postController.deletePost);

export default router;

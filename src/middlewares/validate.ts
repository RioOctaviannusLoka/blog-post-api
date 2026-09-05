import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const postSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').max(255),
  content: z.string().min(1, 'Content cannot be empty'),
});

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: result.error.issues.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
      return; 
    }

    next();
  };
};

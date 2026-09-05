import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Schema for POST/PUT Body
export const postSchema = z.object({
  title: z.string().trim().min(1, 'Title cannot be empty').max(255),
  content: z.string().trim().min(1, 'Content cannot be empty'),
});

// Schema for ID params in URL
export const idParamSchema = z.object({
  id: z.coerce.number({ message: 'ID must be a valid number' }).int().positive(),
});

// Query params validation for pagination
export const paginationQuerySchema = z.object({
  page: z.coerce.number({ message: 'page must be a valid number' }).int().positive().optional().default(1),
  limit: z.coerce.number({ message: 'limit must be a valid number' }).int().positive().optional().default(10),
});

export const validateRequest = (
  schema: z.ZodSchema, 
  target: 'body' | 'params' | 'query' = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

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

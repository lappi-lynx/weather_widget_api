import { Response } from 'express';
import { ZodError } from 'zod';

export const handleErrors = (e: unknown, res: Response): Response => {
  if (e instanceof ZodError) {
    return res.status(400).json({ message: 'Invalid query parameters.', errors: e.errors });
  } else if (e instanceof Error) {
    console.error('Error:', e);
    return res.status(500).json({ message: e.message });
  }
  return res.status(500).json({ message: 'An unexpected error occurred.' });
};

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


// Extend Express Request type to include userId
export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ message: 'Access token required' });
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
      }

      req.userId = decoded.id;
      // console.log(decoded);
      next();
    });
  } catch (error) {
    res.status(500).json({ message: 'Authentication error' });
  }
};
import jwt from 'jsonwebtoken';
export const generateToken = (userId: string): string => {
    const SECRET_KEY = process.env.SECRET_KEY as string;
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
  };
  
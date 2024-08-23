import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key" ;

export function generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
    return jwt.verify(token, JWT_SECRET);
}

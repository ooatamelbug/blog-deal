import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomRequestJwtPayload extends JwtPayload {
  _id: string,
  email: string
}

export interface CustomRequest extends Request {
  user?: any;
  role?: string;
}

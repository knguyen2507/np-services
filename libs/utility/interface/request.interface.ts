import { Request } from 'express';
import { UserInterface } from './user.interface';

export interface RequestWithUser extends Request {
  token: string;
  user: UserInterface;
}

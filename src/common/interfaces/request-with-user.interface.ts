import { Request } from 'express';
import { User } from 'src/api/users/domain/models/user.model';

export type RequestWithUser = Request & {
  user: User;
};

export type RequestWithEmail = Request & {
  user: {
    email: string;
  };
};

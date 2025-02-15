import { HttpStatus } from '@nestjs/common';
import { DomainError } from './domain.error';

export class AlreadyFriendsError extends DomainError {
  constructor(message: string = 'Already friends') {
    super(message, HttpStatus.CONFLICT);
  }
}

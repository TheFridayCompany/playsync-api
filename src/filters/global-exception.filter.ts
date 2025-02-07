import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InvalidObjectIdError } from 'src/common/errors/invalid-object-id.error';
import { UserNotFoundError } from 'src/common/errors/user-not-found.error';
import { UsernameTakenError } from 'src/common/errors/username-taken.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof InvalidObjectIdError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else if (exception instanceof UserNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception instanceof UsernameTakenError) {
      status = HttpStatus.CONFLICT;
      message = exception.message;
    }

    response.status(status).json({ statusCode: status, message });
  }
}

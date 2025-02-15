import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DomainError } from 'src/common/errors/domain.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Check if the exception is a known instance of HttpException or a DomainError
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof DomainError) {
      status = exception.statusCode;
      message = exception.message;
    }

    // Handle unexpected exceptions
    if (
      !(exception instanceof HttpException || exception instanceof DomainError)
    ) {
      console.error('Unexpected error:', exception); // Log unexpected errors for debugging
    }

    // Send the error response
    response.status(status).json({ statusCode: status, message });
  }
}

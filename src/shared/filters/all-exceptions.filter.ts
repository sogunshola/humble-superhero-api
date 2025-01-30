import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorFormat = {
      error: null,
      message: null,
      code: null,
      stack: undefined,
      path: undefined,
      payload: undefined,
    };
    errorFormat.code = status;
    errorFormat.path = ctx.getRequest().url;
    // if (isDev()) {
    errorFormat.stack = exception.stack;
    // errorFormat.payload = ctx.getRequest().body;

    // console.log('stack:', exception.stack);
    // console.log('path:', errorFormat.path);
    // console.log('payload:', ctx.getRequest().body);
    // }

    if (!exception.response) {
      console.log('error is', exception.message);
      errorFormat.message = exception.message;
      errorFormat.error = exception.error;
      return response.status(status).send(errorFormat);
    }

    // Handle 500-related errors
    if (status >= 500) {
      console.log('Internal server error:', exception);
      errorFormat.message = 'Internal server error';
      errorFormat.error = null;
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(errorFormat);
    }

    const data = exception.response;

    errorFormat.message = data.message;
    errorFormat.error = data.error;

    // use fastify's reply.send to send the response
    response.status(status).send(errorFormat);
  }
}

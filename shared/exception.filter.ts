import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

const exceptionResponse = {
  P2025: (exception) => ({
    message: [exception.meta?.cause ?? exception.message],
    statusCode: HttpStatus.BAD_REQUEST,
  }),
  P2002: (exception) => {
    const field = String(exception.meta.target).replace(/^\w/, (c) =>
      c.toUpperCase(),
    );
    return {
      message: [`${field} should be unique`],
      statusCode: HttpStatus.BAD_REQUEST,
    };
  },
};

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  constructor(applicationRef: AbstractHttpAdapter<any, any, any>) {
    super(applicationRef);
  }
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    console.log(exception);

    let responseBody = { message: undefined, statusCode: 500 };
    if (exception instanceof PrismaClientKnownRequestError) {
      const response = ctx.getResponse<Response>();
      responseBody = exceptionResponse[exception.code](exception);
      response.status(responseBody.statusCode).json(responseBody);
    }
    super.catch(exception, host);
  }
}

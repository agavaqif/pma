import { ExceptionFilter, HttpException, HttpStatus, ArgumentsHost, Catch, Logger, BadRequestException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { ErrorCode } from 'src/shared/enums/error-code.enum';
import { CustomException } from 'src/shared/exceptions/custom-exeption.exception';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    Logger.error(`${request.method} ${request.url}`, exception.stack, 'HttpExceptionFilter');
    let code, status;

    switch (true) {
      case exception instanceof CustomException:
        code = (exception as CustomException).getCode();
        status = exception.getStatus();
        break;
      case exception instanceof BadRequestException:
        console.log(exception);
        code = ErrorCode.BADREQUEST;
        status = exception.getStatus();
        break;
      case exception instanceof EntityNotFoundError:
        code = ErrorCode.ENTITYNOTFOUND;
        status = HttpStatus.NOT_FOUND;
        break;
      case exception instanceof UnauthorizedException:
        code = ErrorCode.UNAUTHORIZED;
        status = exception.getStatus();
        break;
      case exception instanceof ForbiddenException:
        code = ErrorCode.FORBIDDEN;
        status = exception.getStatus();
        break;
      case exception instanceof QueryFailedError:
        code = ErrorCode.BADREQUEST;
        status = new BadRequestException().getStatus();
        break;
      default:
        code = ErrorCode.INTERNAL_SERVER_ERROR;
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }
    response.status(status).json({ code: code });
  }
}

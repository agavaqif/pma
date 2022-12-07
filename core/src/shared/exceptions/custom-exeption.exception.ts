import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../enums/error-code.enum';

export class CustomException extends HttpException {
  code: ErrorCode;
  constructor(code: ErrorCode, status: number) {
    super('', status);
    this.code = code;
  }

  getCode() {
    return this.code;
  }
}

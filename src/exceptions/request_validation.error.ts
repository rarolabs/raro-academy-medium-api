import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class RequestValidationError extends HttpException {
    errors: ValidationError[];
    constructor(errors: ValidationError[]) {
        super('bad_request_error', HttpStatus.BAD_REQUEST);
        this.errors = errors;
    }
}

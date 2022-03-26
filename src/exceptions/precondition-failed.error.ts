import { HttpException, HttpStatus } from '@nestjs/common';

export class PreconditionFailedException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.PRECONDITION_FAILED);
    }
}

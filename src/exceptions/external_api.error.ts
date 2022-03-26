import { HttpException, HttpStatus } from '@nestjs/common';

export class ExternalAPIError extends HttpException {
    constructor(message?: string) {
        super(
            message || 'general_error_external_api',
            HttpStatus.FAILED_DEPENDENCY,
        );
    }
}

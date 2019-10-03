import ExtendableError from '@/errors/ExtendableError';

export default class extends ExtendableError {
    constructor(message, exception) {
        super(message);

        this.exception = exception;
    }
}

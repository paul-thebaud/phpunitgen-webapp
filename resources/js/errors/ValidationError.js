import ExtendableError from '@/errors/ExtendableError';

export default class extends ExtendableError {
    constructor(message, errors) {
        super(message);

        this.errors = errors;
    }
}

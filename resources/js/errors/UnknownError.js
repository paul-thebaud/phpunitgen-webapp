import ExtendableError from '@/errors/ExtendableError';

export default class extends ExtendableError {
    constructor(message) {
        super(message);
    }
}

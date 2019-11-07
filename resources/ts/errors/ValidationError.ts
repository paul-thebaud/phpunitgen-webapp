export class ValidationError extends Error {
    protected errors: object;

    public constructor(message: string, errors: object) {
        super(message);

        Object.setPrototypeOf(this, ValidationError.prototype);

        this.errors = errors;
    }

    public getErrors(): object {
        return this.errors;
    }
}

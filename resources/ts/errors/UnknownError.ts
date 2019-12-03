export class UnknownError extends Error {
    protected exception: object;

    public constructor(message: string, exception: object) {
        super(message);

        Object.setPrototypeOf(this, UnknownError.prototype);

        this.exception = exception;
    }

    public getException(): object {
        return this.exception;
    }
}

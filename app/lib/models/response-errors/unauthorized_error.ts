export class UnauthorizedError extends Error {
    status = 401;

    constructor(message = "Unauhtorized") {
        super(message);
        this.name = "Unauthorized Error"
    }
}
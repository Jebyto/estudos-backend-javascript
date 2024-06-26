module.exports = class HttpError extends Error {
    constructor(message, status) {
        super();
        this.status = status;
    }
}
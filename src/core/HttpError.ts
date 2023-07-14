/**
 * HttpError exception.
 */
export class HttpError extends Error {
    public constructor(public status: number) {
        super('An HttpError has occourred');

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}

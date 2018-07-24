class CachekitError extends Error {

    constructor(message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }

}

class LockFailedError extends CachekitError {}

class TimeoutError extends CachekitError {}

module.exports = { LockFailedError, TimeoutError };

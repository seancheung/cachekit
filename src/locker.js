const SYMBOLS = require('./symbols');

class Locker {

    constructor(func) {
        this[SYMBOLS.EXEC] = func;
    }

    release() {
        return this[SYMBOLS.EXEC].call();
    }

}

module.exports = Locker;

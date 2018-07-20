const SYMBOLS = require('./symbols');

class Cursor {

    constructor(exec, options) {
        this[SYMBOLS.EXEC] = exec;
        this[SYMBOLS.OPTIONS] = options;
    }

    get next() {
        return this[SYMBOLS.CURSOR] === undefined || this[SYMBOLS.CURSOR] > 0;
    }

    get cursor() {
        return this[SYMBOLS.CURSOR];
    }

    async fetch() {
        if (this.next) {
            const [cursor, res] = await this[SYMBOLS.EXEC].call(
                null,
                this[SYMBOLS.CURSOR] || 0,
                this[SYMBOLS.OPTIONS]
            );
            this[SYMBOLS.CURSOR] = cursor;

            return res;
        }
    }

}

module.exports = Cursor;

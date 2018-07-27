const SYMBOLS = require('./symbols');
const injection = require('./injection');

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

    fetch() {
        if (this.next) {
            return this[SYMBOLS.EXEC]
                .call(null, this[SYMBOLS.CURSOR] || 0, this[SYMBOLS.OPTIONS])
                .then(([cursor, res]) => {
                    this[SYMBOLS.CURSOR] = cursor;

                    return res;
                });
        }

        return injection.Promise.resolve();
    }

}

module.exports = Cursor;

const SYMBOLS = require('./symbols');
const Query = require('./query');
const wrapper = require('./wrapper');

class Multi extends Query {

    constructor(driver, prefix) {
        super(driver, prefix);
        this[SYMBOLS.PARSERS] = [];
        this[SYMBOLS.WRAPPER] = wrapper(this);
    }

    exec(parse) {
        return this.wrapper.exec(this.driver.exec, parse);
    }

    discard() {
        return this.wrapper.ok(this.driver.discard);
    }

}

module.exports = Multi;

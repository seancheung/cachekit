const { RedisClient } = require('redis');
const SYMBOLS = require('./symbols');
const Query = require('./query');
const Multi = require('./multi');
const wrapper = require('./wrapper');

class Cache extends Query {

    constructor(options) {
        let prefix;
        if (options.prefix) {
            prefix = options.prefix;
        }
        const redis = new RedisClient(options);
        super(redis, prefix);
        this[SYMBOLS.WRAPPER] = wrapper(this);
    }

    multi() {
        return new Multi(this.driver.multi(), this.prefix);
    }

    scriptload(script) {
        return this.wrapper.plain(this.driver.script, 'load', script);
    }

    scriptexists(...sha1s) {
        return this.wrapper.success(this.driver.script, 'exists', ...sha1s);
    }

    scriptflush() {
        return this.wrapper.ok(this.driver.script, 'flush');
    }

    scriptkill() {
        return this.wrapper.ok(this.driver.script, 'kill');
    }

    scriptdebug(mode) {
        return this.wrapper.ok(this.driver.script, 'debug', mode);
    }

    quit() {
        return this.wrapper.ok(this.driver.quit);
    }

    close() {
        return this.quit();
    }

}

Cache.Query = Query;
Cache.Multi = Multi;

module.exports = Cache;

const { RedisClient } = require('redis');
const SYMBOLS = require('./symbols');
const Query = require('./query');
const Multi = require('./multi');
const { LockFailedError, TimeoutError } = require('./errors');
const Locker = require('./locker');
const wrapper = require('./wrapper');
const injection = require('./injection');
const utils = require('./utils');

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

    lock(key, timeout, cb) {
        if (!timeout || !cb) {
            return this.set(key, Date.now(), { flag: 'NX' }).then(success => {
                if (!success) {
                    throw new LockFailedError();
                }

                return new Locker(() => this.del(key));
            });
        }
        const tm = new injection.Promise((resolve, reject) => {
            const id = setTimeout(() => {
                clearTimeout(id);
                reject(new TimeoutError());
            }, timeout);
        });

        let locked;
        const exec = this.set(key, Date.now(), {
            flag: 'NX',
            mode: 'PX',
            duration: timeout
        })
            .then(success => {
                if (!success) {
                    throw new LockFailedError();
                }
                locked = true;

                return cb.call(null, this);
            })
            .then(res => {
                if (locked) {
                    return this.del(key).then(() => res);
                }
            })
            .catch(err => {
                if (locked) {
                    return this.del(key).then(() => {
                        throw err;
                    });
                }
                throw err;
            });

        return injection.Promise.race([exec, tm]);
    }

    mlock(key, timeout, cb) {
        const tm = new injection.Promise((resolve, reject) => {
            const id = setTimeout(() => {
                clearTimeout(id);
                reject(new TimeoutError());
            }, timeout);
        });

        let locked, multi;
        const exec = this.set(key, Date.now(), {
            flag: 'NX',
            mode: 'PX',
            duration: timeout
        })
            .then(success => {
                if (!success) {
                    throw new LockFailedError();
                }
                locked = true;
                multi = this.multi();

                return cb.call(null, multi);
            })
            .then(() => {
                if (locked) {
                    return multi.exec(true);
                }
            })
            .then(res => {
                if (locked) {
                    return this.del(key).then(() => res);
                }
            })
            .catch(err => {
                if (locked) {
                    if (multi) {
                        return multi.discard().then(() => {
                            throw err;
                        });
                    }
                }
                throw err;
            })
            .catch(err => {
                if (locked) {
                    return this.del(key).then(() => {
                        throw err;
                    });
                }
                throw err;
            });

        return injection.Promise.race([exec, tm]);
    }

    ensure(key, fallback, options) {
        return this.wrapper.value(this.driver.get, key).then(res => {
            if (res == null && fallback != null) {
                if (typeof fallback === 'function') {
                    fallback = fallback.call();
                }

                return injection.Promise.resolve(fallback).then(value => {
                    if (value === undefined) {
                        throw new Error(
                            'missing return value from fallback function'
                        );
                    }
                    value = utils.serialize(value);
                    options = utils.opts(options);

                    return this.wrapper
                        .ok(this.driver.set, key, value, ...options)
                        .then(() => utils.deserialize(value));
                });
            }

            return res;
        });
    }

    quit() {
        return this.wrapper.ok(this.driver.quit);
    }

    close() {
        return this.quit();
    }

    static get Promise() {
        return injection.Promise;
    }

    static set Promise(value) {
        injection.Promise = value;
    }

}

Cache.Query = Query;
Cache.Multi = Multi;
Cache.LockFailedError = LockFailedError;

module.exports = Cache;

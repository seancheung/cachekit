const SYMBOLS = require('./symbols');
const SCRIPTS = require('./scripts');
const Cursor = require('./cursor');
const utils = require('./utils');

class Query {

    constructor(driver, prefix) {
        this[SYMBOLS.DRIVER] = driver;
        this[SYMBOLS.PREFIX] = prefix;
    }

    get driver() {
        return this[SYMBOLS.DRIVER];
    }

    get prefix() {
        return this[SYMBOLS.PREFIX];
    }

    get wrapper() {
        return this[SYMBOLS.WRAPPER];
    }

    keys(pattern) {
        pattern = utils.format(this.prefix, pattern);

        return this.wrapper.plain(this.driver.keys, pattern);
    }

    count(pattern) {
        pattern = utils.format(this.prefix, pattern);

        return this.wrapper.plain(this.driver.eval, SCRIPTS.COUNT, 0, pattern);
    }

    get(key) {
        return this.wrapper.value(this.driver.get, key);
    }

    set(key, value, options) {
        value = utils.serialize(value);
        options = utils.opts(options);

        return this.wrapper.ok(this.driver.set, key, value, ...options);
    }

    setnx(key, value) {
        value = utils.serialize(value);

        return this.wrapper.success(this.driver.setnx, key, value);
    }

    setx(key, value) {
        value = utils.serialize(value);

        return this.wrapper.ok(this.driver.eval, SCRIPTS.SETX, 1, key, value);
    }

    mset(pairs) {
        pairs = utils.pairs(pairs);

        return this.wrapper.ok(this.driver.mset, ...pairs);
    }

    msetnx(pairs) {
        pairs = utils.pairs(pairs);

        return this.wrapper.success(this.driver.msetnx, ...pairs);
    }

    expire(key, sec) {
        return this.wrapper.success(this.driver.expire, key, sec);
    }

    persist(key) {
        return this.wrapper.success(this.driver.persist, key);
    }

    ttl(key) {
        return this.wrapper.plain(this.driver.ttl, key);
    }

    touch(...keys) {
        return this.wrapper.plain(this.driver.touch, ...keys);
    }

    exists(...keys) {
        return this.wrapper.plain(this.driver.exists, ...keys);
    }

    getset(key, value) {
        value = utils.serialize(value);

        return this.wrapper.value(this.driver.getset, key, value);
    }

    mget(keys) {
        return this.wrapper.array(this.driver.mget, ...keys);
    }

    incr(key) {
        return this.wrapper.plain(this.driver.incr, key);
    }

    incrby(key, increment) {
        return this.wrapper.plain(this.driver.incrby, key, increment);
    }

    decrby(key, decrement) {
        return this.wrapper.plain(this.driver.decrby, key, decrement);
    }

    decr(key) {
        return this.wrapper.plain(this.driver.decr, key);
    }

    incrbyfloat(key, increment) {
        return this.wrapper.plain(this.driver.incrbyfloat, key, increment);
    }

    scan(cursor, options) {
        options = utils.page(options);

        return this.wrapper.paginate(this.driver.scan, cursor, ...options);
    }

    scanq(options) {
        return new Cursor(this.scan.bind(this), options);
    }

    del(...keys) {
        return this.wrapper.plain(this.driver.del, ...keys);
    }

    hset(key, field, value) {
        value = utils.serialize(value);

        return this.wrapper.success(this.driver.hset, key, field, value);
    }

    hmset(key, pairs) {
        pairs = utils.pairs(pairs);

        return this.wrapper.ok(this.driver.hmset, key, ...pairs);
    }

    hsetnx(key, field, value) {
        value = utils.serialize(value);

        return this.wrapper.success(this.driver.hsetnx, key, field, value);
    }

    hget(key, field) {
        return this.wrapper.value(this.driver.hget, key, field);
    }

    hgetall(key) {
        return this.wrapper.map(this.driver.hgetall, key);
    }

    hlen(key) {
        return this.wrapper.plain(this.driver.hlen, key);
    }

    hkeys(key) {
        return this.wrapper.plain(this.driver.hkeys, key);
    }

    hmget(key, fields) {
        return this.wrapper.array(this.driver.hmget, key, ...fields);
    }

    hexists(key, field) {
        return this.wrapper.success(this.driver.hexists, key, field);
    }

    hincrby(key, field, increment) {
        return this.wrapper.plain(this.driver.hincrby, key, field, increment);
    }

    hincrbyfloat(key, field, increment) {
        return this.wrapper.plain(
            this.driver.hincrbyfloat,
            key,
            field,
            increment
        );
    }

    hscan(key, cursor, options) {
        options = utils.page(options);

        return this.wrapper.mpaginate(
            this.driver.hscan,
            key,
            cursor,
            ...options
        );
    }

    hscanq(key, options) {
        return new Cursor(this.hscan.bind(this, key), options);
    }

    hdel(key, ...fields) {
        return this.wrapper.plain(this.driver.hdel, key, ...fields);
    }

    sadd(key, ...members) {
        members = utils.aserialize(members);

        return this.wrapper.plain(this.driver.sadd, key, ...members);
    }

    srem(key, ...members) {
        members = utils.aserialize(members);

        return this.wrapper.plain(this.driver.srem, key, ...members);
    }

    scard(key) {
        return this.wrapper.plain(this.driver.scard, key);
    }

    smembers(key) {
        return this.wrapper.array(this.driver.smembers, key);
    }

    sismember(key, member) {
        member = utils.serialize(member);

        return this.wrapper.success(this.driver.sismember, key, member);
    }

    sscan(key, cursor, options) {
        options = utils.page(options);

        return this.wrapper.spaginate(
            this.driver.sscan,
            key,
            cursor,
            ...options
        );
    }

    sscanq(key, options) {
        return new Cursor(this.sscan.bind(this, key), options);
    }

    zadd(key, pairs, options) {
        pairs = utils.pairs(pairs);
        options = utils.opts(options);

        return this.wrapper.number(this.driver.zadd, key, ...options, ...pairs);
    }

    zrem(key, ...members) {
        members = utils.aserialize(members);

        return this.wrapper.plain(this.driver.zrem, key, ...members);
    }

    zscore(key, member) {
        member = utils.serialize(member);

        return this.wrapper.number(this.driver.zscore, key, member);
    }

    zrank(key, member) {
        member = utils.serialize(member);

        return this.wrapper.plain(this.driver.zrank, key, member);
    }

    zrevrank(key, member) {
        member = utils.serialize(member);

        return this.wrapper.plain(this.driver.zrevrank, key, member);
    }

    zmscore(key, members) {
        members = utils.aserialize(members);

        return this.wrapper.anumber(
            this.driver.eval,
            SCRIPTS.ZMSCORE,
            1,
            key,
            ...members
        );
    }

    zcard(key) {
        return this.wrapper.plain(this.driver.zcard, key);
    }

    zcount(key, min, max) {
        [min, max] = utils.minmax(min, max);

        return this.wrapper.plain(this.driver.zcount, key, min, max);
    }

    zremrangebyscore(key, min, max) {
        [min, max] = utils.minmax(min, max);

        return this.wrapper.plain(this.driver.zremrangebyscore, key, min, max);
    }

    zrange(key, start, stop, options) {
        [start, stop] = utils.startstop(start, stop);
        options = utils.opts(options);

        if (options.includes('WITHSCORES')) {
            return this.wrapper.scores(
                this.driver.zrange,
                key,
                start,
                stop,
                ...options
            );
        }

        return this.wrapper.array(
            this.driver.zrange,
            key,
            start,
            stop,
            ...options
        );
    }

    zrevrange(key, start, stop, options) {
        [start, stop] = utils.startstop(start, stop);
        options = utils.opts(options);

        if (options.includes('WITHSCORES')) {
            return this.wrapper.scores(
                this.driver.zrevrange,
                key,
                start,
                stop,
                ...options
            );
        }

        return this.wrapper.array(
            this.driver.zrevrange,
            key,
            start,
            stop,
            ...options
        );
    }

    zrangebyscore(key, min, max, options) {
        [min, max] = utils.minmax(min, max);
        options = utils.opts(options);

        if (options.includes('WITHSCORES')) {
            return this.wrapper.scores(
                this.driver.zrangebyscore,
                key,
                min,
                max,
                ...options
            );
        }

        return this.wrapper.array(
            this.driver.zrangebyscore,
            key,
            min,
            max,
            ...options
        );
    }

    zrevrangebyscore(key, max, min, options) {
        [min, max] = utils.minmax(min, max);
        options = utils.opts(options);

        if (options.includes('WITHSCORES')) {
            return this.wrapper.scores(
                this.driver.zrevrangebyscore,
                key,
                max,
                min,
                ...options
            );
        }

        return this.wrapper.array(
            this.driver.zrevrangebyscore,
            key,
            max,
            min,
            ...options
        );
    }

    zscan(key, cursor, options) {
        options = utils.page(options);

        return this.wrapper.apaginate(
            this.driver.zscan,
            key,
            cursor,
            ...options
        );
    }

    zscanq(key, options) {
        return new Cursor(this.zscan.bind(this, key), options);
    }

    jget(key, path) {
        path = utils.jpath(path);

        return this.wrapper.value(
            this.driver.eval,
            SCRIPTS.JGET,
            1,
            key,
            ...path
        );
    }

    jset(key, path, value) {
        path = utils.jpath(path);
        value = utils.serialize(value);

        return this.wrapper.ok(
            this.driver.eval,
            SCRIPTS.JSET,
            1,
            key,
            ...path,
            value
        );
    }

    hjget(key, field, path) {
        path = utils.jpath(path);

        return this.wrapper.value(
            this.driver.eval,
            SCRIPTS.HJGET,
            1,
            key,
            field,
            ...path
        );
    }

    hjset(key, field, path, value) {
        path = utils.jpath(path);
        value = utils.serialize(value);

        return this.wrapper.ok(
            this.driver.eval,
            SCRIPTS.HJSET,
            1,
            key,
            field,
            ...path,
            value
        );
    }

    flush(pattern) {
        pattern = utils.format(this.prefix, pattern);

        return this.wrapper.plain(this.driver.eval, SCRIPTS.FLUSH, 0, pattern);
    }

    eval(lua, options) {
        const { args = [], keys = [] } = options || {};

        return this.wrapper.plain(
            this.driver.eval,
            lua,
            keys.length,
            ...keys,
            ...args
        );
    }

    evalsha(sha1, options) {
        const { args = [], keys = [] } = options || {};

        return this.wrapper.plain(
            this.driver.evalsha,
            sha1,
            keys.length,
            ...keys,
            ...args
        );
    }

}

Query.Cursor = Cursor;

module.exports = Query;

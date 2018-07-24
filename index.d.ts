import { ClientOpts } from 'redis';

declare class Cache {
    /**
     * Create a cache instance.
     */
    constructor(options: Cache.CacheOptions);

    /**
     * Find all keys matching the given pattern.
     */
    keys(pattern?: string): Promise<string[]>;
    /**
     * Count all keys matching the given pattern.
     */
    count(pattern?: string): Promise<number>;
    /**
     * Get the value of a key.
     */
    get(key: string): Promise<any>;
    /**
     * Set the value of a key.
     */
    set(key: string, value: any, options?: Cache.SetOptions): Promise<boolean>;
    /**
     * Set the value of a key, only if the key does not exist.
     */
    setnx(key: string, value: any): Promise<boolean>;
    /**
     * Set the value of a key, only if the key exists. This does not affect ttl.
     */
    setx(key: string, value: any): Promise<boolean>;
    /**
     * Set multiple keys to multiple values.
     */
    mset(pairs: Cache.BatchSet<string, any>): Promise<boolean>;
    /**
     * Set multiple keys to multiple values, only if none of the keys exist.
     */
    msetnx(pairs: Cache.BatchSet<string, any>): Promise<boolean>;
    /**
     * Set a key's time to live in seconds.
     */
    expire(key: string, sec: number): Promise<boolean>;
    /**
     * Remove the expiration from a key.
     */
    persist(key: string): Promise<boolean>;
    /**
     * Get the time to live for a key.
     */
    ttl(key: string): Promise<number>;
    /**
     * Alters the last access time of a key(s). Returns the number of existing keys specified.
     */
    touch(...keys: string[]): Promise<number>;
    /**
     * Determine if a key exists.
     */
    exists(...keys: string[]): Promise<number>;
    /**
     * Set the value of a key and return its old value.
     */
    getset(key: string, value: any): Promise<any>;
    /**
     * Get the values of all the given keys.
     */
    mget(keys: string[]): Promise<any[]>;
    /**
     * Increment the integer value of a key by one.
     */
    incr(key: string): Promise<number>;
    /**
     * Decrement the integer value of a key by one.
     */
    decr(key: string): Promise<number>;
    /**
     * Increment the integer value of a key by the given amount.
     */
    incrby(key: string, increment: number): Promise<number>;
    /**
     * Decrement the integer value of a key by the given number.
     */
    decrby(key: string, decrement: number): Promise<number>;
    /**
     * Increment the float value of a key by the given amount.
     */
    incrbyfloat(key: string, increment: number): Promise<number>;
    /**
     * Incrementally iterate the keys space.
     */
    scan(
        cursor: number,
        options?: Cache.CursorOptions
    ): Promise<[number, any[]]>;
    /**
     * Incrementally iterate the keys space with a wrapped cursor object.
     */
    scanq(options?: Cache.CursorOptions): Cache.Query.Cursor<any[]>;
    /**
     * Delete a key.
     */
    del(...keys: string[]): Promise<number>;
    /**
     * Set the string value of a hash field.
     */
    hset(key: string, field: string, value: any): Promise<boolean>;
    /**
     * Set multiple hash fields to multiple values.
     */
    hmset(key: string, pairs: Cache.BatchSet<string, any>): Promise<boolean>;
    /**
     * Set the value of a hash field, only if the field does not exist.
     */
    hsetnx(key: string, field: string, value: any): Promise<boolean>;
    /**
     * Get the value of a hash field.
     */
    hget(key: string, field: string): Promise<any>;
    /**
     * Get all the fields and values in a hash.
     */
    hgetall(key: string): Promise<Map<string, any>>;
    /**
     * Get the number of fields in a hash.
     */
    hlen(key: string): Promise<number>;
    /**
     * Get all the fields in a hash.
     */
    hkeys(key: string): Promise<string[]>;
    /**
     * Get the values of all the given hash fields.
     */
    hmget(key: string, fields: string[]): Promise<any[]>;
    /**
     * Determine if a hash field exists.
     */
    hexists(key: string, field: string): Promise<boolean>;
    /**
     * Increment the integer value of a hash field by the given number.
     */
    hincrby(key: string, field: string, increment: number): Promise<number>;
    /**
     * Increment the float value of a hash field by the given amount.
     */
    hincrbyfloat(
        key: string,
        field: string,
        increment: number
    ): Promise<number>;
    /**
     * Incrementally iterate hash fields and associated values.
     */
    hscan(
        key: string,
        cursor: number,
        options?: Cache.CursorOptions
    ): Promise<[number, Map<string, any>]>;
    /**
     * Incrementally iterate hash fields and associated values with a wrapped cursor object.
     */
    hscanq(
        key: string,
        options?: Cache.CursorOptions
    ): Cache.Query.Cursor<Map<string, any>>;
    /**
     * Delete one or more hash fields.
     */
    hdel(key: string, ...fields: string[]): Promise<number>;
    /**
     * Add one or more members to a set.
     */
    sadd(key: string, ...members: any[]): Promise<number>;
    /**
     * Remove one or more members from a set.
     */
    srem(key: string, ...members: any[]): Promise<number>;
    /**
     * Get the number of members in a set.
     */
    scard(key: string): Promise<number>;
    /**
     * Get all the members in a set.
     */
    smembers(key: string): Promise<any>;
    /**
     * Determine if a given value is a member of a set.
     */
    sismember(key: string, member: any): Promise<boolean>;
    /**
     * Incrementally iterate Set elements.
     */
    sscan(
        key: string,
        cursor: number,
        options?: Cache.CursorOptions
    ): Promise<[number, Set<any>]>;
    /**
     * Incrementally iterate Set elements with a wrapped cursor object.
     */
    sscanq(
        key: string,
        options?: Cache.CursorOptions
    ): Cache.Query.Cursor<Set<any>>;
    /**
     * Add one or more members to a sorted set, or update its score if it already exists.
     */
    zadd(
        key: string,
        pairs: Cache.BatchSet<number, any>,
        options?: Cache.ZAddOptions
    ): Promise<number>;
    /**
     * Remove one or more members from a sorted set.
     */
    zrem(key: string, ...members: any[]): Promise<number>;
    /**
     * Get the score associated with the given member in a sorted set.
     */
    zscore(key: string, member: any): Promise<number>;
    /**
     * Determine the index of a member in a sorted set.
     */
    zrank(key: string, member: any): Promise<number>;
    /**
     * Determine the index of a member in a sorted set, with scores ordered from high to low.
     */
    zrevrank(key: string, member: any): Promise<number>;
    /**
     * Get the scorea associated with the given members in a sorted set.
     */
    zmscore(key: string, members: any[]): Promise<number[]>;
    /**
     * Get the number of members in a sorted set.
     */
    zcard(key: string): Promise<number>;
    /**
     * Count the members in a sorted set with scores within the given values.
     */
    zcount(
        key: string,
        min?: number | string,
        max?: number | string
    ): Promise<number>;
    /**
     * Remove all members in a sorted set within the given scores.
     */
    zremrangebyscore(
        key: string,
        min?: number | string,
        max?: number | string
    ): Promise<number>;
    /**
     * Return a range of members in a sorted set, by index.
     */
    zrange(
        key: string,
        start?: number,
        stop?: number,
        options?: Cache.ZRangeOptions
    ): Promise<any[] | [any, number][]>;
    /**
     * Return a range of members in a sorted set, by index, with scores ordered from high to low.
     */
    zrevrange(
        key: string,
        start?: number,
        stop?: number,
        options?: Cache.ZRangeOptions
    ): Promise<any[] | [any, number][]>;
    /**
     * Return a range of members in a sorted set, by score.
     */
    zrangebyscore(
        key: string,
        min?: number | string,
        max?: number | string,
        options?: Cache.ZRangeScoreOptions
    ): Promise<any[] | [any, number][]>;
    /**
     * Return a range of members in a sorted set, by score, with scores ordered from high to low.
     */
    zrevrangebyscore(
        key: string,
        max?: number | string,
        min?: number | string,
        options?: Cache.ZRangeScoreOptions
    ): Promise<any[] | [any, number][]>;
    /**
     * Incrementally iterate sorted sets elements and associated scores.
     */
    zscan(
        key: string,
        cursor: number,
        options?: Cache.CursorOptions
    ): Promise<[number, Array<[any, number]>]>;
    /**
     * Incrementally iterate sorted sets elements and associated scores with a wrapped cursor object.
     */
    zscanq(
        key: string,
        options?: Cache.CursorOptions
    ): Cache.Query.Cursor<Array<[any, number]>>;
    /**
     * Get value of a json object field by path.
     */
    jget(key: string, path: string | Array<string | number>): Promise<any>;
    /**
     * Set value of a json object field by path.
     */
    jset(
        key: string,
        path: string | Array<string | number>,
        value: any
    ): Promise<boolean>;
    /**
     * Get value of a json object field by path in a hash field.
     */
    hjget(
        key: string,
        field: string,
        path: string | Array<string | number>
    ): Promise<any>;
    /**
     * Set value of a json object field by path in a hash field.
     */
    hjset(
        key: string,
        field: string,
        path: string | Array<string | number>,
        value: any
    ): Promise<boolean>;
    /**
     * Remove all keys matching the given pattern.
     */
    flush(pattern?: string): Promise<number>;
    /**
     * Execute a Lua script server side.
     */
    eval(lua: string, options?: Cache.EvalOptions): Promise<any>;
    /**
     * Execute a Lua script server side.
     */
    evalsha(sha1: string, options?: Cache.EvalOptions): Promise<any>;

    /**
     * Marks the start of a transaction block.
     */
    multi(): Cache.Multi;

    /**
     * Load the specified Lua script into the script cache.
     */
    scriptload(script: string): Promise<string>;

    /**
     * Check existence of scripts in the script cache.
     */
    scriptexists(...sha1s: string[]): Promise<boolean[]>;

    /**
     * Remove all the scripts from the script cache.
     */
    scriptflush(): Promise<boolean>;

    /**
     * Kill the script currently in execution.
     */
    scriptkill(): Promise<boolean>;

    /**
     * Set the debug mode for executed scripts.
     */
    scriptdebug(): Promise<boolean>;

    /**
     * Allocate a lock. If success, return a wrapped locker object(You'll need to manually call 'Locker.release()').
     *
     * Otherwise 'LockFailedError' will be thrown.
     * 
     * @param key lock key
     */
    lock(key: string): Promise<Cache.Locker>;

    /**
     * Allocate a lock. If success, execute the callback function.
     *
     * Otherwise 'LockFailedError' will be thrown.
     * 
     * If timeout after allocate success, 'TimeoutError' will be thrown and the callback will be aborted.
     * 
     * Returns the callback result.
     * 
     * @param key lock key
     * @param timeout timeout in milliseconds
     * @param cb callback
     */
    lock(key: string, timeout: number, cb: (cache: Cache) => any): Promise<any[]>;
    
    /**
     * Allocate a lock. If success, execute the callback function with a multi object.
     *
     * Otherwise 'LockFailedError' will be thrown.
     * 
     * If timeout after allocate success, 'TimeoutError' will be thrown and the callback will be aborted.
     * 
     * Returns the multi exec results;
     * 
     * @param key lock key
     * @param timeout timeout in milliseconds
     * @param cb callback
     */
    mlock(key: string, timeout: number, cb: (multi: Cache.Multi) => void): Promise<any[]>;

    /**
     * Close the connection.
     */
    quit(): Promise<boolean>;

    /**
     * Alias for 'quit'.
     */
    close(): Promise<boolean>;

    static Promise: typeof Promise;
}

declare namespace Cache {
    interface CacheOptions extends ClientOpts {}

    interface FlagOptions {
        flag?: 'NX' | 'XX';
    }

    interface DurationOptions {
        mode?: 'EX' | 'PX';
        duration?: number;
    }

    interface SetOptions extends DurationOptions, FlagOptions {}

    interface ZAddOptions extends FlagOptions {
        ch?: boolean;
        incr?: boolean;
    }

    interface ZRangeOptions {
        withscores?: boolean;
    }

    interface PaginationOptions {
        count?: number;
        offset?: number;
    }

    interface ZRangeScoreOptions extends ZRangeOptions, PaginationOptions {}

    interface CursorOptions {
        count?: number;
        pattern?: string;
    }

    interface EvalOptions {
        args?: any[];
        keys?: any[];
    }

    type BatchSet<T, U> = [T, U] | Array<[T, U]>;

    abstract class Query {}

    namespace Query {
        class Cursor<T> {
            /**
             * Can continue iteration.
             */
            readonly next: boolean;

            /**
             * Continue iteration.
             */
            fetch(): Promise<T>;
        }
    }

    class Multi extends Query {
        /**
         * Find all keys matching the given pattern.
         */
        keys(pattern?: string): this;
        /**
         * Count all keys matching the given pattern.
         */
        count(pattern?: string): this;
        /**
         * Get the value of a key.
         */
        get(key: string): this;
        /**
         * Set the value of a key.
         */
        set(key: string, value: any, options?: SetOptions): this;
        /**
         * Set the value of a key, only if the key does not exist.
         */
        setnx(key: string, value: any): this;
        /**
         * Set the value of a key, only if the key exists. This does not affect ttl.
         */
        setx(key: string, value: any): this;
        /**
         * Set multiple keys to multiple values.
         */
        mset(pairs: BatchSet<string, any>): this;
        /**
         * Set multiple keys to multiple values, only if none of the keys exist.
         */
        msetnx(pairs: BatchSet<string, any>): this;
        /**
         * Set a key's time to live in seconds.
         */
        expire(key: string, sec: number): this;
        /**
         * Remove the expiration from a key.
         */
        persist(key: string): this;
        /**
         * Get the time to live for a key.
         */
        ttl(key: string): this;
        /**
         * Alters the last access time of a key(s). Returns the number of existing keys specified.
         */
        touch(...keys: string[]): this;
        /**
         * Determine if a key exists.
         */
        exists(...keys: string[]): this;
        /**
         * Set the value of a key and return its old value.
         */
        getset(key: string, value: any): this;
        /**
         * Get the values of all the given keys.
         */
        mget(keys: string[]): this;
        /**
         * Increment the integer value of a key by one.
         */
        incr(key: string): this;
        /**
         * Decrement the integer value of a key by one.
         */
        decr(key: string): this;
        /**
         * Increment the integer value of a key by the given amount.
         */
        incrby(key: string, increment: number): this;
        /**
         * Decrement the integer value of a key by the given number.
         */
        decrby(key: string, decrement: number): this;
        /**
         * Increment the float value of a key by the given amount.
         */
        incrbyfloat(key: string, increment: number): this;
        /**
         * Incrementally iterate the keys space.
         */
        scan(cursor: number, options?: CursorOptions): this;
        /**
         * Incrementally iterate the keys space with a wrapped cursor object.
         */
        scanq(options?: CursorOptions): Query.Cursor<any[]>;
        /**
         * Delete a key.
         */
        del(...keys: string[]): this;
        /**
         * Set the string value of a hash field.
         */
        hset(key: string, field: string, value: any): this;
        /**
         * Set multiple hash fields to multiple values.
         */
        hmset(key: string, pairs: BatchSet<string, any>): this;
        /**
         * Set the value of a hash field, only if the field does not exist.
         */
        hsetnx(key: string, field: string, value: any): this;
        /**
         * Get the value of a hash field.
         */
        hget(key: string, field: string): this;
        /**
         * Get all the fields and values in a hash.
         */
        hgetall(key: string): this;
        /**
         * Get the number of fields in a hash.
         */
        hlen(key: string): this;
        /**
         * Get all the fields in a hash.
         */
        hkeys(key: string): this;
        /**
         * Get the values of all the given hash fields.
         */
        hmget(key: string, fields: string[]): this;
        /**
         * Determine if a hash field exists.
         */
        hexists(key: string, field: string): this;
        /**
         * Increment the integer value of a hash field by the given number.
         */
        hincrby(key: string, field: string, increment: number): this;
        /**
         * Increment the float value of a hash field by the given amount.
         */
        hincrbyfloat(key: string, field: string, increment: number): this;
        /**
         * Incrementally iterate hash fields and associated values.
         */
        hscan(key: string, cursor: number, options?: CursorOptions): this;
        /**
         * Incrementally iterate hash fields and associated values with a wrapped cursor object.
         */
        hscanq(
            key: string,
            options?: CursorOptions
        ): Query.Cursor<Map<string, any>>;
        /**
         * Delete one or more hash fields.
         */
        hdel(key: string, ...fields: string[]): this;
        /**
         * Add one or more members to a set.
         */
        sadd(key: string, ...members: any[]): this;
        /**
         * Remove one or more members from a set.
         */
        srem(key: string, ...members: any[]): this;
        /**
         * Get the number of members in a set.
         */
        scard(key: string): this;
        /**
         * Get all the members in a set.
         */
        smembers(key: string): this;
        /**
         * Determine if a given value is a member of a set.
         */
        sismember(key: string, member: any): this;
        /**
         * Incrementally iterate Set elements.
         */
        sscan(key: string, cursor: number, options?: CursorOptions): this;
        /**
         * Incrementally iterate Set elements with a wrapped cursor object.
         */
        sscanq(key: string, options?: CursorOptions): Query.Cursor<Set<any>>;
        /**
         * Add one or more members to a sorted set, or update its score if it already exists.
         */
        zadd(
            key: string,
            pairs: BatchSet<number, any>,
            options?: ZAddOptions
        ): this;
        /**
         * Remove one or more members from a sorted set.
         */
        zrem(key: string, ...members: any[]): this;
        /**
         * Get the score associated with the given member in a sorted set.
         */
        zscore(key: string, member: any): this;
        /**
         * Determine the index of a member in a sorted set.
         */
        zrank(key: string, member: any): this;
        /**
         * Determine the index of a member in a sorted set, with scores ordered from high to low.
         */
        zrevrank(key: string, member: any): this;
        /**
         * Get the scorea associated with the given members in a sorted set.
         */
        zmscore(key: string, members: any[]): this;
        /**
         * Get the number of members in a sorted set.
         */
        zcard(key: string): this;
        /**
         * Count the members in a sorted set with scores within the given values.
         */
        zcount(key: string, min?: number | string, max?: number | string): this;
        /**
         * Remove all members in a sorted set within the given scores.
         */
        zremrangebyscore(
            key: string,
            min?: number | string,
            max?: number | string
        ): this;
        /**
         * Return a range of members in a sorted set, by index.
         */
        zrange(
            key: string,
            start?: number,
            stop?: number,
            options?: ZRangeOptions
        ): this;
        /**
         * Return a range of members in a sorted set, by index, with scores ordered from high to low.
         */
        zrevrange(
            key: string,
            start?: number,
            stop?: number,
            options?: ZRangeOptions
        ): this;
        /**
         * Return a range of members in a sorted set, by score.
         */
        zrangebyscore(
            key: string,
            min?: number | string,
            max?: number | string,
            options?: ZRangeScoreOptions
        ): this;
        /**
         * Return a range of members in a sorted set, by score, with scores ordered from high to low.
         */
        zrevrangebyscore(
            key: string,
            max?: number | string,
            min?: number | string,
            options?: ZRangeScoreOptions
        ): this;
        /**
         * Incrementally iterate sorted sets elements and associated scores.
         */
        zscan(key: string, cursor: number, options?: CursorOptions): this;
        /**
         * Incrementally iterate sorted sets elements and associated scores with a wrapped cursor object.
         */
        zscanq(
            key: string,
            options?: CursorOptions
        ): Query.Cursor<Array<[any, number]>>;
        /**
         * Get value of a json object field by path.
         */
        jget(key: string, path: string | Array<string | number>): this;
        /**
         * Set value of a json object field by path.
         */
        jset(
            key: string,
            path: string | Array<string | number>,
            value: any
        ): this;
        /**
         * Get value of a json object field by path in a hash field.
         */
        hjget(
            key: string,
            field: string,
            path: string | Array<string | number>
        ): this;
        /**
         * Set value of a json object field by path in a hash field.
         */
        hjset(
            key: string,
            field: string,
            path: string | Array<string | number>,
            value: any
        ): this;
        /**
         * Remove all keys matching the given pattern.
         */
        flush(pattern?: string): this;
        /**
         * Execute a Lua script server side.
         */
        eval(lua: string, options?: EvalOptions): this;
        /**
         * Execute a Lua script server side.
         */
        evalsha(sha1: string, options?: EvalOptions): this;

        /**
         * Execute all commands issued after 'multi'.
         */
        exec(): Promise<void>;

        /**
         * Execute all commands issued after 'multi'. Return parsed results.
         */
        exec(parse: true): Promise<any[]>;

        /**
         * Discard all commands issued after 'multi'.
         */
        discard(): Promise<boolean>;
    }

    interface Locker {
        release(): Promise<void>;
    }

    class LockFailedError extends Error {}
}

export = Cache;

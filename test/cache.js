const { expect } = require('chai');

describe('cache', function() {
    before(function() {
        const Cache = require('../src/cache');
        this.cache = new Cache({ prefix: 'cache:' });
    });

    it('set', function() {
        return this.cache.set('key1', 1).then(res => expect(res).to.be.true);
    });

    it('setnx', function() {
        return this.cache
            .setnx('key1', 2)
            .then(res => {
                expect(res).to.be.false;

                return this.cache.setnx('key2', 2);
            })
            .then(res => expect(res).to.be.true);
    });

    it('setx', function() {
        return this.cache
            .setx('key1', 3)
            .then(res => {
                expect(res).to.be.true;

                return this.cache.setx('key3', 3);
            })
            .then(res => {
                expect(res).to.be.false;
            });
    });

    it('get', function() {
        return this.cache.get('key1').then(res => expect(res).to.eq(3));
    });

    it('count', function() {
        return this.cache.count().then(res => expect(res).to.eq(2));
    });

    it('mset', function() {
        return this.cache
            .mset([['key4', 4], ['key5', 5], ['key6', 6]])
            .then(res => expect(res).to.be.true);
    });

    it('mget', function() {
        return this.cache
            .mget(['key1', 'key2', 'key3'])
            .then(res => expect(res).to.eql([3, 2, null]));
    });

    it('msetnx', function() {
        return this.cache
            .mset([['key4', 5], ['key5', 6], ['key7', 7]])
            .then(res => expect(res).to.be.true);
    });

    it('keys', function() {
        return this.cache
            .keys()
            .then(res =>
                expect(res).to.have.members([
                    'cache:key1',
                    'cache:key2',
                    'cache:key4',
                    'cache:key5',
                    'cache:key6',
                    'cache:key7'
                ])
            );
    });

    it('ttl', function() {
        return this.cache.ttl('key1').then(res => expect(res).to.eq(-1));
    });

    it('expire', function() {
        return this.cache
            .expire('key1', 10)
            .then(res => {
                expect(res).to.be.true;

                return this.cache.ttl('key1');
            })
            .then(res => expect(res).to.be.gt(0));
    });

    it('persist', function() {
        return this.cache
            .persist('key1')
            .then(res => {
                expect(res).to.be.true;

                return this.cache.ttl('key1');
            })
            .then(res => expect(res).to.eq(-1));
    });

    it('exists', function() {
        return this.cache
            .exists('key1', 'key2', 'key3')
            .then(res => expect(res).to.eq(2));
    });

    after(function() {
        return this.cache.flush().then(() => this.cache.close());
    });
});

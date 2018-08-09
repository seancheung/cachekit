const { expect } = require('chai');

describe('extra', function() {
    before(function() {
        const Cache = require('../src/cache');
        this.cache = new Cache({ prefix: 'cache:' });
    });

    it('ensure', function() {
        return this.cache
            .get('key1')
            .then(res => {
                expect(res).to.be.null;

                return this.cache.ensure('key1', 10);
            })
            .then(res => {
                expect(res).to.eq(10);
            });
    });

    it('lock', function() {
        const Locker = require('../src/locker');

        return this.cache.lock('lock1').then(locker => {
            expect(locker).to.be.instanceof(Locker);

            return this.cache
                .get('lock1')
                .then(res => {
                    expect(res).to.be.not.null;
                })
                .then(() =>
                    locker.release().then(() => this.cache.get('lock1'))
                )
                .then(res => {
                    expect(res).to.be.null;
                });
        });
    });

    it('lock(timeout 300ms)', function() {
        const { TimeoutError } = require('../src/errors');

        return this.cache
            .lock('lock2', 300, cache => {
                expect(cache).to.eq(this.cache);

                return new Promise(resolve => {
                    setTimeout(() => resolve(), 500);
                });
            })
            .then(() => {
                throw new Error();
            })
            .catch(err => {
                expect(err).to.be.instanceOf(TimeoutError);

                return this.cache.get('lock2', res => {
                    expect(res).to.be.null;
                });
            });
    });

    it('lock(race)', function() {
        const { LockFailedError } = require('../src/errors');

        return Promise.all([
            this.cache.lock('lock3', 300, cache => cache.set('key3', 'a')),
            this.cache
                .lock('lock3', 300, cache => cache.set('key3', 'b'))
                .catch(err => {
                    expect(err).to.be.instanceof(LockFailedError);
                })
        ]).then(() =>
            this.cache.get('key3').then(res => {
                expect(res).to.eq('a');
            })
        );
    });

    it('mlock', function() {
        const Multi = require('../src/multi');

        return this.cache
            .mlock('lock4', 300, multi => {
                expect(multi).to.be.instanceOf(Multi);

                return multi.set('key4', 1).set('key5', 2);
            })
            .then(res => {
                expect(res).to.eql([true, true]);
            });
    });

    after(function() {
        return this.cache.flush().then(() => this.cache.close());
    });
});

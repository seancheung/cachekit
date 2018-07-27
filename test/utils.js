const { expect } = require('chai');

describe('utils', function() {
    before(function() {
        this.utils = require('../src/utils');
    });

    it('serialize', function() {
        expect(this.utils.serialize(1)).to.be.a('number');
        expect(this.utils.serialize('1')).to.be.a('string');
    });

    it('deserialize', function() {
        expect(this.utils.deserialize(1)).to.be.a('number');
        expect(this.utils.deserialize('1')).to.be.a('number');
        expect(this.utils.deserialize('"1"')).to.be.a('string');
    });

    it('format', function() {
        expect(this.utils.format()).to.eq('*');
        expect(this.utils.format('test:')).to.eq('test:*');
        expect(this.utils.format(null, 'key')).to.eq('key');
        expect(this.utils.format('test:', 'key')).to.eq('test:key');
    });

    it('opts', function() {
        expect(this.utils.opts({ duration: 100 })).to.eql(['EX', 100]);
        expect(this.utils.opts({ duration: 100, mode: 'PX' })).to.eql([
            'PX',
            100
        ]);
        expect(this.utils.opts({ flag: 'NX' })).to.eql(['NX']);
        expect(this.utils.opts({ ch: true })).to.eql(['CH']);
        expect(this.utils.opts({ incr: true })).to.eql(['INCR']);
        expect(this.utils.opts({ withscores: true })).to.eql(['WITHSCORES']);
        expect(this.utils.opts({ count: 10 })).to.eql(['LIMIT', 0, 10]);
        expect(this.utils.opts({ count: 10, offset: 5 })).to.eql([
            'LIMIT',
            5,
            10
        ]);
    });

    it('pairs', function() {
        expect(this.utils.pairs([1, 2]))
            .to.be.an('array')
            .with.lengthOf(2);
        expect(this.utils.pairs([[1, 2]]))
            .to.be.an('array')
            .with.lengthOf(2);
    });

    it('page', function() {
        expect(this.utils.page({ pattern: '*', count: 1 })).to.eql([
            'MATCH',
            '*',
            'COUNT',
            1
        ]);
    });

    it('aserialize', function() {
        expect(this.utils.aserialize([1, '1', true])).to.eql([
            1,
            '"1"',
            'true'
        ]);
    });

    it('minmax', function() {
        expect(this.utils.minmax()).to.eql(['-inf', '+inf']);
    });

    it('startstop', function() {
        expect(this.utils.startstop()).to.eql([0, -1]);
    });

    it('jpath', function() {
        expect(this.utils.jpath('a.b.c')).to.eql(['a', 'b', 'c']);
        expect(this.utils.jpath(['a', 0, 'c'])).to.eql(['a', '[0]', 'c']);
    });
});

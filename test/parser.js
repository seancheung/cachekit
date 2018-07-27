const { expect } = require('chai');

describe('parser', function() {
    before(function() {
        this.parser = require('../src/parser');
    });

    it('plain', function() {
        expect(this.parser.plain('true')).to.eq('true');
    });

    it('value', function() {
        expect(this.parser.value('true')).to.eq(true);
        expect(this.parser.value(1)).to.eq(1);
        expect(this.parser.value('1')).to.eq(1);
        expect(this.parser.value('"1"')).to.eq('1');
    });

    it('ok', function() {
        expect(this.parser.ok('OK')).to.eq(true);
        expect(this.parser.ok('')).to.eq(false);
    });

    it('success', function() {
        expect(this.parser.success(1)).to.eq(true);
        expect(this.parser.success(0)).to.eq(false);
    });

    it('array', function() {
        expect(this.parser.array([1, 2, 3])).to.eql([1, 2, 3]);
        expect(this.parser.array(['1', '2', '3'])).to.eql([1, 2, 3]);
        expect(this.parser.array(['"1"', '2', 3])).to.eql(['1', 2, 3]);
    });

    it('paginate', function() {
        expect(this.parser.paginate(['1', 1])).to.eql([1, 1]);
    });

    it('map', function() {
        expect(this.parser.map(['a', 1, 'b', 2])).to.be.a('map');
    });

    it('mpaginate', function() {
        expect(this.parser.mpaginate(['1', ['a', 1, 'b', 2]])[1]).to.be.a(
            'map'
        );
    });

    it('spaginate', function() {
        expect(this.parser.spaginate(['1', [1, 2, 3]])[1]).to.be.a('set');
    });

    it('number', function() {
        expect(this.parser.number(1)).to.eq(1);
        expect(this.parser.number('1.1')).to.eq(1.1);
    });

    it('anumber', function() {
        expect(this.parser.anumber([1, '1.1'])).to.eql([1, 1.1]);
    });

    it('scores', function() {
        expect(this.parser.scores(['"a"', 1, '"b"', 2])).to.eql([
            ['a', 1],
            ['b', 2]
        ]);
    });

    it('apaginate', function() {
        expect(this.parser.apaginate(['1', ['"a"', 1, '"b"', 2]])).to.eql([
            1,
            [['a', 1], ['b', 2]]
        ]);
    });
});

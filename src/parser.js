const utils = require('./utils');

function plain(res) {
    return res;
}

function value(res) {
    return utils.deserialize(res);
}

function ok(res) {
    return res === 'OK';
}

function success(res) {
    return res === 1;
}

function array(arr) {
    return arr.map(res => utils.deserialize(res));
}

function paginate([cursor, arr]) {
    return [parseInt(cursor), arr];
}

function map(arr) {
    if (!arr) {
        return null;
    }
    const map = new Map();
    while (arr.length > 0) {
        const [f, v] = arr.splice(0, 2);
        map.set(f, utils.deserialize(v));
    }

    return map;
}

function mpaginate([cursor, arr]) {
    const map = new Map();
    while (arr.length > 0) {
        const [key, value] = arr.splice(0, 2);
        map.set(key, utils.deserialize(value));
    }

    return [parseInt(cursor), map];
}

function spaginate([cursor, arr]) {
    return [parseInt(cursor), new Set(arr.map(res => utils.deserialize(res)))];
}

function number(res) {
    return typeof res === 'string' ? parseFloat(res) : res;
}

function anumber(arr) {
    return arr.map(number);
}

function scores(arr) {
    if (!arr) {
        return null;
    }
    const pairs = [];
    while (arr.length > 0) {
        const [value, score] = arr.splice(0, 2);
        pairs.push([utils.deserialize(value), parseFloat(score)]);
    }

    return pairs;
}

function apaginate([cursor, arr]) {
    const pairs = [];
    while (arr.length > 0) {
        const [value, score] = arr.splice(0, 2);
        pairs.push([utils.deserialize(value), parseFloat(score)]);
    }

    return [parseInt(cursor), pairs];
}

module.exports = {
    plain,
    value,
    ok,
    success,
    array,
    paginate,
    map,
    mpaginate,
    spaginate,
    number,
    anumber,
    scores,
    apaginate
};

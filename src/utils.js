const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

function reviver(key, value) {
    if (typeof value === 'string' && dateFormat.test(value)) {
        return new Date(value);
    }

    return value;
}

function serialize(value) {
    if (value !== undefined && typeof value !== 'number') {
        value = JSON.stringify(value);
    }

    return value;
}

function deserialize(value) {
    if (typeof value === 'string') {
        value = JSON.parse(value, reviver);
    }

    return value;
}

function format(prefix, pattern) {
    if (!pattern) {
        pattern = '*';
    }
    if (prefix) {
        pattern = `${prefix}${pattern}`;
    }

    return pattern;
}

function opts(options) {
    const params = [];
    if (options) {
        if (options.duration) {
            params.push(options.mode || 'EX');
            params.push(options.duration);
        }
        if (options.flag) {
            params.push(options.flag);
        }
        if (options.ch) {
            params.push('CH');
        }
        if (options.incr) {
            params.push('INCR');
        }
        if (options.withscores) {
            params.push('WITHSCORES');
        }
        if (options.count || options.offset) {
            params.push('LIMIT');
            params.push(options.offset || 0);
            if (options.count) {
                params.push(options.count);
            }
        }
    }

    return params;
}

function pairs(pairs) {
    if (pairs.length === 2 && !Array.isArray(pairs[0])) {
        pairs = [pairs];
    }
    pairs = pairs.reduce((t, [k, v]) => t.concat([k, serialize(v)]), []);

    return pairs;
}

function page(options) {
    const params = [];
    if (options) {
        if (options.pattern) {
            params.push('MATCH', options.pattern);
        }
        if (options.count) {
            params.push('COUNT', options.count);
        }
    }

    return params;
}

function aserialize(arr) {
    return arr.map(value => serialize(value));
}

function minmax(min, max) {
    if (min == null) {
        min = '-inf';
    }
    if (max == null) {
        max = '+inf';
    }

    return [min, max];
}

function startstop(start, stop) {
    if (start == null) {
        start = 0;
    }
    if (stop == null) {
        stop = -1;
    }

    return [start, stop];
}

function jpath(path) {
    if (Array.isArray(path)) {
        path = path.map(el => {
            if (typeof el === 'number') {
                el = `[${el}]`;
            }

            return el;
        });
    } else if (typeof path === 'string') {
        path = path.split('.');
    } else {
        path = [];
    }

    return path;
}

module.exports = {
    serialize,
    deserialize,
    format,
    opts,
    pairs,
    page,
    aserialize,
    minmax,
    startstop,
    jpath
};

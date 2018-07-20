const SYMBOLS = require('./symbols');
const parser = require('./parser');

module.exports = context => {
    const wrapper = {};
    if (!context[SYMBOLS.PARSERS]) {
        for (const method of parser) {
            wrapper[method] = (func, ...args) =>
                new Promise((resolve, reject) => {
                    func.call(null, ...args, (err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            res = parser[method].call(parser, res);
                            resolve(res);
                        }
                    });
                });
        }
    } else {
        for (const method of parser) {
            wrapper[method] = (func, ...args) => {
                func.call(null, ...args);
                context[SYMBOLS.PARSERS].push(parser[method].bind(parser));

                return context;
            };
        }
        wrapper.exec = (func, parse) =>
            new Promise((resolve, reject) => {
                func.call(null, (err, arr) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (parse) {
                            arr = arr.map((res, i) =>
                                context[SYMBOLS.PARSERS][i](res)
                            );
                        }
                        resolve(arr);
                    }
                });
            });
    }

    return wrapper;
};

const SYMBOLS = require('./symbols');
const injection = require('./injection');
const parser = require('./parser');

module.exports = context => {
    const wrapper = {};
    if (!context[SYMBOLS.PARSERS]) {
        for (const method in parser) {
            wrapper[method] = (func, ...args) =>
                new injection.Promise((resolve, reject) => {
                    func.call(context[SYMBOLS.DRIVER], ...args, (err, res) => {
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
        for (const method in parser) {
            wrapper[method] = (func, ...args) => {
                func.call(context[SYMBOLS.DRIVER], ...args);
                context[SYMBOLS.PARSERS].push(parser[method].bind(parser));

                return context;
            };
        }
        wrapper.exec = (func, parse) =>
            new injection.Promise((resolve, reject) => {
                func.call(context[SYMBOLS.DRIVER], (err, arr) => {
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

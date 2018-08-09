# cachekit

[![Master Build][travis-master]][travis-url]
[![Dev Build][travis-develop]][travis-url]

Redis wrapper with extended features

[travis-master]: https://img.shields.io/travis/seancheung/cachekit/master.svg?label=master
[travis-develop]: https://img.shields.io/travis/seancheung/cachekit/develop.svg?label=develop
[travis-url]: https://travis-ci.org/seancheung/cachekit

## Features

- Promisified
- Automatic Serialization
- Json Props Read/Write
- Improved Multi calls
- Locking

## Install

```bash
npm i cachekit
```

## Usage

```javascript
const Cache = require('cachekit');
const cache = new Cache({ prefix: 'myapp' });
```

For a full initialization options description, See [Redis client options](https://github.com/NodeRedis/node_redis#rediscreateclient)

Basic usage

```javascript
cache.set('key1', 100).then(console.log) // true
cache.incr('key1').then(console.log) // 101
cache.get('key1').then(console.log) // 101 
```

Complex data structures

```javascript
cache.set('key1', { name: 'Harry', age: 30 }) // true
cache.get('key1') // {"name":"harry","age":30}
```

Json Props Read/Write

```javascript
cache.set('key1', { id: 1, pos: { x: 10, y: 20 }, tags: ['network', 'security'] }) //true
cache.jget('key1', 'id') // 1
cache.jget('key1', 'pos') // {"x":10,"y":20}
cache.jget('key1', 'pos.x') // 10
cache.jget('key1', ['pos', 'y']) // 20
cache.jget('key1', 'tags.[0]') // "network"
cache.jget('key1', ['tags', 1]) // "security"
cache.jset('key1', 'id', 2)
cache.jset('key1', 'pos.x', 15)
cache.jset('key1', ['pos', 'y'], 25)
cache.jset('key1', 'tags.[0]', 'network')
cache.jset('key1', ['tags', 1], 'security')
```
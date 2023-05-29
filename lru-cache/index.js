const { LRUCache } = require('./lru-cache')

const cache = new LRUCache(3)

cache.put('1', 1)
cache.put('2', 2)
cache.put('3', 3)
cache.put('4', 4)

for(let i = 1; i<=4; i++) {
    console.log(cache.get(i.toString()))
}
const { HitCounter } = require('./hit-counter')

const counter = new HitCounter();

// hit at timestamp 1.
counter.hit(1);

// hit at timestamp 2.
counter.hit(2);

// hit at timestamp 3.
counter.hit(3);

// get hits at timestamp 4, should return 3.
const hits4 = counter.getHits(4);

// hit at timestamp 300.
counter.hit(300);

// get hits at timestamp 300, should return 4.
const hits300 = counter.getHits(300);

// get hits at timestamp 301, should return 3.
const hits301 = counter.getHits(301);

const res = [
    hits4,
    hits300,
    hits301
]
console.log(res)

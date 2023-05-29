const { Logger } = require('./logger');

const logger = new Logger();
// logging string "foo" at timestamp 1
const res1 = logger.shouldPrintMessage(1, "foo"); // returns true; 

// logging string "bar" at timestamp 2
const res2 = logger.shouldPrintMessage(2,"bar"); // returns true;

// logging string "foo" at timestamp 3
const res3 = logger.shouldPrintMessage(3,"foo"); // returns false;

// logging string "bar" at timestamp 8
const res4 = logger.shouldPrintMessage(8,"bar"); // returns false;

// logging string "foo" at timestamp 10
const res5 = logger.shouldPrintMessage(10,"foo"); // returns false;

// logging string "foo" at timestamp 11
const res6 = logger.shouldPrintMessage(11, "foo"); // returns true;


console.log([
    res1,
    res2,
    res3,
    res4,
    res5,
    res6
])

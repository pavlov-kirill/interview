const PRINT_TIMEOUT = 10

class Logger {
    constructor() {
        this.map = new Map()
    }
    shouldPrintMessage(timestamp, message) {
        if(this.map.has(message)) {
            const lastPrintedTimestamp = this.map.get(message)
            const delta = timestamp - lastPrintedTimestamp
            console.log({
                lastPrintedTimestamp,
                delta,
                timestamp
            })
            if(delta < PRINT_TIMEOUT) {
                return false
            }
        }
        console.log(message)
        this.map.set(message, timestamp)
        return true
    }
}

module.exports = {
    Logger
}
const MAX_PERIOD = 5*60 // 5 min

class HitCounter {
    constructor() {
        this.queue = []
    }

    hit(timestamp) {

        this._clearOutdatedTimestamps(timestamp)
        this.queue.push(timestamp)
    }

    getHits(timestamp) {
        if(this.queue.length === 0) {
            return 0
        }
        this._clearOutdatedTimestamps(timestamp)
        return this.queue.length
    }

    _clearOutdatedTimestamps(timestamp) {
        while(this.queue.length > 0) {
            const delta = timestamp - this.queue[0]
            if(delta < MAX_PERIOD) {
                return
            }
            this.queue.shift()
        }
    }
}

module.exports = {
    HitCounter
}
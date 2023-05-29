class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.map = new Map()
        this.queue = []
    }

    get(key) {
        return this.map.get(key) || -1
    }

    put(key, value) {
        if(!this.map.has(key) && this.queue.length === this.capacity) {
            const outdatedKey = this.queue.shift()
            this.map.delete(outdatedKey)
        }

        this.map.set(key, value)
        this.queue.push(key)
    }
}

module.exports = {
    LRUCache
}
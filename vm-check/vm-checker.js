const { vmList, getVMObject } = require('./api')
const events = require('./events')

const {
    CHECKING_INTERVAL,
    LAST_VALUES_NUMBER,
    MOVING_AVERAGE_INTERVAL,
    LAST_VALUES_MAX_PERCENT
} = require('./constants')

let intervalId = null
let vmMap = new Map()

async function vmCheck() {
    const list = await vmList()
    
    for(let {id, name} of list) {
        const vmObject = await getVMObject(id)
        if(!vmObject) {
            vmMap.delete(id)
            continue
        }

        const { cpuUsage, memoryUsage } = vmObject
        
        const metrics = vmMap.get(id) || []
        metrics.push({ 
            timestamp: Date.now(),
            cpuUsage,
            memoryUsage
        })
        clearOutdatedMetrics(metrics)

        const movingAverage = computeMovingAverage(metrics)

        for(let i=0; i<LAST_VALUES_NUMBER; i++) {
            const index = metrics.length - 1 - i
            if(index<0) {
                break;
            }
            const value = metrics[index]
            const maxCPUusage = movingAverage + movingAverage * (LAST_VALUES_MAX_PERCENT/100)
            if(value.cpuUsage >= maxCPUusage) {
                events.notify('CPUOverloaded', {
                    vmId: id,
                    vmName: name,
                    timestamp: value.timestamp,
                    cpuUsage: value.cpuUsage,
                    maxCPUusage
                })
            }
        }

        vmMap.set(id, metrics)
    }
}

function clearOutdatedMetrics(metrics) {
    const currentTimestamp = Date.now()
    while(metrics.length > 0) {
        const metric = metrics[0]
        const delta = currentTimestamp - metric.timestamp
        if(delta <= MOVING_AVERAGE_INTERVAL) {
            break
        }

        metrics.shift()
    }
}

function computeMovingAverage(metrics) {
    if(metrics.length === 0) {
        return 0
    }

    let MACpu = 0
    for(let value of metrics) {
        MACpu = MACpu + value.cpuUsage
    }
    MACpu = MACpu / metrics.length

    return MACpu
}

async function run() {
    vmMap.clear()
    intervalId = setInterval(vmCheck, CHECKING_INTERVAL)
}

async function stop() {
    vmMap.clear()
    if (intervalId) {
        clearInterval(intervalId)
    }
}

module.exports = {
    run,
    stop
}
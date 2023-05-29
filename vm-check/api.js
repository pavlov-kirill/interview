//Mocking VM service API

const vmObjects = [
    { id: '1', name: 'XP', cpuMin: 0, cpuMax: 100, memoryMin: 30, memoryMax: 60 },
    { id: '2', name: 'Ubuntu', cpuMin: 10, cpuMax: 90, memoryMin: 50, memoryMax: 80 },
    { id: '3', name: 'Debian', cpuMin: 50, cpuMax: 80, memoryMin: 10, memoryMax: 90 },
    { id: '4', name: 'Win 11', cpuMin: 30, cpuMax: 60, memoryMin: 0, memoryMax: 100 }
]

async function vmList() {
    return vmObjects.map(vm => ({ id: vm.id, name: vm.name }))
}

async function getVMObject(vmId) {
    const updatedUsageVMs = vmObjects.map(({ id, name, cpuMin, cpuMax, memoryMin, memoryMax }) => {
        return { 
            id,
            name,
            cpuUsage: getRandomFromInterval(cpuMin, cpuMax),
            memoryUsage: getRandomFromInterval(memoryMin, memoryMax)
        }
    })
    return updatedUsageVMs.find(vm => vm.id === vmId )
}

function getRandomFromInterval(min, max) {
    return Math.random()*(max - min) + min
}

module.exports = {
    vmList,
    getVMObject
}
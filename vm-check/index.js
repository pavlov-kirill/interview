const { run, stop } = require('./vm-checker')

const process = require('node:process')

process.on('SIGINT', () => {
    stop()
})

run()
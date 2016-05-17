'use strict'

const sgSocketClient = require('sg-socket-client')

let socket = sgSocketClient('http://localhost:8084')
socket.on('connect', () => { /* ... */ })
socket.on('my:event', () => { /* ... */ })
socket.on('disconnect', () => { /* ... */ })

'use strict'

const sgSocketClient = require('sg-socket-client')
const co = require('co')

let socket = sgSocketClient('http://localhost:8084')
socket.on('connect', () => { /* ... */ })
socket.on('my:event', () => { /* ... */ })
socket.on('disconnect', () => { /* ... */ })

// Using locking extension
{
  // Resource to lock.
  let resource = 'screen'

  co(function * () {
    // Start locking
    // Throws error if another client lock the resrouce
    yield socket.lock(resource)

    // Stop locking
    yield socket.unlock(resource)
  })
}

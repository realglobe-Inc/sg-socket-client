'use strict'

const sgSocketClient = require('sg-socket-client')
const co = require('co')

let socket = sgSocketClient('http://localhost:8084')
socket.on('connect', () => { /* ... */ })
socket.on('my:event', () => { /* ... */ })
socket.on('disconnect', () => { /* ... */ })

// Using call extension
{
  co(function * () {
    // Wait for ack
    let result = socket.call('my:event', { foo: 'bar' })
    console.log(result)
  })
}

// Using locking extension
{
  // Resource to lock.
  let resource = 'screen'

  co(function * () {
    // Start locking
    // Throws error if another client lock the resource
    yield socket.lock(resource)

    // Stop locking
    yield socket.unlock(resource)
  })
}

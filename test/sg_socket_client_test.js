/**
 * Test case for sgSocketClient.
 * Runs with mocha.
 */
'use strict'

const sgSocket = require('sg-socket')
const sgSocketClient = require('../lib/sg_socket_client.js')
const assert = require('assert')
const co = require('co')

describe('sg-socket-client', function () {
  this.timeout(4000)
  let wsServer
  let port = 9876
  before(() => co(function * () {
    wsServer = sgSocket(port)
    wsServer.on('connection', (socket) => {
      socket.on('test:ping', (data) => {
        socket.emit('test:pong', data)
      })
    })
  }))

  after(() => co(function * () {
    wsServer.close()
  }))

  it('Sg socket client', () => co(function * () {
    yield new Promise((resolve) => {
      let socket = sgSocketClient(`http://localhost:${port}`)
      socket.on('connect', () => {
        resolve()
      })
      socket.lock()
      socket.unlock()
    })
  }))

  it('Use async call', () => co(function * () {
    let socket = sgSocketClient(`http://localhost:${port}`)
    let pong = yield socket.call('test:ping', { name: 'hoge' }, {
      expect: 'test:pong'
    })
    assert.deepEqual(pong, { name: 'hoge' })
  }))
})

/* global describe, before, after, it */

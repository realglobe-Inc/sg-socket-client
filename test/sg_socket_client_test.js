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
      socket.on('test:ping', (data, callback) => {
        callback({ state: 'success' })
      })
    })
  }))

  after(() => co(function * () {
    wsServer.close()
  }))

  it('Sg socket client', () => co(function * () {
    let socket = sgSocketClient(`http://localhost:${port}`)
    yield socket.waitToConnect()
    yield socket.waitToConnect() // Could be call twice
    yield socket.lock()
    yield socket.unlock()
  }))

  it('Use async call', () => co(function * () {
    let socket = sgSocketClient(`http://localhost:${port}`)
    let pong = yield socket.call('test:ping', { name: 'hoge' })
    assert.deepEqual(pong, { state: 'success' })
  }))

  it('Use async call with timeout', () => co(function * () {
    let socket = sgSocketClient(`http://localhost:${port}`)
    yield socket.call('test:no_res', { name: 'hoge' }, {
      timeout: 10
    }).catch((err) => {
      assert.ok(err)
    })
  }))

})

/* global describe, before, after, it */

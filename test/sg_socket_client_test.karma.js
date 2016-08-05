/**
 * Test case for sgSocketClient.
 * Runs with karma.
 */
'use strict'

const sgSocketClient = require('../shim/browser/sg_socket_client.js')
const assert = require('assert')
const co = require('co')

describe('sg-socket-client', function () {
  this.timeout(4000)
  let port = 8888
  before(() => co(function * () {

  }))

  after(() => co(function * () {

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

  it('Use wrap call', () => co(function * () {
    let socket = sgSocketClient(`http://localhost:${port}`).wrap('testing:foo')

    let result = yield socket.call('bar', { hoge: 'fuge' })
    assert.deepEqual(result.received, { hoge: 'fuge' })

    yield new Promise((resolve) => {
      socket.on('baz', (data) => {
        assert.deepEqual(data, { baz: 'bazz' })
        resolve()
      })
      socket.call('bar', { hoge: 'fuge' })
    })
  }))

  it('Call pubsub', () => co(function * () {

  }))
})

/* global describe, before, after, it */

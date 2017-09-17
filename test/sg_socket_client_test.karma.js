/**
 * Test case for sgSocketClient.
 * Runs with karma.
 */
'use strict'

const sgSocketClient = require('../shim/browser/sg_socket_client.js')
const assert = require('assert')


describe('sg-socket-client', function () {
  this.timeout(4000)
  let port = 8888
  before(async () => {

  })

  after(async () => {

  })

  it('Sg socket client', async () => {
    let socket = sgSocketClient(`http://localhost:${port}`)
    await socket.waitToConnect()
    await socket.waitToConnect() // Could be call twice
    await socket.lock()
    await socket.unlock()
  })

  it('Use async call', async () => {
    let socket = sgSocketClient(`http://localhost:${port}`)
    let pong = await socket.call('test:ping', { name: 'hoge' })
    assert.deepEqual(pong, { state: 'success' })
  })

  it('Use async call with timeout', async () => {
    let socket = sgSocketClient(`http://localhost:${port}`)
    await socket.call('test:no_res', { name: 'hoge' }, {
      timeout: 10
    }).catch((err) => {
      assert.ok(err)
    })
  })

  it('Use wrap call', async () => {
    let socket = sgSocketClient(`http://localhost:${port}`).wrap('testing:foo')

    let result = await socket.call('bar', { hoge: 'fuge' })
    assert.deepEqual(result.received, { hoge: 'fuge' })

    await new Promise((resolve) => {
      socket.on('baz', (data) => {
        assert.deepEqual(data, { baz: 'bazz' })
        resolve()
      })
      socket.call('bar', { hoge: 'fuge' })
    })
  })

  it('Call pubsub', async () => {

  })
})

/* global describe, before, after, it */

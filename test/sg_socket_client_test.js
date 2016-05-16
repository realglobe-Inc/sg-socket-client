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
    })
  }))
})

/* global describe, before, after, it */

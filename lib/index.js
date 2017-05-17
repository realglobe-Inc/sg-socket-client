/**
 * Web socket client for SUGOS
 * @module sg-socket-client
 * @version 2.0.0
 */
'use strict'

const sgSocketClient = require('./sg_socket_client')

let lib = sgSocketClient.bind(this)

Object.assign(lib, sgSocketClient, {
  sgSocketClient
})

module.exports = lib

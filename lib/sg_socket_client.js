/**
 * @function sgSocketClient
 */
'use strict'

const socketIoClient = require('socket.io-client')
const debug = require('debug')('sg:socket:client')

/** @lends sgSocketClient */
function sgSocketClient (...args) {
  let socket = socketIoClient(...args)
  let { io } = socket
  socket.on('connect', () => {
    debug(`Connected to server: ${io.uri}`)
  })
  socket.on('disconnect', () => {
    debug(`Disconnected from server: ${io.uri}`)
  })
  return socket
}

module.exports = sgSocketClient

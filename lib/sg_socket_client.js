/**
 * @function sgSocketClient
 */
'use strict'

const socketIoClient = require('socket.io-client')
const debug = require('debug')('sg:socket:client')

const { CallExtension, LockExtension } = require('./extensions')

/** @lends sgSocketClient */
function sgSocketClient (...args) {
  let socket = socketIoClient(...args)
  Object.assign(socket, CallExtension, LockExtension)
  let { io } = socket
  socket.on('connect_error', () => debug(`Failed to connect to server: ${io.uri}`))
  socket.on('connect_timeout', () => debug(`Connection timeout with server: ${io.uri}`))
  socket.on('connect', () => debug(`Connected to server: ${io.uri}`))
  socket.on('disconnect', () => debug(`Disconnected from server: ${io.uri}`))
  return socket
}

module.exports = sgSocketClient

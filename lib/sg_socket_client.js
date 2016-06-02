/**
 * @function sgSocketClient
 * @returns {Object}
 */
'use strict'

const socketIoClient = require('socket.io-client')
const { ReservedEvents } = require('sg-socket-constants')
const debug = require('debug')('sg:socket:client')

const {
  CallExtension,
  LockExtension,
  WrapExtension,
  PubsubExtension
} = require('./extensions')

const {
  CONNECT,
  CONNECT_ERROR,
  CONNECT_TIMEOUT,
  DISCONNECT
} = ReservedEvents

/** @lends sgSocketClient */
function sgSocketClient (...args) {
  let socket = socketIoClient(...args)
  Object.assign(socket, {
    $initial: [ ...args ]
  })
  let { io } = socket

  let untilConnect = new Promise((resolve, reject) => {
    let { uri } = io
    socket.on(CONNECT_ERROR, () => {
      debug(`Failed to connect to server: ${uri}`)
      reject({ uri })
    })
    socket.on(CONNECT_TIMEOUT, () => {
      debug(`Connection timeout with server: ${uri}`)
      reject({ uri })
    })
    socket.on(CONNECT, () => {
      debug(`Connected to server: ${uri}`)
      resolve({ uri })
    })
  })

  let untilDisconnect = new Promise((resolve, reject) => {
    let { uri } = io
    socket.on(DISCONNECT, () => {
      debug(`Disconnected from server: ${uri}`)
      resolve({ uri })
    })
  })

  Object.assign(socket,
    CallExtension,
    LockExtension,
    WrapExtension,
    PubsubExtension,
    {
      waitToConnect: () => untilConnect,
      untilDisconnect: () => untilDisconnect
    }
  )
  return socket
}

module.exports = sgSocketClient

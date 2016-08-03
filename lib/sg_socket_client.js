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
    setTimeout(() => {
      socket.on(CONNECT_ERROR, () => {
        let message = `Failed to connect to server: ${uri}`
        debug(message)
        reject(new Error(message))
      })
      socket.on(CONNECT_TIMEOUT, () => {
        let message = `Connection timeout with server: ${uri}`
        debug(message)
        reject(new Error(message))
      })
      socket.on(CONNECT, () => {
        debug(`Connected to server: ${uri}`)
        resolve({ uri })
      })
    }, 0)
  })

  let untilDisconnect = new Promise((resolve, reject) => {
    let { uri } = io
    setTimeout(() => {
      socket.on(DISCONNECT, () => {
        debug(`Disconnected from server: ${uri}`)
        resolve({ uri })
      })
    }, 0)
  })

  Object.assign(socket,
    CallExtension,
    LockExtension,
    WrapExtension,
    PubsubExtension,
    {
      waitToConnect: () => untilConnect,
      waitToDisconnect: () => untilDisconnect
    }
  )
  return socket
}

module.exports = sgSocketClient

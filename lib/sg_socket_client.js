/**
 * @function sgSocketClient
 * @returns {Object}
 */
'use strict'

const socketIoClient = require('socket.io-client')
const {ReservedEvents} = require('sg-socket-constants')
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
  const socket = socketIoClient(...args)
  Object.assign(socket, {
    $initial: [...args]
  })
  const {io} = socket

  const untilConnect = new Promise((resolve, reject) => {
    const {uri} = io
    socket.on(CONNECT_ERROR, (err) => {
      let message = `Failed to connect to server: ${uri}, err: ${err}`
      debug(message, err)
      reject(new Error(message))
    })
    socket.on(CONNECT_TIMEOUT, (err) => {
      let message = `Connection timeout with server: "${uri}", err: ${err}`
      debug(message, err)
      reject(new Error(message))
    })
    socket.on(CONNECT, () => {
      debug(`Connected to server: ${uri}`)
      resolve({uri})
    })
  })

  const untilDisconnect = new Promise((resolve, reject) => {
    const {uri} = io
    socket.on(DISCONNECT, () => {
      debug(`Disconnected from server: ${uri}`)
      resolve({uri})
    })
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

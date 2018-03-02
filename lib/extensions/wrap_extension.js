/**
 * Extensions for wrapping
 * @module WrapExtension
 */
'use strict'

// See https://github.com/component/emitter/blob/master/index.js
const wrappableNames = [
  'on',
  'addEventListener',
  'off',
  'emit',
  'removeListener',
  'removeAllListeners',
  'removeEventListener'
]

/* @lends WrapExtension */
const WrapExtension = Object.freeze({
  /**
   * Wrap events with prefix
   * @param {string} prefix - Event name prefix
   * @param {Object} options - Optional settings
   * @returns {Object} - Socket.IO client instnace.
   */
  wrap (prefix, options = {}) {
    const sgSocketClient = require('../sg_socket_client')
    let client = sgSocketClient(...this.$initial)

    let prefixed = (ev) => ev && [ prefix, ev ].join(':') || ev
    wrappableNames.forEach((name) => {
      let wrapping = client[ name ]
      client[ name ] = function wrap (ev, ...args) {
        wrapping.call(client, prefixed(ev), ...args)
      }
    })
    return client
  }
})

module.exports = WrapExtension

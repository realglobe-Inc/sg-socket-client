/**
 * Extension for calling
 * @module CallExtension
 */
'use strict'

const co = require('co')

/** @lends CallExtension */
const CallExtension = Object.freeze({
  /**
   * Send and wait for reply
   * @param {string} event - Name of event to send.
   * @param {Object} data - Data to send.
   * @param {Object} [options]
   * @param {string} [options.timeout] - Timeout
   * @returns {Promise} - Reply from server.
   */
  call (event, data, options = {}) {
    const s = this
    return co(function * () {
      let { timeout } = options
      return yield new Promise((resolve, reject) => {
        let done = false
        let timer = null

        function unlessDone (action) {
          if (done) {
            return
          }
          action()
          clearTimeout(timer)
          done = true
        }

        if (timeout) {
          timer = setTimeout(() => {
            unlessDone(() => reject(new Error('[sg-socket-client] Calling timeout')))
          }, timeout).unref()
        }

        s.emit(event, data, (reply) => {
          unlessDone(() => resolve(reply))
        })
      })
    })
  }
})

module.exports = CallExtension

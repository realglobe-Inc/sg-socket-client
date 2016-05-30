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
   * @param {string} [options.expect=event] - Event name to wait for success
   * @param {string} [options.abort=null] - Event name to wait for fail.
   * @param {string} [options.timeout] - Timeout
   * @returns {Promise}
   */
  call (event, data, options = {}) {
    const s = this
    return co(function * () {
      let { expect, abort, timeout } = options
      expect = expect || event
      return yield new Promise((resolve, reject) => {
        let done = false

        function unlessDone (action) {
          if (done) {
            return
          }
          action()
          if (expect) {
            s.off(expect, success)
          }
          if (abort) {
            s.off(abort, fail)
          }
          done = true
        }

        let success = (data) =>
          unlessDone(() => resolve(data))

        let fail = (data) =>
          unlessDone(() => resolve(data))

        if (expect) {
          s.once(expect, success)
        }
        if (abort) {
          s.once(abort, fail)
        }

        if (timeout) {
          setTimeout(() => {
            unlessDone(() => reject(new Error('[sg-socket-client] Calling timeout')))
          }, timeout).unref()
        }

        s.emit(event, data)
      })
    })
  }
})

module.exports = CallExtension

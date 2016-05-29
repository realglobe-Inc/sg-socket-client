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
   * @returns {Promise}
   */
  call (event, data, options = {}) {
    const s = this
    return co(function * () {
      let { expect, abort } = options
      expect = expect || event
      return yield new Promise((resolve, reject) => {
        function success (data) {
          clear()
          resolve(data)
        }

        function fail (data) {
          clear()
          reject(data)
        }

        function clear () {
          if (expect) {
            s.off(expect, success)
          }
          if (abort) {
            s.off(abort, fail)
          }
        }

        if (expect) {
          s.once(expect, success)
        }
        if (abort) {
          s.once(abort, fail)
        }
        s.emit(event, data)
      })
    })
  }
})

module.exports = CallExtension

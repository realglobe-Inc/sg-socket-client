/**
 * Extension for calling
 * @mixin CallExtension
 */
'use strict'

const {AcknowledgeStatus} = require('sg-socket-constants')
const {OK, NG} = AcknowledgeStatus

/** @lends CallExtension */
const CallExtension = Object.freeze({
  /**
   * Send and wait for reply
   * @param {string} event - Name of event to send.
   * @param {Object} data - Data to send.
   * @param {Object} [options]
   * @param {number} [options.timeout] - Timeout
   * @returns {Promise} - Reply from server.
   */
  async call (event, data, options = {}) {
    const s = this
    const {timeout} = options
    return await new Promise((resolve, reject) => {
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
        const {status, payload} = reply
        if (status === NG) {
          const message = `${payload.message || payload} ( event: "${event}", data: "${JSON.stringify(data)}" )`
          unlessDone(() => reject(new Error(message)))
          return
        }
        unlessDone(() => resolve(reply))
      })
    })
  }
})

module.exports = CallExtension

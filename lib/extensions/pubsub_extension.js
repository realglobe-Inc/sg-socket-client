/**
 * Publish/Subscribe feature
 * @module PubsubExtension
 */
'use strict'

const co = require('co')
const { PubsubEvents } = require('sg-socket-constants')
const { SUBSCRIBE, UNSUBSCRIBE, RECEIVE } = PubsubEvents

/** @lends PubsubExtension */
const PubsubExtension = Object.freeze({
  /**
   * Subscribe event
   * @param {string} topic - Name of event to subscribe
   * @param {function} handler - Event handler
   */
  subscribe (topic, handler) {
    const s = this
    return co(function * () {
      s._pubsubReceivers = s._pubsubReceivers || {}
      let result = yield s.call(SUBSCRIBE, { topic })

      function receiver (data) {
        if (data.topic === topic) {
          handler(data.payload)
        }
      }

      Object.assign(receiver, {
        handler
      })

      s._pubsubReceivers[ topic ] = (s._pubsubReceivers[ topic ] || []).concat(receiver)
      s.on(RECEIVE, receiver)
      return result
    })
  },

  /**
   * Unsubscribe event
   * @param {string} topic - Name of event to subscribe
   * @param {function} handler - Event handler
   */
  unsubscribe (topic, handler) {
    const s = this
    return co(function * () {
      s._pubsubReceivers = s._pubsubReceivers || {}
      let result = yield s.call(UNSUBSCRIBE, { topic })
      s._pubsubReceivers[ topic ] = (s._pubsubReceivers[ topic ] || []).filter((receiver) => {
        let removing = (!handler) || (receiver.handler === handler)
        if (removing) {
          s.off(RECEIVE, receiver)
        }
        return !removing
      })
      return result
    })
  }
})

module.exports = PubsubExtension

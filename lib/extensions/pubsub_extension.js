/**
 * Publish/Subscribe feature
 * @mixin PubsubExtension
 */
'use strict'

const {PubsubEvents} = require('sg-socket-constants')
const {
  // to cloud
  SUBSCRIBE,
  UNSUBSCRIBE,
  RAISE,
  SHUT,
  PUBLISH,
  // From cloud
  RECEIVE,
  COUNT
} = PubsubEvents

/** @lends PubsubExtension */
const PubsubExtension = Object.freeze({
  /**
   * Subscribe topic
   * @param {string} topic - Name of topic to subscribe
   * @param {function} handler - Event handler
   * @returns {Promise}
   */
  async subscribe (topic, handler) {
    const s = this
    s._pubsubReceivers = s._pubsubReceivers || {}
    let result = await s.call(SUBSCRIBE, {topic})

    function receiver (data) {
      handler(data.payload)
    }

    Object.assign(receiver, {
      handler
    })

    s._pubsubReceivers[topic] = (s._pubsubReceivers[topic] || []).concat(receiver)
    s.on(RECEIVE, receiver)
    return result
  },

  /**
   * Unsubscribe topic
   * @param {string} topic - Name of topic to subscribe
   * @param {function} handler - Event handler
   * @returns {Promise}
   */
  async unsubscribe (topic, handler) {
    const s = this
    s._pubsubReceivers = s._pubsubReceivers || {}
    let result = await s.call(UNSUBSCRIBE, {topic})
    s._pubsubReceivers[topic] = (s._pubsubReceivers[topic] || []).filter((receiver) => {
      let removing = (!handler) || (receiver.handler === handler)
      if (removing) {
        s.off(RECEIVE, receiver)
      }
      return !removing
    })
    return result
  },

  /**
   * Raise as a publisher
   * @param {string} topic - Name of topic
   * @returns {Promise}
   */
  async raiseAsPublisher (topic) {
    const s = this
    s._pubsubSenders = s._pubsubSenders || {}
    let result = await s.call(RAISE, {topic})

    function sender (payload) {
      return s.call(PUBLISH, {topic, payload})
    }

    Object.assign(sender, {
      topic,
      subCount: 0
    })

    s._pubsubSenders[topic] = sender

    s.on(COUNT, (counts) => {
      sender.subCount = counts.sub
    })
    return result
  },

  /**
   * Shut as publisher
   * @param {Object} payload - Payload data
   * @returns {Promise}
   */
  async shutAsPublisher (topic) {
    const s = this
    s._pubsubSenders = s._pubsubSenders || {}
    let result = await s.call(SHUT, {topic})
    delete s._pubsubSenders[topic]
    return result
  },

  /**
   * Publish topic
   * @param {string} topic - Name of topic to subscribe
   * @param {Object} payload - Payload data
   * @returns {Promise}
   */
  async publish (topic, payload) {
    const s = this
    const sender = (s._pubsubSenders || {})[topic]
    if (!sender) {
      throw new Error(`Not ready to publish topic: ${topic}`)
    }
    return await sender(payload)
  }
})

module.exports = PubsubExtension

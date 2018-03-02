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
    this._pubsubReceivers = this._pubsubReceivers || {}
    let result = await this.call(SUBSCRIBE, {topic})

    function receiver (data) {
      handler(data.payload)
    }

    Object.assign(receiver, {
      handler
    })

    this._pubsubReceivers[topic] = (this._pubsubReceivers[topic] || []).concat(receiver)
    this.on(RECEIVE, receiver)
    return result
  },

  /**
   * Unsubscribe topic
   * @param {string} topic - Name of topic to subscribe
   * @param {function} handler - Event handler
   * @returns {Promise}
   */
  async unsubscribe (topic, handler) {
    this._pubsubReceivers = this._pubsubReceivers || {}
    const result = await this.call(UNSUBSCRIBE, {topic})
    this._pubsubReceivers[topic] = (this._pubsubReceivers[topic] || []).filter((receiver) => {
      let removing = (!handler) || (receiver.handler === handler)
      if (removing) {
        this.off(RECEIVE, receiver)
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
    const call = this.call.bind(this)
    this._pubsubSenders = this._pubsubSenders || {}
    let result = await call(RAISE, {topic})

    function sender (payload) {
      return call(PUBLISH, {topic, payload})
    }

    Object.assign(sender, {
      topic,
      subCount: 0
    })

    this._pubsubSenders[topic] = sender

    this.on(COUNT, (counts) => {
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
    this._pubsubSenders = this._pubsubSenders || {}
    let result = await this.call(SHUT, {topic})
    delete this._pubsubSenders[topic]
    return result
  },

  /**
   * Publish topic
   * @param {string} topic - Name of topic to subscribe
   * @param {Object} payload - Payload data
   * @returns {Promise}
   */
  async publish (topic, payload) {
    const sender = (this._pubsubSenders || {})[topic]
    if (!sender) {
      throw new Error(`Not ready to publish topic: ${topic}`)
    }
    return await sender(payload)
  }
})

module.exports = PubsubExtension

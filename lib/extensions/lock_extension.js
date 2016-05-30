/**
 * Extension for locking
 * @module LockExtension
 */
'use strict'

const { LockingEvents } = require('sg-socket-constants')
const { LOCK, UNLOCK } = LockingEvents

/** @lends LockExtension */
const LockExtension = Object.freeze({
  /**
   * Lock a resource
   * @param {string} name
   * @returns {Promise}
   */
  lock (name) {
    const s = this
    let { id } = s
    return s.call(LOCK, { name, by: id })
  },
  /**
   * Lock a resource
   * @param {string} name
   * @returns {Promise}
   */
  unlock (name) {
    const s = this
    let { id } = s
    return s.call(UNLOCK, { name, by: id })
  }
})

module.exports = LockExtension

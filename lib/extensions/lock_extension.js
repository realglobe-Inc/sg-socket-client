/**
 * Extension for locking
 * @module LockingExtension
 */
'use strict'

const { LockingEvents } = require('sg-socket-constants')
const { LOCK, UNLOCK } = LockingEvents

/** @lends LockingExtension */
const LockingExtension = Object.freeze({
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

module.exports = LockingExtension

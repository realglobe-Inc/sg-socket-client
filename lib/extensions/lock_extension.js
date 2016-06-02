/**
 * Extension for locking
 * @mixin LockExtension
 */
'use strict'

const { LockingEvents } = require('sg-socket-constants')
const { LOCK, UNLOCK } = LockingEvents

/** @lends LockExtension */
const LockExtension = Object.freeze({
  /**
   * Lock a resource
   * @param {string} name - Name of resource to lock
   * @param {Object} [options] - Optional settings
   * @returns {Promise}
   */
  lock (name, options = []) {
    const s = this
    let { id } = s
    return s.call(LOCK, { name, by: id }, options)
  },
  /**
   * Lock a resource
   * @param {string} name - Name of resource to unlock
   * @param {Object} [options] - Optional settings
   * @returns {Promise}
   */
  unlock (name, options = {}) {
    const s = this
    let { id } = s
    return s.call(UNLOCK, { name, by: id })
  }
})

module.exports = LockExtension

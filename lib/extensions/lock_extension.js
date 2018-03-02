/**
 * Extension for locking
 * @mixin LockExtension
 */
'use strict'

const {LockingEvents} = require('sg-socket-constants')
const {LOCK, UNLOCK} = LockingEvents

/** @lends LockExtension */
const LockExtension = Object.freeze({
  /**
   * Lock a resource
   * @param {string} name - Name of resource to lock
   * @param {Object} [options] - Optional settings
   * @returns {Promise}
   */
  lock (name, options = []) {
    const {id} = this
    return this.call(LOCK, {name, by: id}, options)
  },
  /**
   * Lock a resource
   * @param {string} name - Name of resource to unlock
   * @param {Object} [options] - Optional settings
   * @returns {Promise}
   */
  unlock (name, options = {}) {
    const {id} = this
    return this.call(UNLOCK, {name, by: id})
  }
})

module.exports = LockExtension

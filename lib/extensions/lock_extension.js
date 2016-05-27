/**
 * Extension for locking
 * @module LockingExtension
 */
'use strict'

const { LockingEvents } = require('sg-socket-constants')
const { LOCK, UNLOCK } = LockingEvents

const LockingExtension = Object.freeze({
  /**
   * Lock a resource
   * @param {string} name
   */
  lock (name) {
    const s = this
    let { id } = s
    s.emit(LOCK, { name, by: id })
  },
  /**
   * Lock a resource
   * @param {string} name
   */
  unlock (name) {
    const s = this
    let { id } = s
    s.emit(UNLOCK, { name, by: id })
  }
})

module.exports = LockingExtension

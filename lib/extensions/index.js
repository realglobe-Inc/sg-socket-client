/**
 * Extension modules
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get LockExtension () { return d(require('./lock_extension')) }
}

/**
 * Extension modules
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get CallExtension () { return d(require('./call_extension')) },
  get LockExtension () { return d(require('./lock_extension')) }
}

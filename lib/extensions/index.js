/**
 * Extension modules
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get CallExtension () { return d(require('./call_extension')) },
  get LockExtension () { return d(require('./lock_extension')) },
  get PubsubExtension () { return d(require('./pubsub_extension')) },
  get WrapExtension () { return d(require('./wrap_extension')) }
}

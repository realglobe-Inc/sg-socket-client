/**
 * Extension modules
 */

'use strict'

const d = (module) => module && module.default || module

const CallExtension = d(require('./call_extension'))
const LockExtension = d(require('./lock_extension'))
const PubsubExtension = d(require('./pubsub_extension'))
const WrapExtension = d(require('./wrap_extension'))

module.exports = {
  CallExtension,
  LockExtension,
  PubsubExtension,
  WrapExtension
}

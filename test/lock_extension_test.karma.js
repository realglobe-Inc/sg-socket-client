/**
 * Test case for lockExtension.
 * Runs with karma.
 */
'use strict'

const LockExtension = require('../shim/browser/extensions/lock_extension.js')
const assert = require('assert')


describe('lock-extension', () => {
  before(async () => {

  })

  after(async () => {

  })

  it('Lock extension', async () => {
    assert.ok(LockExtension)
  })
})

/* global describe, before, after, it */

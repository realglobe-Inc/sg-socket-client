/**
 * Test case for lockExtension.
 * Runs with mocha.
 */
'use strict'

const LockExtension = require('../lib/extensions/lock_extension.js')
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

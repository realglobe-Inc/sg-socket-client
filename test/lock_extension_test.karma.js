/**
 * Test case for lockExtension.
 * Runs with karma.
 */
'use strict'

const LockExtension = require('../shim/browser/extensions/lock_extension.js')
const assert = require('assert')
const co = require('co')

describe('lock-extension', () => {
  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Lock extension', () => co(function * () {
    assert.ok(LockExtension)
  }))
})

/* global describe, before, after, it */

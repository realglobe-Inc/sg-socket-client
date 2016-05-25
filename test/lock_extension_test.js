/**
 * Test case for lockExtension.
 * Runs with mocha.
 */
'use strict'

const LockExtension = require('../lib/extensions/lock_extension.js')
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

/**
 * Test case for callExtension.
 * Runs with karma.
 */
'use strict'

const CallExtension = require('../shim/browser/extensions/call_extension.js')
const assert = require('assert')
const co = require('co')

describe('call-extension', () => {
  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Call extension', () => co(function * () {
    assert.ok(CallExtension)
  }))
})

/* global describe, before, after, it */

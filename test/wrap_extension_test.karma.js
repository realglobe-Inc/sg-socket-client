/**
 * Test case for wrapExtension.
 * Runs with karma.
 */
'use strict'

const WrapExtension = require('../shim/browser/extensions/wrap_extension.js')
const assert = require('assert')
const co = require('co')

describe('wrap-extension', () => {
  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Wrap extension', () => co(function * () {
    assert.ok(WrapExtension)
  }))
})

/* global describe, before, after, it */

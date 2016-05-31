/**
 * Test case for wrapExtension.
 * Runs with mocha.
 */
'use strict'

const WrapExtension = require('../lib/extensions/wrap_extension.js')
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

/**
 * Test case for wrapExtension.
 * Runs with karma.
 */
'use strict'

const WrapExtension = require('../shim/browser/extensions/wrap_extension.js')
const assert = require('assert')


describe('wrap-extension', () => {
  before(async () => {

  })

  after(async () => {

  })

  it('Wrap extension', async () => {
    assert.ok(WrapExtension)
  })
})

/* global describe, before, after, it */

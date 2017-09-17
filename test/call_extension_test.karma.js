/**
 * Test case for callExtension.
 * Runs with karma.
 */
'use strict'

const CallExtension = require('../shim/browser/extensions/call_extension.js')
const assert = require('assert')


describe('call-extension', () => {
  before(async () => {

  })

  after(async () => {

  })

  it('Call extension', async () => {
    assert.ok(CallExtension)
  })
})

/* global describe, before, after, it */

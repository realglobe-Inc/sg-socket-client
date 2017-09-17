#!/usr/bin/env node

/**
 * Run browser tests.
 */

'use strict'

process.chdir(`${__dirname}/..`)
process.env.DEBUG = 'sg:*'

const apeTasking = require('ape-tasking')
const sgSocket = require('sg-socket')
const {exec} = require('child_process')

let wsServer
let port = 8888

apeTasking.runTasks('browser test', [
  () => new Promise((resolve, reject) => {
    exec('./ci/shim.js', (err, stdout) => {
      err ? reject(err) : resolve(stdout)
    })
  }),
  async () => {
    wsServer = sgSocket(port)
    wsServer.on('connection', (socket) => {
      socket.on('test:ping', (data, callback) => {
        callback({state: 'success'})
      })
      socket.on('testing:foo:bar', (data, callback) => {
        callback({msg: 'this is foo bar', received: data})
        socket.emit('testing:foo:baz', {baz: 'bazz'})
      })
    })
  },
  () => new Promise((resolve, reject) => {
    exec('./node_modules/.bin/karma start', (err, stdout, stderr) => {
      if (err) {
        reject(err)
      }
      console.log(stdout)
      console.error(stderr)
      resolve()
    })
  }),
  async () => {
    wsServer.close()
  }
], true)

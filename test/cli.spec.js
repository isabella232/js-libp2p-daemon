/* eslint-env mocha */
'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const cli = require('../src/cli/bin')

describe('cli', () => {
  let daemon = require('../src/daemon')

  afterEach(() => {
    sinon.restore()
  })

  it('should create a daemon with default options', async () => {
    sinon.stub(daemon, 'createDaemon').callsFake(async (options) => {
      expect(options).to.include({
        b: false,
        bootstrap: false,
        'bootstrap-peers': '',
        bootstrapPeers: '',
        'conn-mgr': false,
        connMgr: false,
        dht: false,
        'dht-client': false,
        dhtClient: false,
        id: '',
        q: false,
        quiet: false,
        sock: '/tmp/p2pd.sock'
      })
      return {
        start: () => {},
        stop: () => {}
      }
    })

    await cli([
      '/bin/node',
      '/daemon/src/cli/bin.js'
    ])
  })

  it('should be able to specify options', async () => {
    sinon.stub(daemon, 'createDaemon').callsFake(async (options) => {
      expect(options).to.include({
        b: true,
        bootstrap: true,
        'bootstrap-peers': '/p2p/Qm1,/p2p/Qm2',
        bootstrapPeers: '/p2p/Qm1,/p2p/Qm2',
        'conn-mgr': true,
        connMgr: true,
        dht: true,
        'dht-client': true,
        dhtClient: true,
        id: '/path/to/key',
        q: true,
        quiet: true,
        sock: '/tmp/d.sock'
      })
      return {
        start: () => {},
        stop: () => {}
      }
    })

    await cli([
      '/bin/node',
      '/daemon/src/cli/bin.js',
      '--dht=true',
      '--b=true',
      '--bootstrapPeers=/p2p/Qm1,/p2p/Qm2',
      '--connMgr=true',
      '--dhtClient=true',
      '--quiet=true',
      '--id=/path/to/key',
      '--sock=/tmp/d.sock'
    ])
  })
})
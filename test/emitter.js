import { assert } from 'chai'

import Emitter from '../src/emitter'


describe('Emitter', () => {
  it('invokes the observer when the named event is emitted until disposed', () => {
    const emitter = new Emitter()
    const fooEvents = []
    const barEvents = []
    const sub1 = emitter.on('foo', (value) => {
      fooEvents.push(['a', value])
    })
    const sub2 = emitter.on('bar', (value) => {
      barEvents.push(['b', value])
    })
    emitter.emit('foo', 1)
    emitter.emit('foo', 2)
    emitter.emit('bar', 3)
    sub1.dispose()
    emitter.emit('foo', 4)
    emitter.emit('bar', 5)
    sub2.dispose()
    emitter.emit('bar', 6)
    assert.deepEqual(fooEvents, [['a', 1], ['a', 2]])
    assert.deepEqual(barEvents, [['b', 3], ['b', 5]])
  })

  it('throws an exception when subscribing with a callback that isn\'t a function', () => {
    const emitter = new Emitter()
    assert.throws(() => {
      emitter.on('foo', null)
    })
    assert.throws(() => {
      emitter.on('foo', 'a')
    })
  })

  it('works well with async callbacks', (done) => {
    let called = 0
    const emitter = new Emitter()
    emitter.on('foo', () => {
      new Promise((resolve) => {
        called++
        resolve()
      })
    })
    emitter.on('foo', () => {
      new Promise((resolve) => {
        called++
        resolve()
      })
    })
    emitter.emit('foo').then(() => {
      assert.equal(called, 2)
      done()
    })
  })
})

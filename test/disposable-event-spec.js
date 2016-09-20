import assert from 'assert'
import EventEmitter from 'events'
import { jsdom } from 'jsdom'

import CompositeDisposable from '../src/composite-disposable'
import disposableEvent from '../src/disposable-event'


describe('disposableEvent', () => {
  it('works well with addEventListener/removeEventListener', () => {
    let called = 0
    const document = jsdom()
    const element = document.createElement('div')
    const subscriptions = new CompositeDisposable()

    const newMouseEvent = (eventType) => {
        let event = document.createEvent('MouseEvent')
        event.initEvent(eventType, true, false)
        return event
    }

    subscriptions.add(disposableEvent(element, 'mousemove', () => {
      called++
    }))

    assert.equal(called, 0)

    element.dispatchEvent(newMouseEvent('mousemove'))
    assert.equal(called, 1)

    element.dispatchEvent(newMouseEvent('mousemove'))
    assert.equal(called, 2)

    subscriptions.dispose()
    element.dispatchEvent(newMouseEvent('mousemove'))
    assert.equal(called, 2)
  })

  it('works well with node\'s event emitter', () => {
    let called = 0
    const emitter = new EventEmitter()
    const subscriptions = new CompositeDisposable()

    subscriptions.add(disposableEvent(emitter, 'something', () => {
      called++
    }))

    assert.equal(called, 0)

    emitter.emit('something')
    assert.equal(called, 1)

    emitter.emit('something')
    assert.equal(called, 2)

    subscriptions.dispose()
    emitter.emit('something')
    assert.equal(called, 2)
  })
})

import { assert } from 'chai'
import { spy } from 'sinon'

import Disposable from '../src/disposable'


describe('Disposable', () => {
  it('does not try to execute disposalAction when it is not a function', () => {
    const disposalAction = {}
    const disposable = new Disposable(disposalAction)
    assert.equal(disposable.callback, disposalAction)

    disposable.dispose()
    assert.isNull(disposable.callback)
  })

  it('dereferences the disposalAction once dispose() is invoked', () => {
    const disposalAction = spy()
    const disposable = new Disposable(disposalAction)
    assert.equal(disposable.callback, disposalAction)

    disposable.dispose()
    assert.equal(disposalAction.callCount, 1)
    assert.isNull(disposable.callback)

    disposable.dispose()
    assert.equal(disposalAction.callCount, 1)
  })
})

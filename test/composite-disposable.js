import { assert } from 'chai'

import CompositeDisposable from '../src/composite-disposable'
import Disposable from '../src/disposable'


describe('CompositeDisposable', () => {
  let disposable1
  let disposable2
  let disposable3

  beforeEach(() => {
    disposable1 = new Disposable()
    disposable2 = new Disposable()
    disposable3 = new Disposable()
  })

  it('can be constructed with multiple disposables', () => {
    const composite = new CompositeDisposable(disposable1, disposable2)
    composite.dispose()

    assert.isTrue(composite.disposed)
    assert.isTrue(disposable1.disposed)
    assert.isTrue(disposable2.disposed)
  })

  it('allows disposables to be added and removed', () => {
    const composite = new CompositeDisposable()
    composite.add(disposable1)
    composite.add(disposable2, disposable3)
    composite.remove(disposable2)
    composite.dispose()

    assert.isTrue(composite.disposed)
    assert.isTrue(disposable1.disposed)
    assert.isFalse(disposable2.disposed)
    assert.isTrue(disposable3.disposed)
  })
})

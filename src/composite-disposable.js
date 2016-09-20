import type Disposable from './disposable'

export default class CompositeDisposable {
  disposed: boolean;
  disposables: Set<Disposable>;

  constructor(...args){
    this.disposed = false
    this.disposables = new Set(args)
  }
  add(...args){
    if (!this.disposed) {
      let length = args.length
      for (let i = 0; i < length; ++i) {
        this.disposables.add(args[i])
      }
    }
  }
  remove(...args){
    if (!this.disposed) {
      let length = args.length
      for (let i = 0; i < length; ++i) {
        this.disposables.delete(args[i])
      }
    }
  }
  clear(){
    if (!this.disposed) {
      this.disposables.clear()
    }
  }
  isDisposed(): boolean {
    return this.disposed
  }
  dispose(){
    if (!this.disposed) {
      for (const item of this.disposables) {
        item.dispose()
      }
      this.disposed = true
      this.disposables.clear()
    }
  }
}

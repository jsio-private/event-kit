import Disposable from './disposable'

export default class Emitter {
  disposed: boolean;
  handlers: Object;

  constructor() {
    this.disposed = false
    this.handlers = {}
  }

  on(eventName: string, handler: Function): Disposable {
    if (this.disposed) {
      throw new Error('Emitter has been disposed')
    }
    if (typeof handler !== 'function') {
      throw new Error('Event handler must be a function')
    }
    if (typeof this.handlers[eventName] === 'undefined') {
      this.handlers[eventName] = new Set([handler])
    } else {
      this.handlers[eventName].add(handler)
    }
    return new Disposable(() => {
      this.off(eventName, handler)
    })
  }

  off(eventName: string, handler: Function){
    if (!this.disposed && this.handlers[eventName]) {
      this.handlers[eventName].delete(handler)
    }
  }

  clear() {
    this.handlers = {}
  }

  emit(eventName: string, ...params: any) {
    if (this.disposed || typeof this.handlers[eventName] === 'undefined') {
      return
    }
    const paramsLength = params.length
    const promises = []
    for (const callback of this.handlers[eventName]) {
      let value
      if (paramsLength === 1) {
        value = callback(params[0])
      } else if (paramsLength === 2) {
        value = callback(params[0], params[1])
      } else if (paramsLength === 3) {
        value = callback(params[0], params[1], params[2])
      } else if (paramsLength === 4) {
        value = callback(params[0], params[1], params[2], params[3])
      } else if (paramsLength === 5) {
        value = callback(params[0], params[1], params[2], params[3], params[4])
      } else {
        value = callback(...params)
      }
      promises.push(value)
    }
    return Promise.all(promises)
  }

  isDisposed(): boolean {
    return this.disposed
  }

  dispose(){
    this.disposed = true
    this.handlers = {}
  }
}

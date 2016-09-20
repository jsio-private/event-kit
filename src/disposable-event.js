import Disposable from './disposable'

export default function disposableEvent(
  target: Object, eventName: string, callback: Function
): Disposable {
  if (target.on) {
    target.on(eventName, callback)
  } else if (target.addListener) {
    target.addListener(eventName, callback)
  } else if (target.addEventListener) {
    target.addEventListener(eventName, callback)
  } else {
    throw new Error('Unknown event emitter')
  }
  return new Disposable(function() {
    if (target.off) {
      target.off(eventName, callback)
    } else if (target.removeListener) {
      target.removeListener(eventName, callback)
    } else if (target.removeEventListener) {
      target.removeEventListener(eventName, callback)
    } else {
      throw new Error('Unknown event emitter')
    }
  })
}

'use strict';
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class Disposable {
  constructor(callback) {
    this.disposed = false;
    this.callback = callback;
  }
  dispose() {
    if (!this.disposed) {
      this.disposed = true;
      if (typeof this.callback === 'function') {
        this.callback();
      }
      this.callback = null;
    }
  }
}
exports.Disposable = Disposable;
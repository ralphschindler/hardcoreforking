import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default class BaseStore extends EventEmitter {

  constructor(actionSubscribe) {
    super();
    this._dispatchToken = AppDispatcher.register(actionSubscribe(this));
  }

  get dispatchToken() {
    return this._dispatchToken;
  }

  emitChange() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('CHANGE');
    this.emit.apply(this, args);
  }

  addChangeListener(cb) {
    this.on('CHANGE', cb)
  }

  removeChangeListener(cb) {
    this.removeListener('CHANGE', cb);
  }
}
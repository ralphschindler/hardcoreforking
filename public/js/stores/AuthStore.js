import AuthConstants from '../constants/AuthConstants';
import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';

class AuthStore extends BaseStore {

  constructor() {
    super((scope) => AuthStore.prototype._registerToActions.bind(scope));
    this._jwt = window.localStorage.getItem('jwt');
    this._user = null;
    if (this._jwt) {
      var data = jwt_decode(this._jwt);
      this._user = data.jti;
    }
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case AuthConstants.AUTHORIZATION_SUCCESS:
        window.localStorage.setItem('jwt', action.jwt);
        this.emitChange();
        break;
      case AuthConstants.AUTHORIZATION_FAILURE:
        this.emitChange({failedMessage: action.message});
        break;
      case AuthConstants.AUTHORIZATION_LOAD:
        this._jwt = window.localStorage.getItem('jwt');
        if (this._jwt) {
          var data = jwt_decode(this._jwt);
          this._user = data.jti;
        }
        this.emitChange();
        break;
      case AuthConstants.AUTHORIZATION_LOGOUT:
        window.localStorage.removeItem('jwt');
        this._jwt = null;
        this._user = null;
        this.emitChange();
        break;
    }
  }

  get user() {
    return this._user;
  }

  get jwt() {
    return this._jwt;
  }

  isAuthorized() {
    return !!this._user;
  }
}

export default new AuthStore();
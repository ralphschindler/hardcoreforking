import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import AuthWebApi from '../services/AuthWebApi';

export default {
  authorize: (code) => {
    AuthWebApi.authorize(code);
  },
  authorizationSuccess: (jwt) => {
    AppDispatcher.dispatch({actionType: AuthConstants.AUTHORIZATION_SUCCESS, jwt: jwt});
  },
  authorizationFailure: (message) => {
    AppDispatcher.dispatch({actionType: AuthConstants.AUTHORIZATION_FAILURE, message: message});
  },
  load: () => {
    AppDispatcher.dispatch({actionType: AuthConstants.AUTHORIZATION_LOAD});
  },
  logout: () => {
    AppDispatcher.dispatch({actionType: AuthConstants.AUTHORIZATION_LOGOUT});
  }
};
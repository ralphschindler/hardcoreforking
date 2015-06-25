import request from 'superagent';
import AuthActionCreators from '../actions/AuthActionCreators';

export default {
  authorize: function (code) {
    request
      .post('/authorize')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({'authorization_code': code})
      .end(function (err, res) {
        console.log(res);
        if (res && res.ok) {
          if (res.body.token) {
            AuthActionCreators.authorizationSuccess(res.body.token);
          } else {
            AuthActionCreators.authorizationFailure('No token, but OK response');
          }
        } else {
          AuthActionCreators.authorizationFailure(res.body.message);
        }
      });
  }
};
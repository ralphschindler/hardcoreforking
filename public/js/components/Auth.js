import React from 'react';
import AuthStore from '../stores/AuthStore';
import AuthActionCreators from '../actions/AuthActionCreators';
import RouterContainer from '../services/RouterContainer';

export default class extends React.Component {

  constructor() {
    super();
    this.state = {message: "Authorization in progress."};
  }

  componentDidMount () {

    if (this.props.query.state == 'authorize-this') {
      AuthActionCreators.authorize(this.props.query.code);
    }

    AuthStore.addChangeListener(this._onChange.bind(this));
  }

  _onChange (state) {
    if (window.name == 'auth-window') {
      if (state && state.hasOwnProperty('failedMessage')) {
        this.setState({message: state.failedMessage});
      } else {
        this.setState({message: 'Authorizing, this window will close'});
        window.opener.postMessage("auth-success", window.location.protocol+'//'+window.location.host);
        window.setTimeout(() => window.close(), 1200); // 1.2 seconds
      }
    }
  }

  componentWillUnmount () {
    AuthStore.removeChangeListener(this._onChange);
  }

  gotoGoogleAuth () {
    var url = 'https://github.com/login/oauth/authorize?'
      + 'client_id=dd1ecdf62f0696e9e980&redirect_uri=' + encodeURIComponent('http://localhost:8000/authorize')
      + '&state=authorize-this';
    window.open(url, 'auth-window', 'width=500,height=500');
    window.addEventListener("message", (event) => {
      if (event.data == 'auth-success') {
        AuthActionCreators.load();
        RouterContainer.get().transitionTo('/');
      }
    }, false);
  }

  render () {

    if (this.props.query.state == 'authorize-this') {
      return (
        <div>
          <b>{this.state.message}</b>
        </div>
      );
    } else {
      return (
        <div>
          <h3>You must be logged in</h3>
          <button className="btn btn-default dropdown-toggle" onClick={this.gotoGoogleAuth}>Log in with Github</button>
        </div>
      );
    }
  }

}
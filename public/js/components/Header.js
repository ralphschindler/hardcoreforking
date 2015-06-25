import React from 'react';
import AuthStore from '../stores/AuthStore';
import AuthActionCreators from '../actions/AuthActionCreators.js';
import RouterContainer from '../services/RouterContainer';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {user: AuthStore.user};
  }

  componentDidMount () {
    this.changeListener = this._onChange.bind(this);
    AuthStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount () {
    AuthStore.removeChangeListener(this.changeListener);
  }

  _onChange () {
    if (this.state.user && !AuthStore.user) {
      RouterContainer.get().transitionTo('/authorize');
    }
    this.setState({user: AuthStore.user});
  }

  logout () {
    AuthActionCreators.logout();
  }

  render () {

    var userArea;
    if (this.state.user) {
      userArea = <div>Logged in as: {this.state.user}<br /><a onClick={this.logout}>logout</a></div>;
    } else {
      userArea = <div></div>
    }

    return (
      <header className="header black-bg">
        <div className="sidebar-toggle-box">
          <div className="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
        </div>
        <a href="index.html" className="logo"><b>Hardcore Forking!</b></a>
        <div className="nav notify-row" id="top_menu">
          <ul className="nav top-menu">
          </ul>
        </div>
        <div className="top-menu">
          <ul className="nav pull-right top-menu">
            {userArea}
          </ul>
        </div>
      </header>
    );
  }
}
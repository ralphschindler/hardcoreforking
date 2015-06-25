import React from 'react';
import Router from 'react-router';
import Header from './Header';
import Footer from './Footer';
import RouterContainer from '../services/RouterContainer';
import AuthStore from '../stores/AuthStore';

export default class extends React.Component {

  static willTransitionTo (transition, params, query) {
    if (!AuthStore.isAuthorized() && transition.path.indexOf('/authorize') === -1) {
      RouterContainer.get().transitionTo('authorize');
    }
  }

  //<Navigation></Navigation> add this back later

  render () {
    return (
      <section id="container">
        <Header></Header>
        <section id="main-content">
          <Router.RouteHandler />
        </section>
        <Footer></Footer>
      </section>
    );
  }
}
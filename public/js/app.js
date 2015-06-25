import React from 'react';
import Router from 'react-router';
import RouterContainer from './services/RouterContainer';

import Main from './components/Main';
import Hello from './components/Hello';
import Auth from './components/Auth';

var {
  create: createRouter,
  HistoryLocation,
  HashLocation,
  Route,
  DefaultRoute,
  NotFoundRoute,
  RouteHandler,
  Link
} = Router;

var routes = (
  <Route path="/" handler={Main}>
    <DefaultRoute name="hello" handler={Hello}/>
    <Route name="authorize" path="authorize" handler={Auth} />
  </Route>
);

var router = createRouter({
  location: HistoryLocation,
  routes: routes
});

RouterContainer.set(router);

router.run((Handler, state) => {
  React.render(<Handler {...state} />, document.getElementById('app'));
});
import React from 'react';

//var HelloActions = require('../action/HelloActions');
//var PersonStore = require('../store/PersonStore');

export default class extends React.Component {

  constructor() {
    super();
    //this.state = this._getLoginState();
  }

  getInitialState () {
    return {};
    //return PersonStore.getState()
  }

  componentDidMount () {
    //PersonStore.addChangeListener(this._onChange);
  }
  componentWillUnmount () {
    //PersonStore.removeChangeListener(this._onChange);
  }

  render () {
    return (
      <div>
        <b>Hello Ralphs!</b>
        <a href="#/">Go to index</a>
      </div>
    );
  }
  _onChange (/*object*/ event) {
    //this.setState(PersonStore.getState());
  }
}
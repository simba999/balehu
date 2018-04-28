/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';

import { db } from '../firebase.js';


class App extends React.Component {
  uploadJSON() {
    $.getJSON( "media/data.json", function( data ) {
      $.each( data, function( key, val ) {
        db.collection('cryptos').add(val)
      });
    });
  }

  render() {
    const activeStyle = { color: 'blue' };
    return (
      <section>
        <button onClick={this.uploadJSON.bind(this)}>Upload Json</button>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </section>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;

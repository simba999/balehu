/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import DetailPage from './DetailPage';


class App extends React.Component {
  render() {
    return (
      <section>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/detail/:id" component={DetailPage} />
        </Switch>
      </section>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;

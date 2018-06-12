/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './HomePage';
import DetailPage from './DetailPage';
import CreatePromotion from './CreatePromotion';
import Analytics from './Analytics';
import EditPromotion from './EditPromotion';
import LoginComponent from './LoginPage';
import SignupComponent from './SignupPage';

import '../styles/styles.scss';

function  validator() {
  const email  = window.localStorage.getItem('email');
  if (email) {
    return true;
  } else {
    return false;
  }
}


class App extends React.Component {
  render() {
    return (
      <section>
        <Switch>
          <Route exact 
            render={() => (
              validator() 
                ? (<HomePage />)
                : (<Redirect to="/login" />)
            )}
            path="/" />
          <Route 
            path="/detail/:id" 
            render={() => (
              validator() 
                ? (<DetailPage />)
                : (<Redirect to="/login" />)
            )} />
          <Route 
            exact 
            path="/promotion" 
            render={() => (
              validator() 
                ? (<CreatePromotion />)
                : (<Redirect to="/login" />)
            )} />
          <Route 
            exact 
            path="/promotion/:id" 
            render={() => (
              validator() 
                ? (<EditPromotion />)
                : (<Redirect to="/login" />)
            )} />
            <Route 
            exact 
            path="/analytics/:id" 
            render={() => (
              validator() 
                ? (<Analytics />)
                : (<Redirect to="/login" />)
            )} />
            <Route 
            exact 
            path="/testanalytics" 
            render={() => (
              validator() 
                ? (<Analytics />)
                : (<Redirect to="/login" />)
            )} />
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/signup" component={SignupComponent} />
        </Switch>
      </section>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;

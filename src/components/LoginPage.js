import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './header';
import ResendEmail from './resend-email';
import ForgotPassword from './forgot-password';
import { login } from '../actions/auth';
import $ from '../styles/assets/global/plugins/jquery.min.js';


class LoginComponent extends React.Component {
  constructor() {
    super();
  }

  _signIn() {
  	let data = {};

  	data['username'] 						= $('#login-email').val();
  	data['password']						= $("#login-password").val();

  	if ( data['username'] === '' ||
  		   data['password'] === '') {
  		alert("Username or password is not empty");
  	} else {

  			if ((data['username'] !== '') &&
  				(data['password'] !== '')) {
    				
            login({username: data['username'], password: data['password']}).then((res) => {
              if (res.code == 200) {
                window.localStorage.setItem('username', data['username']);
                window.localStorage.setItem('token', res.token)
                this.props.history.push('/');
              } else {
                alert(err.message);
              }
            });

  			} else {
  				alert('Password or email is not correct');
  			}

  	}
  }

  render() {
  	return (	
  		<div className="page-container-bg-solid">
  		  <div className="page-wrapper">
  		    <Header />
  		    <div className="page-wrapper-row full-height">
  		      <div className="page-wrapper-middle">
  		        {/* Begin body */}
  		        <div className="page-container">
  		          <div className="page-content-wrapper">
  		            <div className="page-content">
  		              <div className="container no-padding login-page">
  		              	<div className="promotion-header">Log In Your Account</div>
  		              	<div className="login-body">
  		              		<div className="row row-item">
  		              		  <div className="form-group">
  		              		    <label className="col-md-2 control-label single-label">Email</label>
  		              		    <div className="col-md-10">
                              <input 
                              	type="text" 
                              	id="login-email" 
                              	className="form-control" 
                              	placeholder="Enter email" />
  		              		    </div>
  		              		  </div>
  		              		</div>
  		              		<div className="row row-item">
                          <div className="form-group">
                            <label className="col-md-2 control-label single-label">Password</label>
                            <div className="col-md-10">
                              <input 
                              	type="password" 
                              	id="login-password" 
                              	className="form-control" 
                              	placeholder="Enter password" />
                            </div>
                          </div>
                        </div>
                        <div className="row row-item">
                          <div className="form-group">
                            <label className="col-md-2 control-label single-label"></label>
                            <div className="col-md-10 flex-box">
                              <label className="mt-checkbox">
                                <input type="checkbox" id="facebookCheck" value="option1" />
                                <label className="check-right-label color-label">Remember me</label>
                                <span></span>
                              </label>
                              <ForgotPassword />
                            </div>
                          </div>
                        </div>
                        <div className="row row-item text-center">
                          <button 
                            type="button" 
                            onClick={this._signIn.bind(this)}
                            className="btn btn-circle white btn-lg bg-darkgreen signup-btn">
                            Sign In
                          </button>
                        </div>
                        <div className="row row-item text-center">
                          <span className="m-r-15">Don’t have an account?</span>
                          <NavLink to="/signup" className="color-lightblue">Sign up</NavLink>
                        </div>
                        <div className="row row-item resend-panel">
                          <span className="m-r-15">Didn’t got confirmation email?</span>
                          <ResendEmail />
                        </div>
  		              	</div>
  		              </div>
  		            </div>
  		          </div>
  		        </div>
  		      </div>
  		    </div>
  		  </div>
  		</div>
  	)
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
  });
}

const mapStateToProps = (state) => {
  return ({
    signupInfo: state.businesses.signupInfo
  });
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent));
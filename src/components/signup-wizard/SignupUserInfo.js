import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { changeSignupStatus } from '../../actions/business';


class SignupUserInfo extends React.Component {
	constructor(props) {
		super(props);
	}

	_onSubmit() {
		let data 											= {};

		data['firstName'] 						= $("#firstName").val();
		data['secondName'] 						= $("#secondName").val();
		data['emailAddress'] 					= $("#email").val();
		data['password'] 							= $("#password").val();
		data['confirmPassword'] 			= $("#confirmPassword").val();

		if ( data['firstName'] === '' ||
				 data['secondName'] === '' ||
				 data['emailAddress'] === '' ||
				 data['password'] === '' ||
				 data['confirmPassword'] === '' ) {
			alert("Must fill all input fields!");
		} else {
			const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

			if (re.test(data['emailAddress'])) {
				if ( data['password'] != data['confirmPassword'] ) {
					alert("Password is not correct!")
				} else {
					this.props.changeSignupStatus(data);
					this.props.onSubmit(data);
				}
			} else {
				alert("Email is not valid!")
			}
			
		}
	}

	render() {
		console.log(this.props.value)
		return (
			<section>
      	<div className="promotion-header">Sign up</div>
      	<div className="login-body">
      		<div className="row row-item">
      		  <div className="form-group">
              <div className="col-md-6 no-padding">
              	<label className="col-md-4 control-label">First Name</label>
              	<div className="col-md-8">
              	  <input 
              	  	type="text" 
              	  	id="firstName" 
              	  	className="form-control" 
              	  	placeholder="" />
              	</div>
              </div>
              <div className="col-md-6 no-padding">
              	<label className="col-md-3 control-label">Last Name</label>
              	<div className="col-md-9">
              	  <input 
              	  	type="text" 
              	  	id="secondName" 
              	  	className="form-control" 
              	  	placeholder="" />
              	</div>
              </div>
      		  </div>
      		</div>
      		<div className="row row-item">
            <div className="form-group">
              <label className="col-md-2 control-label">Email Address</label>
              <div className="col-md-10">
                <input 
                	type="email" 
                	id="email" 
                	className="form-control" 
                	placeholder="" />
              </div>
            </div>
          </div>
      		<div className="row row-item">
            <div className="form-group">
              <label className="col-md-2 control-label single-label">Password</label>
              <div className="col-md-10">
                <input 
                	type="password" 
                	id="password" 
                	className="form-control" 
                	placeholder="" />
              </div>
            </div>
          </div>
          <div className="row row-item">
            <div className="form-group">
              <label className="col-md-2 control-label">Confirm Password</label>
              <div className="col-md-10">
                <input 
                	type="password" 
                	id="confirmPassword" 
                	className="form-control" 
                	placeholder="" />
              </div>
            </div>
          </div>
          <div className="row row-item">
          	<button 
          	  type="button" 
          	  onClick={this._onSubmit.bind(this)}
          	  className="btn btn-circle white btn-lg bg-darkgreen signup-btn signup-btn right-align">
          	  Sign up
          	</button>
          </div>
        </div>
			</section>
		);
	}
}

SignupUserInfo.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return ({
  	changeSignupStatus: (data) => { 
  		changeSignupStatus(data, dispatch); }
  }); 
}

const mapStateToProps = (state) => {
  return ({
    signupInfo: state.businesses.signupInfo
  });
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupUserInfo));
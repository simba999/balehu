import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Steps, { Step } from 'rc-steps';
import { changeSignupStatus } from '../../actions/business';

import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';

import '../../styles/steps.css';

class SignupBusinessInfo extends React.Component {
	constructor(props) {
		super(props);
	}

	_onSubmit() {
		let data 												= {};

		data['businessName'] 						= $("#businessName").val();
		data['businessAddress'] 				= $("#businessAddress").val();
		data['city'] 										= $("#city").val();
		data['state'] 									= $("#state").val();
		data['zipcode'] 								= $("#zipcode").val();
		data['category'] 								= $("#category").val();

		if ( data['businessName'] === '' ||
				 data['businessAddress'] === '' ||
				 data['city'] === '' ||
				 data['state'] === '' ||
				 data['zipcode'] === '' ) {
			alert("Must fill all input fields!");
		} else {
			this.props.changeSignupStatus(data);
			this.props.onSubmit(data);
		}

	}

	render() {
		console.log(this.props.value, this.props)
		return (
				<section>
	      	<div className="promotion-header">Sign up</div>
	      	<div className="login-body">
	      		<div className="row row-step">
							<Steps current={0} size="big">
								<Step
									icon={<span className="pageIcon">1</span>}
									></Step>
								<Step 
									icon={<span className="pageIcon">2</span>}></Step>
							</Steps>
							<div className="step-description m-t-15">
								<span>Business<br />Information</span>
								<span className="right-desc">Create<br />Wallet</span>
							</div>
	      		</div>
	      		<div className="sub-header">
	      			<span>Enter your business details:</span>
	      		</div>
	      		<div className="row row-item">
	            <div className="form-group">
	              <label className="col-md-2 control-label">Business Name</label>
	              <div className="col-md-10">
	                <input 
	                	type="text" 
	                	id="businessName" 
	                	className="form-control" 
	                	placeholder="" />
	              </div>
	            </div>
	          </div>
	      		<div className="row row-item">
	            <div className="form-group">
	              <label className="col-md-2 control-label">Business Address</label>
	              <div className="col-md-10">
	                <input 
	                	type="text" 
	                	id="businessAddress" 
	                	className="form-control" 
	                	placeholder="" />
	              </div>
	            </div>
	          </div>
	          <div className="row row-item">
	      		  <div className="form-group">
	              <div className="col-md-6 no-padding">
	              	<label className="col-md-4 control-label single-label">City</label>
	              	<div className="col-md-8">
	              	  <input 
	              	  	type="text" 
	              	  	id="city" 
	              	  	className="form-control" 
	              	  	placeholder="" />
	              	</div>
	              </div>
	              <div className="col-md-6 no-padding">
	              	<label className="col-md-3 control-label single-label">State</label>
	              	<div className="col-md-9">
	              	  <input 
	              	  	type="text" 
	              	  	id="state" 
	              	  	className="form-control" 
	              	  	placeholder="" />
	              	</div>
	              </div>
	      		  </div>
	      		</div>
	          <div className="row row-item">
	            <div className="form-group">
	              <label className="col-md-2 control-label">Zipcode</label>
	              <div className="col-md-10">
	                <input 
	                	type="text" 
	                	id="zipcode" 
	                	className="form-control" 
	                	placeholder="" />
	              </div>
	            </div>
	          </div>
	          <div className="row row-item">
	            <div className="form-group">
	              <label className="col-md-2 control-label single-label">Category</label>
	              <div className="col-md-10">
	                <select className="form-control" placeholder="Select Category" id="category">
	                  <option value="food">Food</option>
	                  <option value="drinks">Drinks</option>
	                  <option value="shopping">Shopping</option>
	                  <option value="health">Health</option>
	                  <option value="music">Music</option>
	                </select>
	              </div>
	            </div>
	          </div>
	          <div className="row row-item">
	          	<button 
	          	  type="button" 
	          	  onClick={this._onSubmit.bind(this)}
	          	  className="btn btn-circle white btn-lg bg-darkgreen signup-btn signup-btn right-align m-b-15">
	          	  Sign up
	          	</button>
	          </div>
	        </div>
				</section>
		);
	}
}

SignupBusinessInfo.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	previousPage: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return ({
  	changeSignupStatus: (data) => { changeSignupStatus(data, dispatch); }
  });
}

const mapStateToProps = (state) => {
  return ({
    signupInfo: state.businesses.signupInfo
  });
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupBusinessInfo));
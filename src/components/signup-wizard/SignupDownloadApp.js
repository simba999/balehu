import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { changeSignupStatus } from '../../actions/business';
import Steps, { Step } from 'rc-steps';

import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';

import '../../styles/steps.css';


class SignupDownloadApp extends React.Component {
	constructor(props) {
		super(props);
	}

	_onSubmit() {
		this.props.changeSignupStatus();
    window.localStorage.setItem('email', this.props.signupInfo['email']);
    window.localStorage.setItem('password', this.props.signupInfo['password']);
		this.props.history.push('/');
	}

	render() {
		console.log(this.props.value)
		return (
			<section className="download-app-page">
				<div className="login-body">
      		<div className="row row-step">
						<Steps current={1} size="big">
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
      			<span>Download Marketplace App:</span>
      		</div>
      		<div className="row row-item">
      			<img 
      				className="appstore-icons m-r-15"
      				src="../../../styles/assets/pages/img/download_app_store.svg" 
      				alt="image for download on appstore"/>
      			<img 
      				className="appstore-icons"
      				src="../../styles/assets/pages/img/google-play-badge.svg" 
      				alt="image for play on appstore"/>
      		</div>
      		<div className="row row-item">
      			<button 
      			  type="button" 
      			  onClick={this._onSubmit.bind(this)}
      			  className="btn btn-circle white btn-lg bg-darkgreen signup-btn signup-btn right-align m-b-15">
      			  Finish
      			</button>
      		</div>
				</div>    		
			</section>
		);
	}
}

SignupDownloadApp.propTypes = {
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

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupDownloadApp));
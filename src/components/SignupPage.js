import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './header';
import {
  SignupUserInfo,
  SignupBusinessInfo,
  SignupDownloadApp
} from './signup-wizard';


class SignupComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      page: 1,
      info: {}
    }

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  nextPage(value = null) {
    if (value == null) {
      this.setState({page: this.state.page + 1});  
    } else {
      const oldValue = { ...this.state.value, ...value };
      this.setState({
        page: this.state.page + 1,
        value: oldValue
      });
    }
  }

  previousPage(value = null) {
    if (value == null) {
      this.setState({page: this.state.page - 1});  
    } else {
      const oldValue = { ...this.state.value, ...value };
      this.setState({
        page: this.state.page - 1,
        value: oldValue
      });
    }
  }

  render() {
    const { page } = this.state;

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
  		              	{ page === 1 && 
                        <SignupUserInfo 
                          onSubmit={this.nextPage} 
                          value={this.state.value} />}
                      { page === 2 && 
                        <SignupBusinessInfo 
                          onSubmit={this.nextPage} 
                          previousPage={this.previousPage} 
                          value={this.state.value} />}
                      { page === 3 && 
                        <SignupDownloadApp
                          value={this.state.value} 
                          previousPage={this.previousPage} />}
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
    promotions: state.promotions.promotions
  });
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupComponent));
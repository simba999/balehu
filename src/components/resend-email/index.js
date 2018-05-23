import React from 'react';
import {connect} from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import './index.scss';


class ResendEmail extends React.Component {
  constructor(props) {
    super(props);
  }

  _onSubmit() {
    $("#resend-email").modal('hide');
  }

  render() {
    return (
      <section>
        <a className="color-lightblue" data-toggle="modal" href="#resend-email"> Resend  </a>
        <div id="resend-email" className="modal container fade" tabIndex="-1" data-width="700">
          <div className="modal-header">
            <h4 className="modal-title">Resend Conformation Email</h4>
            <span className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close"></i></span>
          </div>
          <div className="modal-body">
            <div className="row row-item m-l-15">
              Enter the email address you registered your account, an email will be sent:
            </div>
            <div className="row-item">
              <div className="form-group">
                <label className="col-md-2 control-label">Email Address</label>
                <div className="col-md-10">
                  <input type="text" className="form-control" placeholder="" id="resend-email-input" />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
              <button 
                type="button" 
                onClick={this._onSubmit.bind(this)}
                className="btn btn-circle white btn-lg bg-darkgreen">send</button>
          </div>
        </div>
      </section>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return ({
    // changeBusinessStatus: (data) => { changeBusinessStatus(data, dispatch); }
  });
}

const mapStateToProps = (state) => {
  return ({
    businesses: state.businesses.businesses
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResendEmail));
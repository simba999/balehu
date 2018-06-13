import React from 'react';
import {connect} from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';


class EditLoyalty extends React.Component {
  constructor(props) {
    super(props);
  }

  _onSubmit() {
    $("#editloyalty").modal('hide');
  }

  render() {
    return (
      <section>
        <a className="btn btn-circle white btn-sm flex-right" data-toggle="modal" href="#editloyalty"> Edit </a>
        <div id="editloyalty" className="modal container common-modal fade" tabIndex="-1" data-width="400">
          <div className="modal-header">
            <h4 className="modal-title text-center">Send Coins</h4>
            <span className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close"></i></span>
          </div>
          <div className="modal-body">
            <div className="row row-item">
              <strong>Consumer needs to</strong>
            </div>
            <div className="row row-item">
              <div className="mt-checkbox-list">
                <label className="mt-checkbox">
                  <input type="checkbox" id="facebookCheck" value="option1" />
                  <label className="check-right-label">Spend a minimum amount</label>
                  <span></span>
                </label>
              </div>
              <div className="form-group flex-box">
                <input type="text" className="form-control" placeholder="$ 50" />
                <span className="usd-val">USD</span>
              </div>
            </div>
            <div className="row row-item">
              <div className="mt-checkbox-list">
                <label className="mt-checkbox">
                  <input type="checkbox" id="facebookCheck" value="option1" />
                  <label className="check-right-label">Buy specific product</label>
                  <span></span>
                </label>
              </div>
              <div className="row form-group">
                <div className="col-md-6">
                  <input type="text" className="form-control" placeholder="Product" />
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control" placeholder="Quantity" />
                </div>
              </div>
            </div>
            <div className="row row-item">
              <strong>Reward With</strong>
            </div>
            <div className="row row-item">
              <div className="mt-checkbox-list">
                <label className="mt-checkbox">
                  <input type="checkbox" id="facebookCheck" value="option1" />
                  <label className="check-right-label">Balehu Coins</label>
                  <span></span>
                </label>
                <label className="mt-checkbox">
                  <input type="checkbox" id="facebookCheck" value="option1" />
                  <label className="check-right-label">Free product(s)</label>
                  <span></span>
                </label>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditLoyalty));
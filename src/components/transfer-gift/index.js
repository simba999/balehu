import React from 'react';
import {connect} from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import './index.scss';


class TransferGift extends React.Component {
  constructor(props) {
    super(props);
  }

  _onSubmit() {
    $("#transfer-gift").modal('hide');
  }

  render() {
    return (
      <section>
        <a className="btn btn-circle white btn-sm transfer-coin" data-toggle="modal" href="#transfer-gift"> Transfer Cash </a>
        <div id="transfer-gift" className="modal container fade" tabIndex="-1" data-width="700">
          <div className="modal-header">
            <h4 className="modal-title">Transfer Balehu Coin to Cash Account</h4>
            <span className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close"></i></span>
          </div>
          <div className="modal-body">
            <div className="row-item">
              <div className="form-group">
                <label className="col-md-2 control-label">Balehu Coin</label>
                <div className="col-md-10">
                  <span className="balehu-value-bal">64 BAL</span>
                  <span className="balehu-value-usd">169.6 USD</span>
                </div>
              </div>
            </div>
            <div className="row-item">
              <div className="form-group">
                <label className="col-md-2 control-label">Transfer to cash</label>
                <div className="col-md-10">
                  <input type="text" className="form-control" placeholder="0 BAL" />
                  <span className="request-amount">0 USD</span>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransferGift));
import React from 'react';
import './index.scss';


class SendCoin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <a className="btn btn-circle white btn-lg bg-darkgreen send-coin" data-toggle="modal" href="#sendcoin"> Send Coins </a>
        <div id="sendcoin" className="modal container fade" tabIndex="-1" data-width="700">
          <div className="modal-header">
            <h4 className="modal-title">Send Coins</h4>
            <span className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close"></i></span>
          </div>
          <div className="modal-body">
            <div className="row-item">
              <div className="form-group">
                <label className="col-md-2 control-label single-label">To</label>
                <div className="col-md-10">
                  <button type="button" className="btn btn-circle white btn-lg bg-darkgreen scan-btn">Scan Code</button>
                </div>
              </div>
            </div>
            <div className="unit-price">$2.65 usd per coin </div>
            <div className="row-item">
              <div className="form-group">
                <label className="col-md-2 control-label single-label">Amount</label>
                <div className="col-md-10">
                  <input type="text" className="form-control" placeholder="123 6th St. 32904" />
                </div>
              </div>
            </div>
            <div className="row-item">
              <div className="form-group">
                <label className="col-md-2 control-label single-label">Memo</label>
                <div className="col-md-10">
                  <input type="text" className="form-control" placeholder="32904" />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
              <button type="button" className="btn btn-circle white btn-lg bg-darkgreen">send</button>
          </div>
        </div>
      </section>
    );
  }
}

export default SendCoin;
import React from 'react';
import QRCode from 'qrcode.react';

import './index.scss';


class ReceiveCoin extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(document).ready(function() {
      // if ($(".modal-title").hasClass('active'))
      $(".receive-coin-panel").show();
      $(".request-coin-panel").hide();

      $("#receiveCoin").click(function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $(".receive-coin-panel").show();
        $(".request-coin-panel").hide();
      });
      $("#requestCoin").click(function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $(".receive-coin-panel").hide();
        $(".request-coin-panel").show();
      })
    });
  }

  render() {
    return (
      <section>
        <a className="btn btn-circle white btn-lg bg-darkpurple send-coin" data-toggle="modal" href="#receivecoin"> Receive Coins </a>
        <div id="receivecoin" className="modal fade" tabIndex="-1" data-width="700">
          <div className="modal-header">
            <span className="modal-title active" id="receiveCoin">Receive Coins</span>
            <span className="modal-title" id="requestCoin">Request Coins</span>
            <span className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close"></i></span>
          </div>
          <div className="modal-body">
            <div className="receive-coin-panel">
              <div className="row-item">
                <div className="form-group">
                  <label className="col-md-2 control-label">Public Address</label>
                  <div className="col-md-10">
                    <QRCode value="http://facebook.github.io/react/" size={190} />
                  </div>
                </div>
              </div>
              <div className="row-item">
                <div className="form-group">
                  <label className="col-md-2 control-label single-label"></label>
                  <div className="col-md-10">
                    <button type="button" className="btn btn-circle white btn-sm custom-btn email-btn">Send Address via email</button>
                  </div>
                </div>
              </div>
              <div className="row-item">
                <div className="form-group">
                  <label className="col-md-2 control-label single-label"></label>
                  <div className="col-md-10">
                    <button type="button" className="btn btn-circle white btn-sm custom-btn">Send Address via sms</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="request-coin-panel">
              <div className="unit-price">$2.65 usd per coin </div>
              <div className="row-item">
                <div className="form-group">
                  <label className="col-md-2 control-label single-label">Amount</label>
                  <div className="col-md-10">
                    <input type="text" className="form-control" placeholder="0 BAL" />
                    <span className="request-amount">0 USD</span>
                  </div>
                </div>
              </div>
              <div className="row-item">
                <div className="form-group">
                  <label className="col-md-2 control-label">Public Address</label>
                  <div className="col-md-10">
                    <QRCode value="http://facebook.github.io/react/" size={190} />
                  </div>
                </div>
              </div>
              <div className="row-item">
                <div className="form-group">
                  <label className="col-md-2 control-label single-label"></label>
                  <div className="col-md-10">
                    <button type="button" className="btn btn-circle white btn-sm custom-btn email-btn">Request via email</button>
                  </div>
                </div>
              </div>
              <div className="row-item">
                <div className="form-group">
                  <label className="col-md-2 control-label single-label"></label>
                  <div className="col-md-10">
                    <button type="button" className="btn btn-circle white btn-sm custom-btn">Request via sms</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
          </div>
        </div>
      </section>
    );
  }
}

export default ReceiveCoin;
import React from 'react';
import {connect} from 'react-redux';
import QrReader from 'react-qr-reader'
import { withRouter, NavLink } from 'react-router-dom';
import './index.scss';


class SendCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isScan: false,
      delay: 300,
      result: 'No result',
    }

    this.handleScan         = this.handleScan.bind(this);
    this.openImageDialog    = this.openImageDialog.bind(this);
  }

  _onSubmit() {
    $("#sendcoin").modal('hide');
  }

  openImageDialog() {
    this.refs.qrReader1.openImageDialog()
  }

  handleScan(data){
    if(data){
      this.setState({
        result: data,
      })
    }
  }
  handleError(err){
    console.error(err)
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
            <div className="row row-item">
              <div className="form-group">
                <label className="col-md-2 control-label single-label">To</label>
                <div className="col-md-10">
                  <button 
                    type="button"
                    onClick={() => this.setState({isScan: true}) } 
                    className="btn btn-circle white btn-lg bg-darkgreen scan-btn">Scan Code</button>
                </div>
              </div>
            </div>
            {
              this.state.isScan
                ? <div className="row row-item">
                    <div className="col-md-9">
                      <QrReader
                        ref="qrReader1"
                        delay={this.state.delay}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ width: '100%' }}
                        legacyMode />
                      <p>{this.state.result}</p>
                    </div>
                    <div className="col-md-3">
                      <input
                        type="button"
                        onClick={() => this.openImageDialog()}
                        value="Open Image"
                        className="btn btn-circle white btn-lg" />
                    </div>
                  </div>
                : null
            }
            
            <div className="row row-item">
              <div className="unit-price">$2.65 usd per coin </div>
              <div className="form-group">
                <label className="col-md-2 control-label single-label amount-label">Amount</label>
                <div className="col-md-10">
                  <input type="text" className="form-control" placeholder="123 6th St. 32904" />
                </div>
              </div>
            </div>
            <div className="row row-item">
              <div className="form-group">
                <label className="col-md-2 control-label single-label">Memo</label>
                <div className="col-md-10">
                  <input type="text" className="form-control" placeholder="32904" />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SendCoin));
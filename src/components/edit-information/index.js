import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { changeBusinessStatus } from '../../actions/business';
import './index.scss';


class EditInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      businessName: this.props.data.businessName || '',
      bussinessAddress: this.props.data.bussinessAddress || '',
      city: this.props.data.city || '',
      state: this.props.data.state || '',
      zipcode: this.props.data.zipcode || '',
      contactName: this.props.data.contactName || '',
      email: this.props.data.email || '',
      phone: this.props.data.phone || ''
    }

    this.editBusiness = this.editBusiness.bind(this);
    this._fileInputChange = this._fileInputChange.bind(this);
  }

  editBusiness() {
    if (this.state.businessName === '' ||
        this.state.bussinessAddress === '' ||
        this.state.city === '' ||
        this.state.state === '' ||
        this.state.zipcode === '' ||
        this.state.contactName === '' ||
        this.state.email === '' ||
        this.state.phone === '') {
      alert('must add all informaiton!');
    } else {
      this.props.changeBusinessStatus(this.state);
      $("#responsive").modal('hide');  
    } 
  }

  _upload() {
    $("#file-upload").trigger('click');
  }

  _fileInputChange(e) {
    console.log(e)
  }

  render() {
    return (
      <section style={{marginLeft: 'auto'}}>
        <a className="btn btn-circle white btn-sm flex-right " data-toggle="modal" href="#responsive"> Edit Information </a>
        <div id="responsive" className="modal container fade" tabIndex="-1" data-width="700">
          <div className="modal-header">
            <h4 className="modal-title">Edit Business Information</h4>
            <span className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close"></i></span>
          </div>
          <div className="modal-body">
            <div className="content-logo">
              <input 
                type="file" 
                style={{ display: 'none' }} 
                onChange={(e) => { console.log('AAA', e.target.value); this._fileInputChange(e.target.value) }}
                id="file-upload" />
              <NavLink 
                className="btn btn-circle white btn-sm" 
                onClick={this._upload.bind(this)}
                to=""
                >Change Picture</NavLink>
            </div>
            <div className="row-item">
              <div className="form-group">
                <label className="col-md-2 control-label">Business Name</label>
                <div className="col-md-10">
                  <input 
                    type="text" 
                    className="form-control" 
                    value={this.state.businessName}
                    onChange={(e) => this.setState({ businessName: e.target.value }) }
                    placeholder="The French Cuisine" />
                </div>
              </div>
            </div>
            <div className="row-item">
              <div className="form-group">
                <label className="col-md-2 control-label">Business Address</label>
                <div className="col-md-10">
                  <input 
                    type="text" 
                    className="form-control"
                    value={this.state.bussinessAddress} 
                    onChange={(e) => this.setState({ businessName: e.target.value }) }
                    placeholder="123 6th St. 32904" />
                </div>
              </div>
            </div>
            <div className="row-item">
              <div className="col-md-6 no-padding">
                <div className="form-group">
                  <label className="col-md-4 control-label single-label">City</label>
                  <div className="col-md-8">
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.city} 
                      onChange={(e) => this.setState({ city: e.target.value }) }
                      placeholder="Melbourne" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 no-padding">
                <div className="form-group no-padding">
                  <label className="col-md-4 control-label single-label">State</label>
                  <div className="col-md-8">
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.state} 
                      onChange={(e) => this.setState({ state: e.target.value }) }
                      placeholder="Florida" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row-item">
              <div className="form-group">
                <label className="col-md-2 control-label">Zip Code</label>
                <div className="col-md-10">
                  <input 
                    type="text" 
                    className="form-control" 
                    value={this.state.zipcode} 
                    onChange={(e) => this.setState({ zipcode: e.target.value }) }
                    placeholder="32904" />
                </div>
              </div>
            </div>
            <div className="row-item">
              <div className="form-group">
                <label className="col-md-2 control-label">Contact Name</label>
                <div className="col-md-10">
                  <input 
                    type="text" 
                    className="form-control" 
                    value={this.state.contactName} 
                    onChange={(e) => this.setState({ contactName: e.target.value }) }
                    placeholder="John Doe" />
                </div>
              </div>
            </div>
            <div className="row-item">
              <div className="col-md-6 no-padding">
                <div className="form-group">
                  <label className="col-md-4 control-label">Email Address</label>
                  <div className="col-md-8">
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.email} 
                      onChange={(e) => this.setState({ email: e.target.value }) }
                      placeholder="mail@sample.com" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 no-padding">
                <div className="form-group">
                  <label className="col-md-4 control-label single-label">Phone</label>
                  <div className="col-md-8">
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.phone} 
                      onChange={(e) => this.setState({ phone: e.target.value }) }
                      placeholder="0123456789" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
              <button 
                type="button" 
                onClick={()=>this.editBusiness()}
                className="btn btn-circle white btn-lg bg-darkgreen">
                Save
              </button>
          </div>
        </div>
      </section>
    );
  }
}

EditInformation.propTypes = {
  data: PropTypes.object
}

const mapDispatchToProps = (dispatch) => {
  return ({
    changeBusinessStatus: (data) => { changeBusinessStatus(data, dispatch); }
  });
}

const mapStateToProps = (state) => {
  return ({
    businesses: state.businesses.businesses
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditInformation));
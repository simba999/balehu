import React from 'react';
import './index.scss';


class EditInformation extends React.Component {
  constructor(props) {
    super(props);
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
              <a className="btn btn-circle white btn-sm" href="#">Change Picture</a>
            </div>
            <div className="row-item">
              <div className="form-group">
                <label className="col-md-2 control-label">Business Name</label>
                <div className="col-md-10">
                  <input type="text" className="form-control" placeholder="The French Cuisine" />
                </div>
              </div>
            </div>
            <div className="row-item">
              <div className="form-group">
                <label className="col-md-2 control-label">Business Address</label>
                <div className="col-md-10">
                  <input type="text" className="form-control" placeholder="123 6th St. 32904" />
                </div>
              </div>
            </div>
            <div className="row-item">
              <div className="col-md-6 no-padding">
                <div className="form-group">
                  <label className="col-md-4 control-label single-label">City</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" placeholder="Melbourne" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 no-padding">
                <div className="form-group no-padding">
                  <label className="col-md-4 control-label single-label">State</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" placeholder="Florida" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row-item">
              <div className="form-group">
                <label className="col-md-2 control-label">Zip Code</label>
                <div className="col-md-10">
                  <input type="text" className="form-control" placeholder="32904" />
                </div>
              </div>
            </div>
            <div className="row-item">
              <div className="form-group">
                <label className="col-md-2 control-label">Contact Name</label>
                <div className="col-md-10">
                  <input type="text" className="form-control" placeholder="John Doe" />
                </div>
              </div>
            </div>
            <div className="row-item">
              <div className="col-md-6 no-padding">
                <div className="form-group">
                  <label className="col-md-4 control-label">Email Address</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" placeholder="mail@sample.com" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 no-padding">
                <div className="form-group">
                  <label className="col-md-4 control-label single-label">Phone</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" placeholder="0123456789" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
              <button type="button" className="btn btn-circle white btn-lg bg-darkgreen">Save</button>
          </div>
        </div>
      </section>
    );
  }
}

export default EditInformation;
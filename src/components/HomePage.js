import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import EditInformation from './edit-information';
import SendCoin from './send-coin';
import ReceiveCoin from './receive-coin';
import Header from './header';


class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      page: 0,                                // current page number
      pages: null,                            // total number of pages
      pageSize: 20,                           // number of records in one page
      loading: true,                          // true if data is not loaded
      columns: [
        {
          Header: "Name",
          accessor: "Name"
        },
        {
          Header: "Symbol",
          accessor: "Symbol"
        }, 
        {
          Header: "ImageUrl",
          accessor: "ImageUrl"
        },
        {
          Header: "ProofType",
          accessor: "ProofType"
        },
        {
          Header: "Algorithm",
          accessor: "Algorithm"
        }
      ]
    }
  }

  componentDidMount() {
    const data = [
      { label: 'Active', data: '33.33' },
      { label: 'Paused', data: '33.33' },
      { label: 'Scheduled', data: '33.34' },
    ]

    $(document).ready(function() {
      // change status of switch
      $(".custom-switch").click(function() {
        if ($(this).hasClass('inactive')) {
          $(this).removeClass('inactive')
        } else {
          $(this).addClass('inactive')
        }
      })
      // Chart pie
      if ($('#donut').size() !== 0) {
        $.plot($("#donut"), data, {
          series: {
            pie: {
              innerRadius: 0.7,
              radius: 1,
              show: true
            }
          }
        });
      }
    })
  }

  render() {
    return (
      <div className="page-container-bg-solid">
        {/* END HEADER */}
        <div className="page-wrapper">
          <Header />
          <div className="page-wrapper-row full-height">
            <div className="page-wrapper-middle">
              {/* Begin body */}
              <div className="page-container">
                <div className="page-content-wrapper">
                  <div className="page-content">
                    <div className="container">
                      {/* BEGIN UPSIDE PANEL */}
                      <div className="row upper-panel">
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                          <div className="portlet light profile-sidebar-portlet no-padding auto-full">
                            <div className="profile-userpic">
                              <img src="styles/assets/pages/img/food-image2.png" className="img-responsive my-image" alt="food-image" />
                            </div>
                            <div className="profile-usermenu custom-profile-menu">
                              <ul className="nav">
                                <li className="flex-box active">
                                  <span className="icon-avatar"><i className="icon-map"></i></span>
                                  <span className="description">123 6th St. <br />Melbourne, Florida 32904</span>
                                </li>
                                <li>
                                  <span className="icon-avatar"><i className="fa fa-phone"></i></span>
                                  <span className="description"> 123-45-67-89</span>
                                </li>
                                <li>
                                    <span className="icon-avatar"><i className="fa fa-user"></i></span>
                                    <span className="description"> John Doe</span>
                                </li>
                                <li className="flex-box">
                                  <EditInformation />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                          <div className="portlet light portlet-fit custom-portlet auto-full">
                            <div className="portlet-inner">
                              <div className="portlet_title">Wallet</div>
                              <div className="button-grps">
                                <SendCoin />
                                <ReceiveCoin />
                              </div>
                              <div className="">
                                <div className="item-header">
                                  <span className="item-label">Balehu Coins</span>
                                  <span className="item-price">64.00</span>
                                </div>
                                <div className="form-group form-md-line-input item-bottom-height">
                                  <label htmlFor="form_control_1" className="color-lightgrey">Short description of Balehu Coin</label>
                                </div>
                              </div>
                              <hr className="break-line" />
                              <div className="">
                                <div className="item-header">
                                  <span className="item-label">Gift Card Balance</span>
                                  <span className="item-price">240.00</span>
                                </div>
                                <div className="form-group form-md-line-input item-bottom-height">
                                  <label htmlFor="form_control_1" className="color-lightgrey">Short description of Gift Balance</label>
                                </div>
                              </div>
                              <div className="row item-bottom-height">
                                <button type="button" className="btn btn-circle white btn-sm pull-right">Transfer gift</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                          <div className="portlet light portlet-fit custom-portlet auto-full">
                            <div className="portlet-inner">
                              <div className="portlet_title">Social Networks</div>
                              <div className="social-panel">
                                <span className="social-icon-wrapper"><i className="fa fa-facebook-official"></i></span>
                                <span className="item-label">Facebook</span>
                                <button type="button" className="btn btn-circle white btn-sm flex-right">Add account</button>
                              </div>
                              <div className="">
                                <div className="form-group form-md-line-input no-bottom">
                                    <div className="input-icon right">
                                        <input type="text" className="form-control" placeholder="French Cuisine" />
                                        <i className="fa fa-close"></i>
                                    </div>
                                </div>
                              </div>
                              <div className="">
                                <div className="form-group form-md-line-input">
                                    <div className="input-icon right">
                                        <input type="text" className="form-control" placeholder="French Breakfast" />
                                        <i className="fa fa-close"></i>
                                    </div>
                                </div>
                              </div>
                              <div className="social-panel">
                                <span className="social-icon-wrapper"><i className="fa fa-twitter"></i></span>
                                <span className="item-label">Twitter</span>
                                <button type="button" className="btn btn-circle white btn-sm flex-right">Add account</button>
                              </div>
                              <div className="">
                                <div className="form-group form-md-line-input">
                                    <div className="input-icon right">
                                        <input type="text" className="form-control" placeholder="French Cuisine" />
                                        <i className="fa fa-close"></i>
                                    </div>
                                </div>
                              </div>
                              <div className="social-panel">
                                <span className="social-icon-wrapper"><i className="fa fa-instagram"></i></span>
                                <span className="item-label">Instagram</span>
                                <button type="button" className="btn btn-circle white btn-sm flex-right">Add account</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* BEGIN DOWNSIDE PANEL */}
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                          <div className="portlet light profile-sidebar-portlet no-padding">
                            <div className="promotion-panel">
                              <div className="title">All Promotions</div>
                              <div className="text-center">
                                <NavLink 
                                  to="/promotion"
                                  className="btn btn-circle white btn-lg flex-right color-lightgreen">
                                  Add New Promotion
                                </NavLink>
                              </div>
                            </div>
                            <div className="analytics-panel">
                              <div className="title color-strong">This week</div>
                              <div className="content row">
                                <div className="col-md-6">
                                  <div id="donut" className="chart"></div>
                                </div>
                                <div className="col-md-6">

                                </div>
                              </div>
                              <div className="footer text-center">
                                <button type="button" className="btn btn-circle white btn-lg flex-right">View All Analytics</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                          <div className="portlet light promotion-portlet">
                            {/* content tab */}
                            <div className="portlet-title tabbable-line bg-white">
                              <div className="caption caption-md">
                                <i className="icon-globe theme-font hide"></i>
                                <span className="caption-subject color-lightgrey">All Promotions</span>
                              </div>
                              <ul className="nav nav-tabs pull-left">
                                <li className="active">
                                  <a href="#tab_1_1" data-toggle="tab"> Active </a>
                                </li>
                                <li>
                                  <a href="#tab_1_2" data-toggle="tab"> Paused </a>
                                </li>
                                <li>
                                  <a href="#tab_1_3" data-toggle="tab"> Scheduled </a>
                                </li>
                              </ul>
                            </div>
                            {/* content body */}
                            <div className="portlet-body bg-white content-panel">
                              <div className="tab-content">
                                <div className="tab-pane active" id="tab_1_1">
                                  <div className="item no-top">
                                    <div className="item-avatar">
                                      <img src="styles/assets/pages/img/sample.png" className="" />
                                    </div>
                                    <div className="item-description">
                                      <strong>Friday Salad Specials!</strong>
                                      <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</span>
                                    </div>
                                    <div className="item-btn">
                                      <button type="button" className="btn btn-circle white btn-lg">Analytics</button>
                                    </div>
                                    <div className="item-switch">
                                      <strong>Active</strong>
                                      <div className="custom-switch">
                                        <div className="ring"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="item">
                                    <div className="item-avatar">
                                      <img src="styles/assets/pages/img/sample.png" className="" />
                                    </div>
                                    <div className="item-description">
                                      <strong>Friday Salad Specials!</strong>
                                      <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</span>
                                    </div>
                                    <div className="item-btn">
                                      <button type="button" className="btn btn-circle white btn-lg">Analytics</button>
                                    </div>
                                    <div className="item-switch">
                                      <strong>Active</strong>
                                      <div className="custom-switch">
                                        <div className="ring"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="item">
                                    <div className="item-avatar">
                                      <img src="styles/assets/pages/img/sample.png" className="" />
                                    </div>
                                    <div className="item-description">
                                      <strong>Friday Salad Specials!</strong>
                                      <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...</span>
                                    </div>
                                    <div className="item-btn">
                                      <button type="button" className="btn btn-circle white btn-lg">Analytics</button>
                                    </div>
                                    <div className="item-switch">
                                      <strong>Active</strong>
                                      <div className="custom-switch">
                                        <div className="ring"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="tab-pane" id="tab_1_2">
                                  <h1>Paused TAB</h1>
                                </div>
                                <div className="tab-pane" id="tab_1_3">
                                  <h1>Scheduled TAB</h1>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End body */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(HomePage);


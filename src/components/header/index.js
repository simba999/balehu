import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  _logout() {
    window.localStorage.clear();
    this.props.history.push('/login');
  }

  render() {
    return(
      <div className="page-wrapper-row">
        <div className="page-wrapper-top">
          {/* BEGIN HEADER */}
            <div className="page-header my-header-height">
              <div className="page-header-top">
                <div className="container">
                  <div className="page-logo">
                    <a href="#"><img src="styles/assets/pages/img/balehu-logo.png" className="logo" alt="logo" /></a>
                  </div>
                  {/* RESPONSIVE MENU TOOGLE */}
                  <a href="javascript:;" className="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
                    <span></span>
                  </a>
                  <div className="top-menu">
                    <ul className="nav navbar-nav pull-right">
                      <li className="dropdown dropdown-extended quick-sidebar-toggler">
                          <span className="sr-only">Toggle Quick Sidebar</span>
                          <i className="icon-logout" onClick={this._logout.bind(this)}></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
  });
}

const mapStateToProps = (state) => {
  return ({
    businesses: state.businesses.businesses
  });
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
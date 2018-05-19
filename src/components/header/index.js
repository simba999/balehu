import React from 'react';


class Header extends React.Component {
  constructor(props) {
    super(props)
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
                          <i className="icon-logout"></i>
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

export default Header;
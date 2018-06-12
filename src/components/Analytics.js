import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {AreaChart} from 'react-easy-chart';
import { createNewPromotion } from '../actions/promotion';
import Header from './header';
import ToolTip from './tooltip';
import Popup from './popup';
import '../styles/analytics.scss';


const DATA = [
  [
    { x: '1-Jan-15', y: 20 },
    { x: '3-Jan-15', y: 40 },
    { x: '4-Jan-15', y: 45 },
    { x: '5-Jan-15', y: 76 },
    { x: '6-Jan-15', y: 80 },
    { x: '7-Jan-15', y: 10 },
    { x: '10-Jan-15', y: 37 },
    { x: '11-Jan-15', y: 45 },
    { x: '12-Jan-15', y: 76 },
    { x: '13-Jan-15', y: 38 },
    { x: '14-Jan-15', y: 96 },
    { x: '15-Jan-15', y: 88 },
    { x: '16-Jan-15', y: 13 },
    { x: '18-Jan-15', y: 54 },
    { x: '19-Jan-15', y: 69 },
    { x: '20-Jan-15', y: 35 },
    { x: '22-Jan-15', y: 49 },
    { x: '23-Jan-15', y: 85 },
    { x: '25-Jan-15', y: 46 },
    { x: '28-Jan-15', y: 55 },
    { x: '30-Jan-15', y: 20 }
  ],
  [
    { x: '1-Jan-15', y: 60 },
    { x: '3-Jan-15', y: 90 },
    { x: '4-Jan-15', y: 15 },
    { x: '5-Jan-15', y: 36 },
    { x: '6-Jan-15', y: 40 },
    { x: '7-Jan-15', y: 60 },
    { x: '10-Jan-15', y: 67 },
    { x: '11-Jan-15', y: 25 },
    { x: '12-Jan-15', y: 96 },
    { x: '13-Jan-15', y: 88 },
    { x: '14-Jan-15', y: 26 },
    { x: '15-Jan-15', y: 38 },
    { x: '16-Jan-15', y: 43 },
    { x: '18-Jan-15', y: 79 },
    { x: '19-Jan-15', y: 19 },
    { x: '20-Jan-15', y: 5 },
    { x: '22-Jan-15', y: 49 },
    { x: '23-Jan-15', y: 35 },
    { x: '25-Jan-15', y: 16 },
    { x: '28-Jan-15', y: 95 },
    { x: '30-Jan-15', y: 68 }
  ]
];

const DATA2 = [
  [
    { x: '1-Jan-15', y: 20 },
    { x: '3-Jan-15', y: 40 },
    { x: '4-Jan-15', y: 45 },
    { x: '5-Jan-15', y: 76 },
    { x: '6-Jan-15', y: 80 },
    { x: '7-Jan-15', y: 10 },
    { x: '10-Jan-15', y: 37 },
    { x: '11-Jan-15', y: 45 },
    { x: '12-Jan-15', y: 76 },
    { x: '13-Jan-15', y: 38 },
    { x: '14-Jan-15', y: 96 },
    { x: '15-Jan-15', y: 88 },
    { x: '16-Jan-15', y: 13 },
    { x: '18-Jan-15', y: 54 },
    { x: '19-Jan-15', y: 69 },
    { x: '20-Jan-15', y: 35 },
    { x: '22-Jan-15', y: 49 },
    { x: '23-Jan-15', y: 85 },
    { x: '25-Jan-15', y: 46 },
    { x: '28-Jan-15', y: 55 },
    { x: '30-Jan-15', y: 20 }
  ],
  [
    { x: '1-Jan-15', y: 60 },
    { x: '3-Jan-15', y: 90 },
    { x: '4-Jan-15', y: 15 },
    { x: '5-Jan-15', y: 36 },
    { x: '6-Jan-15', y: 40 },
    { x: '7-Jan-15', y: 60 },
    { x: '10-Jan-15', y: 67 },
    { x: '11-Jan-15', y: 25 },
    { x: '12-Jan-15', y: 96 },
    { x: '13-Jan-15', y: 88 },
    { x: '14-Jan-15', y: 26 },
    { x: '15-Jan-15', y: 38 },
    { x: '16-Jan-15', y: 43 },
    { x: '18-Jan-15', y: 79 },
    { x: '19-Jan-15', y: 19 },
    { x: '20-Jan-15', y: 5 },
    { x: '22-Jan-15', y: 49 },
    { x: '23-Jan-15', y: 35 },
    { x: '25-Jan-15', y: 16 },
    { x: '28-Jan-15', y: 95 },
    { x: '30-Jan-15', y: 68 }
  ]
];

const AREA_COLORS = ['yellow', 'purple', 'green'];
const AREA_COLORS2 = ['black', 'blue'];
const AREA_COLORS3 = ['grey', 'red'];

const SUB_CATEGORY = [
  { name: 'Reach'},
  { name: 'Engagement'},
  { name: 'Redeem'},
];

const SUB_CATEGORY2 = [
  { name: 'Reach'},
  { name: 'Engagement'},
];


class Analytics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 200,
      height: 200
    };
    
    this.measure = this.measure.bind(this);
  }
 
  measure () {
    let rect = this.container.getBoundingClientRect();
    if(this.state.width !== rect.width || this.state.height !== rect.height){
      this.setState({
        width: rect.width, 
        height: rect.height
      });
    }
  }
  componentDidMount (){
     this.measure();
  }

  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: `${e.screenY - 10}px`,
      left: `${e.screenX + 10}px`,
      y: d.y,
      x: d.x
    });
  }

  createTooltip() {
    if (this.state.showToolTip) {
      return (
        <ToolTip
          top={this.state.top}
          left={this.state.left}
        >
            The x value is {this.state.x} and the y value is {this.state.y}
        </ToolTip>
      );
    }
    return false;
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({ top: `${e.y - 10}px`, left: `${e.x + 10}px` });
    }
  }

  mouseOutHandler() {
    this.setState({ showToolTip: false });
  }

  render() {
    console.log(this.state);

    return (
      <div className="page-container-bg-solid">
        <div className="page-wrapper">
          <Header />
          <div className="page-wrapper-row full-height">
            <div className="page-wrapper-middle">
              {/* Begin body */}
              <div className="page-container">
                <div className="page-content-wrapper">
                  <div className="page-content">
                    <Popup
                      top={this.state.top}
                      left={this.state.left}
                    />
                    <div className="container no-padding create-promotion-page">
                      <div className="portlet light promotion-portlet">
                        {/* content tab */}
                        <div className="portlet-title tabbable-line bg-white">
                          <div className="caption caption-md">
                            <i className="icon-globe theme-font hide"></i>
                            <span className="analytics-subject">Business Performance</span>
                            <span className="analytics-sub-heading">Food</span>
                          </div>
                          <ul className="nav nav-tabs">
                            <li className="active">
                              <a href="#balehu_marketplace_tab" data-toggle="tab"> Balehu Marketplace </a>
                            </li>
                            <li>
                              <a href="#facebook_tab" data-toggle="tab"> Facebook </a>
                            </li>
                            <li>
                              <a href="#twitter_tab" data-toggle="tab"> Scheduled </a>
                            </li>
                          </ul>
                        </div>
                        {/* content body */}
                        <div className="portlet-body bg-white content-panel">
                          <div className="tab-content">
                            <div
                              ref={(container)=>{this.container = container}}
                              className="tab-pane active" 
                              id="balehu_marketplace_tab">
                              <div className="row">
                                <ul className="inline-list">
                                {
                                  SUB_CATEGORY.map((category, idx) => {
                                    return (
                                      <li>
                                        <span className="circle-i-color" style={{background: AREA_COLORS[idx]}}></span>
                                        <span>{category.name}</span>
                                      </li>
                                    )
                                  })
                                }
                                </ul>
                              </div>
                              <AreaChart
                                xType={'time'}
                                yDomainRange={[0, 100]}
                                axes
                                dataPoints
                                xTicks={16}
                                yTicks={5}
                                areaColors={AREA_COLORS}
                                grid
                                mouseOverHandler={this.mouseOverHandler.bind(this)}
                                mouseOutHandler={this.mouseOutHandler.bind(this)}
                                mouseMoveHandler={this.mouseMoveHandler.bind(this)}
                                tickTimeDisplayFormat={'%_d'}
                                interpolate={'cardinal'}
                                width={this.state.width}
                                height={238}
                                data={DATA}
                              />
                            </div>
                            <div
                              className="tab-pane" id="facebook_tab">
                                <div className="row">
                                  <ul className="inline-list">
                                  {
                                    SUB_CATEGORY2.map((category, idx) => {
                                      return (
                                        <li>
                                          <span className="circle-i-color" style={{background: AREA_COLORS2[idx]}}></span>
                                          <span>{category.name}</span>
                                        </li>
                                      )
                                    })
                                  }
                                  </ul>
                                </div>
                                <AreaChart
                                  xType={'time'}
                                  yDomainRange={[0, 100]}
                                  axes
                                  dataPoints
                                  xTicks={16}
                                  yTicks={5}
                                  areaColors={AREA_COLORS2}
                                  grid
                                  mouseOverHandler={this.mouseOverHandler.bind(this)}
                                  mouseOutHandler={this.mouseOutHandler.bind(this)}
                                  mouseMoveHandler={this.mouseMoveHandler.bind(this)}
                                  tickTimeDisplayFormat={'%_d'}
                                  interpolate={'cardinal'}
                                  width={this.state.width}
                                  height={238}
                                  data={DATA2}
                                />
                            </div>
                            <div 
                              className="tab-pane" id="twitter_tab">
                                <div className="row">
                                  <ul className="inline-list">
                                  {
                                    SUB_CATEGORY2.map((category, idx) => {
                                      return (
                                        <li>
                                          <span className="circle-i-color" style={{background: AREA_COLORS3[idx]}}></span>
                                          <span>{category.name}</span>
                                        </li>
                                      )
                                    })
                                  }
                                  </ul>
                                </div>
                                <AreaChart
                                  xType={'time'}
                                  yDomainRange={[0, 100]}
                                  axes
                                  dataPoints
                                  xTicks={16}
                                  yTicks={5}
                                  areaColors={AREA_COLORS3}
                                  grid
                                  mouseOverHandler={this.mouseOverHandler.bind(this)}
                                  mouseOutHandler={this.mouseOutHandler.bind(this)}
                                  mouseMoveHandler={this.mouseMoveHandler.bind(this)}
                                  tickTimeDisplayFormat={'%_d'}
                                  interpolate={'cardinal'}
                                  width={this.state.width}
                                  height={238}
                                  data={DATA2}
                                />
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
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    createNewPromotion: (data) => { createNewPromotion(data, dispatch); }
  });
}

const mapStateToProps = (state) => {
  return ({
    promotions: state.promotions.promotions
  });
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Analytics));
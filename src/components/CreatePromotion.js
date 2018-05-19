import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import DateTime from 'react-datetime';
import { createNewPromotion } from '../actions/promotion';
import Header from './header';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

const TIME_FORMAT = "YYYY-MM-DD hh:mm:ss";


class CreateComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      details: '',
      uploadImage: '',
      offer: '',
      shareState: true,
      socialAccount: {},
      isDiscoverableHourDiaglogOpen: false,
      discoverableHour: moment().format(TIME_FORMAT),
      discoverableEnd: moment().format(TIME_FORMAT),
      discoverableDays: { 'Mon': true },
      position: {
        type: 'business',
        data: {}
      },
      schedulePauseStatus: true
    }

    this.onChangeThumbImage = this.onChangeThumbImage.bind(this);
    this._changeShareState = this._changeShareState.bind(this);
    this._onCreatePromotion = this._onCreatePromotion.bind(this);
    this._discoverableHourChange = this._discoverableHourChange.bind(this);
  }

  componentDidMount() {
    const self = this;

    $(document).ready(function() {

      CKEDITOR.replace("editor", {
        removePlugins: 'about',
        allowedContent: true
      });

      CKEDITOR.instances.editor.on('change', function () {
        let data = CKEDITOR.instances.editor.getData();
        self.setState({ details: data });
      }.bind(this));
      

      // image upload
      $("#upload-btn").click(function() {
        $("#file-upload").trigger("click");
      })


      // change status of switch
      $(".custom-switch").click(function() {
        // $(".custom-switch").addClass('inactive');

        if ($(this).hasClass('inactive')) {

          if ($(this).attr("val") === "coin") {
            $(this).removeClass('inactive');
            $("#promotionSwitch").addClass('inactive');
            $("#balehuValue").prop("disabled", true);
            $("#coinAmount").show();
          } else {
            $(this).removeClass('inactive');
            $("#coinSwitch").addClass('inactive');
            $("#balehuValue").prop("disabled", false);
            $("#coinAmount").hide();
          }
        } else {
          if ($(this).attr("val") === "coin") {
            $(this).addClass('inactive');
            $("#promotionSwitch").removeClass('inactive');

            $("#balehuValue").prop("disabled", false);
            $("#coinAmount").hide();
          } else {
            $(this).addClass('inactive');
            $("#coinSwitch").removeClass('inactive');

            $("#balehuValue").prop("disabled", true);
            $("#coinAmount").show();
          }
        }
      })

      // buttons from Mon to Sun
      $(".day-btn").click(function() {
          if ( $(this).hasClass('active') ) {
            $(this).removeClass('active');

            const discoverableDays = Object.assign({}, self.state.discoverableDays);
            delete discoverableDays[$(this).attr("val")];

            self.setState({ discoverableDays: discoverableDays });
          } else {
            $(this).addClass('active');
            const discoverableDays = Object.assign({}, self.state.discoverableDays);
            discoverableDays[$(this).attr("val")] = true;

            self.setState({ discoverableDays: discoverableDays });
          }
      });

      //get locations between business and current location
      $(".btn-loc").click(function() {
          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          if ( $(this).attr('val') === 'currentLoc' ) {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((res) => {
                console.log('##: ', res);
                const position = Object.assign({}, self.state.position);
                position['type'] = 'current';
                position['data'] = res;

                self.setState({ position: position })
              });
            } else {
              alert("can't get your current location!");
            }
          } else {
            const position = Object.assign({}, self.state.position);
            position['type'] = 'busniess';
            position['data'] = {};

            self.setState({ position: position }) 
          }
      });

      // check pause status
      $("input[name='ScheduleStatus']").click(function() {
        if ($(this).attr("value") == 0) {
          $("#schedulePauseDate").prop("disabled", true);
          self.setState({ schedulePauseStatus: true });
        } else {
          $("#schedulePauseDate").prop("disabled", false);
          self.setState({ schedulePauseStatus: false });
        }
      });
    });
  }

  onChangeThumbImage(e) {
    this.setState({ uploadImage: e.target.value });
  }

  _changeShareState(flag) {
    this.setState({ shareState: flag });
  }

  _onCreatePromotion() {
    let promotion = {};

    promotion['title'] = $("#promotionTitle").val();
    promotion['details'] = CKEDITOR.instances.editor.getData();
    promotion['shareState'] = this.state.shareState;
    promotion['category'] = $("#promotionCategory").val();

    if ($(".custom-switch").hasClass('inactive')) {
      // get coin amount
      if ($(this).attr("val") !== "coin") {
        promotion['balehuCoinAmount'] = $("#coinAmount").val();
        promotion['balehuValue'] = '';
      } else {
        // get balehu value
        promotion['balehuCoinAmount'] = '';
        promotion['balehuValue'] = $("#balehuValue").val();
      }
    }

    promotion['schedulePauseStatus'] = this.state.schedulePauseStatus;

    if (this.state.schedulePauseStatus) {
      promotion['schedulePauseDate'] = $("#schedulePauseDate").val();
    }

    let tmp = {};
    tmp['facebook'] = $("#facebookCheck").prop("checked");
    tmp['twitter'] = $("#twitterCheck").prop("checked");

    promotion['socialAccount'] = tmp;

    this.props.createNewPromotion(promotion);
    this.props.history.push('/');
  }

  _discoverableHourChange(val) {
    console.log('vale')
    if (val === 'pickhour') {
      this.setState({ isDiscoverableHourDiaglogOpen: true });
      setTimeout(()=> {
        // time picker 
        $('.timepicker-24').timepicker({
            autoclose: true,
            minuteStep: 5,
            showSeconds: false,
            showMeridian: true
        });

        $('.timepicker-end-24').timepicker({
            autoclose: true,
            minuteStep: 5,
            showSeconds: false,
            showMeridian: true
        });

        // handle input group button click
        $('.timepicker-24').parent('.input-group').on('click', '.input-group-btn', function(e){
            e.preventDefault();
            $(this).parent('.input-group').find('.timepicker-24').timepicker('showWidget');
        });

        $('.timepicker-end-24').parent('.input-group').on('click', '.input-group-btn', function(e){
            e.preventDefault();
            $(this).parent('.input-group').find('.timepicker-end-24').timepicker('showWidget');
        });

        $('.timepicker-24, .timepicker-end-24').timepicker('place'); //#modal is the id of the modal
      }, 500)
      
    } else {
      this.setState({ 
        discoverableHour: val,
        isDiscoverableHourDiaglogOpen: false
      });
    }
  }

  render() {
    console.log(this.state)
    return(
      <div className="page-container-bg-solid">
        <div className="page-wrapper">
          <Header />
          <div className="page-wrapper-row full-height">
            <div className="page-wrapper-middle">
              {/* Begin body */}
              <div className="page-container">
                <div className="page-content-wrapper">
                  <div className="page-content">
                    <div className="container no-padding create-promotion-page">
                      <div className="promotion-header">Create New Promotion</div>
                      <div className="promotion-body">
                        <section className="promotion-detail-panel">
                          <div className="row row-item">
                            <div className="row-item__title">Promotion Detail</div>
                          </div>
                          <div className="row row-item">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label">Picture</label>
                              <div className="col-md-9">
                                <input id="file-upload" style={{ display: 'none' }}  accept="image/*" type="file" onChange={(e) => this.onChangeThumbImage(e) } />
                                <button type="button" className="btn btn-circle white btn-sm bg-lightblue" id="upload-btn">upload file</button>
                              </div>
                            </div>
                          </div>
                          <div className="row row-item">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label">Headline</label>
                              <div className="col-md-9">
                                <input type="text" id="promotionTitle" className="form-control" placeholder="Enter Promotion’s Title" />
                              </div>
                            </div>
                          </div>
                          <div className="row row-item">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label">Details</label>
                              <div className="col-md-9">
                                <textarea name="editor" ref="contentVal" />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label">offer</label>
                              <div className="col-md-9 coin-wrapper">
                                <div className="coin-switch-panel">
                                  <div className="custom-switch" val="coin" id="coinSwitch">
                                    <div className="ring"></div>
                                  </div>
                                  <div className="ring-label">Balehu Coin</div>
                                </div>
                                <div className="coin-input-panel">
                                  <input type="text" id="coinAmount" className="" placeholder="Coin Amount" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label"></label>
                              <div className="col-md-9 flex-box m-t-15">
                                <div className="custom-switch inactive" val="promotion" id="promotionSwitch">
                                  <div className="ring"></div>
                                </div>
                                <div className="ring-label">Balehu promotion</div>
                              </div>
                            </div>
                          </div>
                          <div className="row row-item">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label">Balehu value</label>
                              <div className="col-md-9">
                                <input type="text" id="balehuValue" className="form-control" placeholder="Enter value" disabled />
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="promotion-balehu-market">
                          <div className="row row-item">
                            <div className="row-item__title">Balehu Marketplace</div>
                          </div>
                          <div className="row row-item">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label">Category</label>
                              <div className="col-md-9">
                                <select className="form-control" placeholder="Select Category" id="promotionCategory">
                                  <option value="food">Food</option>
                                  <option value="drinks">Drinks</option>
                                  <option value="shopping">Shopping</option>
                                  <option value="health">Health</option>
                                  <option value="music">Music</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row row-item">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label">Discoverable</label>
                              <div className="col-md-9 day-btn-group">
                                <div 
                                  className="day-btn btn active"
                                  val="Mon"
                                  >Mon</div>
                                <div 
                                  className="day-btn btn"
                                  val="Tue"
                                  >Tue</div>
                                <div className="day-btn btn" val="Wed">Wed</div>
                                <div className="day-btn btn" val="Thu">Thu</div>
                                <div className="day-btn btn" val="Fri">Fri</div>
                                <div className="day-btn btn" val="Sat">Sat</div>
                                <div className="day-btn btn" val="Sun">Sun</div>
                              </div>
                            </div>
                            <div className="form-group">
                              {/* <label className="col-md-3 control-label single-label"></label> */}
                              <div className="col-md-9">
                                <select 
                                  className="form-control m-t-15" 
                                  placeholder="All Day" 
                                  onChange={(e) => this._discoverableHourChange(e.target.value)}>
                                  <option value="all">All Day</option>
                                  <option value="mornings">Mornings(unitl 2pm)</option>
                                  <option value="afternoon">Afternoon / evening(12:00pm - 8:30pm), After hours (after 7pm)</option>
                                  <option value="pickhour">Pick Hours</option>
                                </select>
                                <div className="row m-t-15">
                                  <div className="col-md-6 no=padding">
                                    {
                                      this.state.isDiscoverableHourDiaglogOpen 
                                        ? <div className="input-group">
                                            <input 
                                              type="text" 
                                              id="startTime"
                                              className="form-control timepicker timepicker-24" />
                                            <span className="input-group-btn">
                                                <button className="btn default" type="button">
                                                    <i className="fa fa-clock-o"></i>
                                                </button>
                                            </span>
                                          </div>
                                        : null
                                    }
                                  </div>
                                  <div className="col-md-6">
                                    {
                                      this.state.isDiscoverableHourDiaglogOpen 
                                        ? <div className="input-group">
                                            <input 
                                              type="text" 
                                              id="startTime"
                                              className="form-control timepicker timepicker-end-24" />
                                            <span className="input-group-btn">
                                                <button className="btn default" type="button">
                                                    <i className="fa fa-clock-o"></i>
                                                </button>
                                            </span>
                                          </div>
                                        : null
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row row-item">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label">Pause</label>
                              <div className="col-md-9">
                                <div className="mt-radio-list">
                                    <label className="mt-radio"> I will pause it manually
                                      <input type="radio" value="0" name="ScheduleStatus" />
                                      <span></span>
                                    </label>
                                    <label className="mt-radio"> Schedule automatic pause
                                      <input type="radio" value="1" name="ScheduleStatus" defaultChecked />
                                      <span></span>
                                    </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row row-item">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label">Schedule Pause</label>
                              <div className="col-md-9">
                                <input 
                                  className="form-control form-control-inline input-medium date-picker" 
                                  size="16"
                                  id="schedulePauseDate"
                                  data-date-format="dd-mm-yyyy" 
                                  data-date-start-date="+0d"
                                  type="text" 
                                  value="" />
                                <span className="help-block"> Select date </span>
                              </div>
                            </div>
                          </div>
                          <div className="row row-item">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label">Location</label>
                              <div className="col-md-9">
                                <button className="btn btn-loc active col-md-6" val="busniessLoc">Business Location</button>
                                <button className="btn btn-loc col-md-6" val="currentLoc">My Current Location</button>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="social-share">
                          <div className="row row-item">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label">Share on</label>
                              <div className="col-md-9">
                                <div className="mt-checkbox-list">
                                    <label className="mt-checkbox">
                                      <input type="checkbox" id="facebookCheck" value="option1" />
                                      <i className="fa fa-lg fa-facebook-official"></i>
                                      <label className="check-right-label">SocialAccunt</label>
                                      <span></span>
                                    </label>
                                    <label className="mt-checkbox">
                                      <input type="checkbox" id="twitterCheck" value="option1" />
                                      <i className="fa fa-lg fa-twitter"></i>
                                      <label className="check-right-label">SocialAccunt</label>
                                      <span></span>
                                    </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row row-item">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label">Share off</label>
                              <div className="col-md-9">
                                <div className="mt-radio-list">
                                    <label className="mt-radio"> Share now
                                      <input 
                                        type="radio" 
                                        value="1" 
                                        name="socialShareState"  
                                        onClick={() => this._changeShareState(true)}
                                        defaultChecked />
                                      <span></span>
                                    </label>
                                    <label className="mt-radio"> Schedule for later
                                      <input 
                                        type="radio" 
                                        value="1" 
                                        onClick={() => this._changeShareState(false)}
                                        name="socialShareState" />
                                      <span></span>
                                    </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                      <div className="promotion-footer">
                        <div className="footer-btn-wrapper">
                          <button 
                            type="button" 
                            onClick={this._onCreatePromotion}
                            className="btn btn-circle white btn-sm bg-darkgreen">
                            save promotion
                          </button>
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
    promotions: state.promotions
  });
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateComponent));
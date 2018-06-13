import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import DateTime from 'react-datetime';
import { createNewPromotion } from '../actions/promotion';
import Header from './header';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

const TIME_FORMAT = "YYYY-MM-DD hh:mm:ss";


class CreatePromotion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      currentDate: moment().format('YYYY-MM-DD'),
      uploadImage: '',
      offer: '',
      isDiscoverableHourDiaglogOpen: false,
      discoverableHour: 'allday',
      discoveralbeStartTime: '',
      discoveralbeEndTime: '',
      position: {
        type: 'business',
        data: {}
      },
      shareState: true,
      details: '',
      title: '',
      category: 'food',
      balehuCoinAmount: '',
      balehuValue: '',
      schedulePauseStatus: true,
      schedulePauseDate: '',
      discoverableDays: { 'Mon': true },
      shareSocaialHour: moment().format(TIME_FORMAT),
      socialAccount: { 
        facebook: false,
        twitter: false
      },
      id: null,
    }

    this.onChangeThumbImage = this.onChangeThumbImage.bind(this);
    this._changeShareState = this._changeShareState.bind(this);
    this._onCreatePromotion = this._onCreatePromotion.bind(this);
    this._discoverableHourChange = this._discoverableHourChange.bind(this);
    this._numberValidate = this._numberValidate.bind(this);
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

      $('.date-picker').datepicker('place');
      // change status of switch
      $(".custom-switch").click(function() {
        if ($(this).hasClass('inactive')) {
          if ($(this).attr("val") === "coin") {
            $(this).removeClass('inactive');
            $("#promotionSwitch").addClass('inactive');
            $(".balehuValue").hide();
            $("#coinAmount").show();
          } else {
            $(this).removeClass('inactive');
            $("#coinSwitch").addClass('inactive');
            $(".balehuValue").show();
            $("#coinAmount").hide();
          }
        } else {
          if ($(this).attr("val") === "coin") {
            $(this).addClass('inactive');
            $("#promotionSwitch").removeClass('inactive');
            $(".balehuValue").show();
            $("#coinAmount").hide();
          } else {
            $(this).addClass('inactive');
            $("#coinSwitch").removeClass('inactive');
            $(".balehuValue").hide();
            $("#coinAmount").show();
          }
        }

        self.setState({
          balehuCoinAmount: 0,
          balehuValue: ''      
        })
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
            if (Object.keys(navigator.geolocation).length > 0) {
              navigator.geolocation.getCurrentPosition((res) => {
                const position = Object.assign({}, self.state.position);
                position['type'] = 'current';
                position['data'] = res;

                self.setState({ position: position });
              });
            } else {
              alert("can't get your current location!");
              $(this).removeClass('active');
              $(this).siblings().addClass('active');
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

  _numberValidate(val) {
    if (val == '') {
      this.setState({ balehuCoinAmount: '' });
    } else {
      if (parseInt(val)) {
        this.setState({ balehuCoinAmount: parseInt(val) });
      }
    }
  }

  _onCreatePromotion() {
    let promotion = {};

    promotion['title'] = $("#promotionTitle").val();
    promotion['details'] = CKEDITOR.instances.editor.getData();
    promotion['shareState'] = this.state.shareState;
    promotion['category'] = $("#promotionCategory").val();
    promotion['balehuCoinAmount'] = this.state.balehuCoinAmount;
    promotion['balehuValue'] = this.state.balehuValue;
    promotion['schedulePauseStatus'] = this.state.schedulePauseStatus;
    promotion['status'] = 'active';
    promotion['discoverableDays'] = this.state.discoverableDays;
    promotion['schedulePauseDate'] = $("#schedulePauseDate").val();
    if (!this.state.schedulePauseStatus) {
      
      promotion['status'] = false;
    } {
      promotion['status'] = true;
    }

    if (this.state.isDiscoverableHourDiaglogOpen) {
      promotion['discoverableHour'] = 'pickhour';
      promotion['discoveralbeStartTime'] = $("#startTime").val();
      promotion['discoveralbeEndTime'] = $("#endTime").val();
      
      if (moment(this.state.currentDate + ' ' + promotion['discoveralbeStartTime']) >= 
        moment(this.state.currentDate + ' ' + promotion['discoveralbeEndTime'])
      ) {
        alert('Time Error')
        return;
      }

    } else {
      promotion['discoverableHour'] = this.state.discoverableHour;
    }

    let tmp = {};
    tmp['facebook'] = $("#facebookCheck").prop("checked");
    tmp['twitter'] = $("#twitterCheck").prop("checked");

    promotion['socialAccount'] = tmp;
    promotion['shareSocaialHour'] = this.state.shareSocaialHour;

    if ( promotion['title'] === '' ||
         promotion['details'] === '' ||
         promotion['discoverableHour'] === '' ||
        ( promotion['balehuValue'] === '' && promotion['balehuCoinAmount'] === '')
    ) {
      alert("can't create a new promotion!");
    } else {
      this.props.createNewPromotion(promotion);
      CKEDITOR.instances.editor.destroy();
      this.props.history.push('/');
    }   
  }

  _discoverableHourChange(val) {
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

  _upload() {
    $("#file-upload").trigger('click');
  }

  _fileInputChange(e) {
    console.log(e)
  }

  render() {
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
                            <div className="business-image  ">
                              <div type="button" className="btn btn-circle white btn-sm" id="upload-btn">Change picture</div>
                            </div>
                          </div>
                          <div className="row row-item">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label">Headline</label>
                              <div className="col-md-9">
                                <input 
                                  type="text" 
                                  id="promotionTitle" 
                                  value={this.state.title}
                                  onChange={(e) => this.setState({ title: e.target.value }) }
                                  className="form-control"
                                  placeholder="Enter Promotion’s Title" />
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
                                  <div 
                                    className="custom-switch" 
                                    val="coin" id="coinSwitch">
                                    <div className="ring"></div>
                                  </div>
                                  <div className="ring-label">Balehu Coin</div>
                                </div>
                                <div className="coin-input-panel">
                                  <input 
                                    name="number"
                                    aria-required="true" 
                                    aria-invalid="true" 
                                    aria-describedby="number-error"
                                    type="text" 
                                    id="coinAmount" 
                                    className=""
                                    value={this.state.balehuCoinAmount}
                                    onChange={(e) => this._numberValidate(e.target.value)}
                                    placeholder="Coin Amount" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label"></label>
                              <div className="col-md-9 flex-box m-t-15">
                                <div 
                                  className="custom-switch inactive"  
                                  val="promotion" id="promotionSwitch">
                                  <div className="ring"></div>
                                </div>
                                <div className="ring-label">Balehu promotion</div>
                              </div>
                            </div>
                          </div>
                          <div className="row row-item">
                            <div className="form-group balehuValue">
                              <label className="col-md-3 control-label">Balehu promotion value</label>
                              <div className="col-md-9">
                                <input 
                                  type="text" 
                                  id="balehuValue" 
                                  className="form-control"
                                  value={this.state.balehuValue}
                                  onChange={(e) => this.setState({ balehuValue: e.target.value })}
                                  placeholder="Enter value" />
                              </div>
                            </div>
                          </div>
                        </section>
                        <hr className="line-break" />
                        <section className="promotion-balehu-market">
                          <div className="row row-item">
                            <div className="row-item__title">Balehu Marketplace</div>
                          </div>
                          <div className="row row-item">
                            <div className="form-group">
                              <label className="col-md-3 control-label single-label">Category</label>
                              <div className="col-md-9">
                                <select 
                                  className="form-control" 
                                  placeholder="Select Category" 
                                  value={this.state.category}
                                  onChange={(e) => this.setState({ category: e.target.value }) }
                                  id="promotionCategory">
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
                                  id="discoverableHourSelect"
                                  onChange={(e) => this._discoverableHourChange(e.target.value)}>
                                  <option value="allday">All Day</option>
                                  <option value="morning">Mornings(unitl 2pm)</option>
                                  <option value="afternoon">Afternoon / evening(12:00pm - 8:30pm)</option>
                                  <option value="night">After hours (after 7pm)</option>
                                  <option value="pickhour">Pick Hours</option>
                                </select>
                                <div className="row m-t-15">
                                  <div className="col-md-6">
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
                                        ? <div className="input-group end-time-group">
                                            <input 
                                              type="text" 
                                              id="endTime"
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
                                  type="text" />
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
                      </div>
                      <div className="promotion-footer">
                        <div className="footer-btn-wrapper">
                          <button 
                            type="button" 
                            onClick={this._onCreatePromotion}
                            className="btn btn-circle white btn-sm bg-darkgreen">
                            Save Promotion
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

CreatePromotion.propTypes = {
  data: PropTypes.object
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

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePromotion));
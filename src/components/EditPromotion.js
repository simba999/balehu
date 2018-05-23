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


class EditPromotion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      currentDate: moment().format('YYYY-MM-DD'),
      uploadImage: '',
      offer: '',
      isDiscoverableHourDiaglogOpen: false,
      discoverableHour: this.props.data.discoverableHour || 'allday',
      discoveralbeStartTime: this.props.data.discoveralbeStartTime || '',
      discoveralbeEndTime: this.props.data.discoveralbeEndTime || '',
      position: this.props.data.position || {
        type: 'business',
        data: {}
      },
      shareState: this.props.data.shareState || true,
      details: this.props.data.details || '',
      title: this.props.data.title || '',
      category: this.props.data.category || 'food',
      balehuCoinAmount: this.props.data.balehuCoinAmount || '',
      balehuValue: this.props.data.balehuValue || '',
      schedulePauseStatus: this.props.data.balehuValue || true,
      schedulePauseDate: this.props.data.schedulePauseDate || '',
      discoverableDays: this.props.data.discoverableDays || { 'Mon': true },
      shareSocaialHour: this.props.data.shareSocaialHour || moment().format(TIME_FORMAT),
      socialAccount: this.props.data.socialAccount || {},
      id: this.props.data.id || null,
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
      let editorId = "editor";

      if (self.state.id) {
        editorId += self.state.id; 
      }

      CKEDITOR.replace(editorId, {
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
            // $("#balehuValue").prop("disabled", true);
            $(".balehuValue").hide();
            $("#coinAmount").show();
          } else {
            $(this).removeClass('inactive');
            $("#coinSwitch").addClass('inactive');
            // $("#balehuValue").prop("disabled", false);
            $(".balehuValue").show();
            $("#coinAmount").hide();
          }
        } else {
          if ($(this).attr("val") === "coin") {
            $(this).addClass('inactive');
            $("#promotionSwitch").removeClass('inactive');

            // $("#balehuValue").prop("disabled", false);
            $(".balehuValue").show();
            $("#coinAmount").hide();
          } else {
            $(this).addClass('inactive');
            $("#coinSwitch").removeClass('inactive');

            // $("#balehuValue").prop("disabled", true);
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
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((res) => {
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

    // input existing values into dom
    if (this.state.balehuValue === "") {
      $(".balehuValue").hide();
      $("#coinAmount").show();
    } else {
      $(".balehuValue").show();
      $("#coinAmount").hide();
    }

    // from mon to sun
    const tmp = this.state.discoverableDays;
    for (let day in tmp) {
      const _selector = "#" + day;
      $(_selector).addClass('active');
    }

    // location setting
    if (!this.props.data.position) {
      $("#busniessLoc").addClass('active');
    } else {
      if (this.props.data.position.type != "business") {
        $("#currentLoc").addClass('active');
      } else {
        $("#busniessLoc").addClass('active')
      }
    }
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


  // action trigger when clicking save promotion button                 
  _onCreatePromotion() {
    let promotion                           = {};

    promotion['title']                      = $("#promotionTitle").val();
    promotion['details']                    = CKEDITOR.instances.editor.getData();
    promotion['shareState']                 = this.state.shareState;
    promotion['category']                   = $("#promotionCategory").val();
    promotion['balehuCoinAmount']           = this.state.balehuCoinAmount;
    promotion['balehuValue']                = this.state.balehuValue;
    promotion['schedulePauseStatus']        = this.state.schedulePauseStatus;
    promotion['status']                     = 'active';
    promotion['discoverableDays']           = this.state.discoverableDays;

    if (this.state.schedulePauseStatus) {

      promotion['schedulePauseDate']        = $("#schedulePauseDate").val();
      promotion['status']                   = false;

    } else {

      promotion['status']                   = true;
    }

    if (this.state.isDiscoverableHourDiaglogOpen) {

      promotion['discoverableHour']         = 'pickhour';
      promotion['discoveralbeStartTime']    = $("#startTime").val();
      promotion['discoveralbeEndTime']      = $("#endTime").val();
      
      if (moment(this.state.currentDate + ' ' + promotion['discoveralbeStartTime']) >= 
        moment(this.state.currentDate + ' ' + promotion['discoveralbeEndTime'])) 
      {
        alert('Time Error');
        return;
      }

    } else {
      promotion['discoverableHour'] = this.state.discoverableHour;
    }

    let tmp = {};
    tmp['facebook']                         = $("#facebookCheck").prop("checked");
    tmp['twitter']                          = $("#twitterCheck").prop("checked");

    promotion['socialAccount']              = tmp;
    promotion['shareSocaialHour']           = this.state.shareSocaialHour;

    if ( promotion['title'] === '' ||
         promotion['details'] === '' ||
         promotion['discoverableHour'] === '' ||
        ( promotion['balehuValue'] === '' && promotion['balehuCoinAmount'] === '')
    ) {

      alert("can't create a new promotion!");

    } else {

      this.props.createNewPromotion(promotion);
      this.props.history.push('/');

    }   
  }

  _discoverableHourChange(val, startTime=null, endTime=null, isEdit=false) {
    
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

      if (startTime && endTime) {

        setTimeout(()=> {
          $(".timepicker-24").val(startTime);
          $(".timepicker-end-24").val(endTime);
        }, 800);

      }
      
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

  _showDialog() {

    const self                            = this;
    const _selector                       = "#edit-promotion" + this.props.data.id;
    
    $(_selector).modal('show');

    if (this.props.data.socialAccount['facebook']) {
      $("#facebookCheck").prop("checked", true);
    }

    if (this.props.data.socialAccount['twitter']) {
      $("#twitterCheck").prop("checked", true);
    }

    // pause manually or automatically
    if (this.props.data.schedulePauseStatus) {
      $("#scheduleNowPause").prop("checked", true);
    } else {
      $("#scheduleLaterPause").prop("checked", true);
    }

    // social account share state
    if (this.props.data.shareState) {
      $("#socialShareNow").prop("checked", true);
    } else {
      $("#socialShareLater").prop("checked", true);
    }

    const state = Object.assign({}, this.state, this.props.data);
    this.setState(state);

    setTimeout(() => {

      $("#schedulePauseDate").val(self.state.schedulePauseDate);
      self._discoverableHourChange(self.state.discoverableHour, self.state.startTime, self.state.endTime, true);

    }, 1500);

  }

  render() {
    console.log(this.state)
    return(
      <section>
        <a 
          className="btn btn-circle white btn-sm transfer-coin" 
          onClick={this._showDialog.bind(this)}> 
          Edit Promotion </a>
        <div id={"edit-promotion"+this.props.data.id} className="modal container fade" tabIndex="-1">
          <div className="modal-body">
            <div className="promotion-header">Edit Promotion</div>
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
                      <textarea 
                        name={ !this.state.id ? "editor" : "editor" + this.state.id }
                        ref="contentVal" />
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
                        id="Mon"
                        >Mon</div>
                      <div 
                        className="day-btn btn"
                        val="Tue"
                        id="Tue"
                        >Tue</div>
                      <div className="day-btn btn" val="Wed" id="Wed">Wed</div>
                      <div className="day-btn btn" val="Thu" id="Thu">Thu</div>
                      <div className="day-btn btn" val="Fri" id="Fri">Fri</div>
                      <div className="day-btn btn" val="Sat" id="Sat">Sat</div>
                      <div className="day-btn btn" val="Sun" id="Sun">Sun</div>
                    </div>
                  </div>
                  <div className="form-group">
                    {/* <label className="col-md-3 control-label single-label"></label> */}
                    <div className="col-md-9">
                      <select 
                        className="form-control m-t-15" 
                        placeholder="All Day"
                        id="discoverableHourSelect"
                        value={this.state.discoverableHour}
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
                            <input 
                              type="radio" 
                              value="0"
                              id="scheduleNowPause"
                              name="ScheduleStatus" />
                            <span></span>
                          </label>
                          <label className="mt-radio"> Schedule automatic pause
                            <input 
                              type="radio" 
                              value="1"
                              id="scheduleLaterPause"
                              name="ScheduleStatus" />
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
                        value={this.state.schedulePauseDate}
                        onChange={(e) => this.state.schedulePauseDate}
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
                      <button className="btn btn-loc active col-md-6" val="busniessLoc" id="busniessLoc">Business Location</button>
                      <button className="btn btn-loc col-md-6" val="currentLoc" id="currentLoc">My Current Location</button>
                    </div>
                  </div>
                </div>
              </section>
              <hr className="line-break" />
              <section className="social-share">
                <div className="row row-item">
                  <div className="form-group">
                    <label className="col-md-3 control-label single-label">Share on</label>
                    <div className="col-md-9">
                      <div className="mt-checkbox-list">
                        <label className="mt-checkbox">
                          <input 
                            type="checkbox" 
                            id="facebookCheck" 
                            value="option1" />
                          <i className="fa fa-lg fa-facebook-official"></i>
                          <label className="check-right-label">SocialAccunt</label>
                          <span></span>
                        </label>
                        <label className="mt-checkbox">
                          <input 
                            type="checkbox" 
                            id="twitterCheck" 
                            value="option1" />
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
                            value="0" 
                            name="socialShareState"  
                            id="socialShareNow"
                            onClick={() => this._changeShareState(true)} />
                          <span></span>
                        </label>
                        <label className="mt-radio"> Schedule for later
                          <input 
                            type="radio" 
                            value="1"
                            id="socialShareLater"
                            onClick={() => this._changeShareState(false)}
                            name="socialShareState" />
                          <span></span>
                        </label>
                      </div>
                      {
                        !this.state.shareState
                          ? <DateTime
                              value={this.state.shareSocaialHour}
                              timeFormat={TIME_FORMAT}
                              input={true}
                              className="schedulePauseInput"
                              onChange={(e)=> this.setState({shareSocaialHour: e.format(TIME_FORMAT)})}
                              disableOnClickOutside={false} />
                          : null
                      }                                
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
      </section>
      
    );
  }
}

EditPromotion.propTypes = {
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

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPromotion));
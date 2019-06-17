import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Cookies from 'universal-cookie'
declare var analytics: any;

function validate(email, name, employeeNo, phone) {
  return {
    email: email.length === 0,
    name: name.length === 0,
    employeeNo: employeeNo.length === 0,
    phone: phone.length === 0 }
}

const cookies = new Cookies();

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      employeeNo : '',
      phone : '',

      touched: {
        email: false,
        name: false,
        employeeNo: false,
        phone: false
      },
      buttonClicked: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.sendToEmail = this.sendToEmail.bind(this);
  }

  handleChangeName(event) {
    this.setState({name : event.target.value})
  }

  handleChangeEmail(event) {
    this.setState({email : event.target.value})
  }

  handleChangePhone(event) {
    this.setState({phone : event.target.value})
  }

  handleChangeNumber(event) {
    var name = event.target.name
    this.setState({employeeNo: event.target.value})
  }

  handleClick(event) {
    event.preventDefault();
    if(!this.canBeSubmitted()) {
      this.setState({
        buttonClicked: true
      })
      return;
    }
    analytics.track("ms-superannuation-calculator-reveal", {
        url: window.location.href,
        source: cookies.get('utm-source'),
        medium: cookies.get('utm-medium'),
        campaign: cookies.get('utm-campaign')
        });
    this.sendToEmail();
    this.props.callbackFromParent(true);
  }

  canBeSubmitted() {
    const errors = validate(this.state.email, this.state.name, this.state.employeeNo, this.state.phone);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  sendToEmail() {
    fetch("https://hooks.zapier.com/hooks/catch/3591099/q3mwi9/",{
      method: "POST",
      body: JSON.stringify({
        posted_from: "superannuation calculator",
        email: this.state.email,
        name: this.state.name,
        number_of_employees: this.state.employeeNo,
        phone: this.state.phone
      })
    });
    this.setState({sent: true});
  }


  render() {
    const errors = validate(this.state.email, this.state.name, this.state.employeeNo, this.state.phone);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    if(this.props.calculated){
      return (
        <div class="sign-up-form" id="sign_up_form">
          <div class="row">
            <div class="col-md-12"><span>Fill in this form to reveal your results</span></div>
          </div>
          <div class="sign-up-inputs">
            <div class="row">
              <div class="col-md-12">
                <FormControl>
                    <InputLabel
                    >
                      Email
                    </InputLabel>
                    <Input
                      value={this.state.email}
                      name="email"
                      autoComplete="off"
                      onChange={this.handleChangeEmail}
                    />
                </FormControl>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <FormControl>
                    <InputLabel
                    >
                      Name
                    </InputLabel>
                    <Input
                      name="name"
                      value={this.state.name}
                      autoComplete="off"
                      onChange={this.handleChangeName}
                    />
                </FormControl>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <FormControl>
                    <InputLabel
                    >
                      No. of Employees
                    </InputLabel>
                    <Input
                      type="number"
                      value={this.state.employeeNo}
                      name="employeeNo"
                      autoComplete="off"
                      onChange={this.handleChangeNumber}
                    />
                </FormControl>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <FormControl>
                    <InputLabel
                    >
                      Contact Number
                    </InputLabel>
                    <Input
                      name="phone"
                      value={this.state.phone}
                      onChange={this.handleChangePhone}
                      autoComplete="off"
                    />
                </FormControl>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 reveal-btn">
              <button id="reveal-button" onClick={this.handleClick}>Reveal Results</button>
            </div>
              <span className={isDisabled && this.state.buttonClicked ? "error-msg" : "hidden"}>Please fill up all fields</span>
          </div>
        </div>
      );
    }
    else {
      return(
        ""
      );
    }
  }
}

export default SignUp;

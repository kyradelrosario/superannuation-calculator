import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const theme = createMuiTheme({
  overrides: {
    palette: {
       primary1Color: "#00acc1",
       primary3Color: "#bdbdbd",
       textColor: "#9e9e9e",
       accent1Color: "#ff6e40",
       accent3Color: "#424242",
       secondaryTextColor: "rgba(0, 0, 0, 0.87)",
       borderColor: "#311b92"
   }
  }
})


class Calculator extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleIncome = this.handleIncome.bind(this);

  }

  handleIncome(event) {
    if(event.target.value > 9999999999) {
      this.props.callbackFromParent(event.target.name, 9999999999, this.props.index);
    }
    else if (event.target.value < 0) {
      this.props.callbackFromParent(event.target.name, 0, this.props.index);
    }
    else {
      this.props.callbackFromParent(event.target.name, Math.round(event.target.value), this.props.index);
    }
  }

  handleChange = (event) => {
    this.props.callbackFromParent(event.target.name, event.target.value, this.props.index);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.callbackFromParent('delete', true, this.props.index);
  }

  ifCalculated() {
    if(this.props.calculated) {
      return <p>{this.props.superResult}</p>
    }
  }

  render() {
    return (
      <div className="col-sm-12 super-calc">
        <div className="row hide-md">
          <div className="col-lg-12">
            <div className="super-close"><button className={this.props.closeDisabled ? "hidden" : ""} onClick={this.handleClick}><span class="dashicons dashicons-no-alt"></span></button></div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-12">
            <span class="hide-md input-label">Staff Name</span>
            <input type="text"
           name="name"
            value={this.props.name}
            onChange={this.handleChange}
            autoComplete="off"
            placeholder="Enter Staff Name"/>
          </div>
          <div className="col-lg-2 col-6">
            <span class="hide-md input-label">Age</span>
            <select className="super-select"
            name="age"
            value={this.props.age}
            onChange={this.handleChange}
            >
              <option value="" defaultValue disabled hidden>Select age</option>
              <option value="17">Under 18</option>
              <option value="18">18 and above</option>
            </select>
          </div>
          <div className="col-lg-2 col-6 super-number" >
            <span class="hide-md input-label">Income</span>
            <input type="number"
            min="1" max="9999999999"
            placeholder="0.00"
            name="income"
            type="number"
            value={this.props.income}
            onChange={this.handleIncome}
            autoComplete="off"
             />
          </div>
          <div className="col-lg-2 col-6">
          <span class="hide-md input-label">Hours Worked</span>
            <select className="super-select"
            name="hours"
            value={this.props.hours}
            onChange={this.handleChange}
            autoComplete="off"
            >
              <option value="" defaultValue disabled hidden>Select hours</option>
              <option value="29">30hrs or more</option>
              <option value="30">Less than 30hrs</option>
            </select>
          </div>
          <div className="col-lg-2 col-6 ">
            <span class="hide-md input-label">Super Contribution</span>
            <div className="super-result">{this.props.superResult}</div>
          </div>
          <div className="col-lg-1 hide-xs">
            <div className="super-close"><button className={this.props.closeDisabled ? "hidden" : ""} onClick={this.handleClick}><span class="dashicons dashicons-no-alt"></span></button></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;

import React, { Component } from 'react';

class Result extends Component {
  constructor(props) {
    super(props);
  }

  ifNamed() {
    if(this.props.name === "") {
      return "--"
    }
    else {
      return this.props.name
    }

  }

  ifCalculated() {
    if(this.props.calculated || this.props.submitted) {
      if(this.props.superResult === "") {
        return "$--"
      }
      else {
        return this.props.superResult
      }
    }
    else {
      return "$--"
    }
  }

  ifIncome() {
    if(this.props.income === "") {
      return "--"
    }
    else {
      return this.props.income
    }
  }

  render() {
    return (
      <div className="result row">
        <div className={(this.props.superResult === 'unqualified') ? "unqualified" : ""}>
          <div class="col-md-4 col-sm-4 col-xs-4"><span>{this.ifNamed()}</span></div>
          <div class="col-md-4 col-sm-4 col-xs-4"><span>${this.ifIncome()}</span></div>
          <div class="col-md-4 col-sm-4 col-xs-4"><span>{this.ifCalculated()}</span></div>
        </div>
      </div>
    );
  }
}

export default Result;

import React, { Component } from 'react';
import Cookies from 'universal-cookie'
import Calculator from '../../Components/Calculator/index'
import '../../index.css';
import pattern1 from "../../img/Pattern 1.png";
import pattern2 from "../../img/Pattern 2.png";
declare var analytics: any;

function calculateSuper(age, monthlyIncome, hours) {
  if (monthlyIncome < 450) {
    return 0;
  }

  if(age >= 18 || hours >= 30) {
    return Math.round(monthlyIncome*0.095)
  }
  else {
    return 0;
  }

}

function superResult(name, superr , calculated) {

  if(superr > 0 && calculated) {
    return "$ "+superr
  }
  else if(superr <= 0 && calculated) {
    return "unqualified"
  }
  else {
    return ""
  }
}

const cookies = new Cookies();


class SuperAnnuation extends Component {
  constructor() {
    super();
    this.state = {
      values: [
        {
          name: '',
          age: '',
          income: '',
          hours: '',
          supe: 0,
          superResult: '$ ––',
          delete: false
        }
      ],
      totalSuper: "$ ––",
      calculated: false,
    }
  }

  createResults() {
    // return this.state.values.map((values,i) => {
    //   return(
    //     <Result key={"calc" +i} index={i} name={values.name}
    //       income={values.income} calculated={values.calculated}
    //       supe={values.supe} superResult={values.superResult}
    //       submitted={this.state.submitted}
    //     />
    //   )
    // })
  }



  createCalcs = () => {
    var closeDisabled = true;
    if (this.state.values.length > 1) {
      closeDisabled = false;
    }
    return this.state.values.map((values, i) => {
      return (

          <Calculator key={"calc"+ i} index={i}
            name={values.name} hours={values.hours}
            income={values.income} age={values.age}
            calculated={this.state.calculated} supe={values.supe}
            superResult={values.superResult}
            closeDisabled = {closeDisabled}
            callbackFromParent = {(newName,newValue, index) => this.onChildChange(newName, newValue, i)} />
      )
    })
  }

  superCalculation = () => {
    var date = new Date();
    cookies.set("superAnnuation", date, {path: '/'});
    var totalSuper = 0;
    var tempArray = this.state.values.slice();
    const calculated = this.state.values.map((values,i) =>
      {
        var supe = calculateSuper(parseInt(values.age), parseFloat(values.income), values.hours);
        var result = superResult(values.name, supe, true)
        tempArray[i].supe = supe;
        tempArray[i].superResult = result;
        tempArray[i].calculated = true;
        totalSuper = totalSuper + supe;
      }
    );
    this.handleCalculations(tempArray, totalSuper);
    return;
  }

  addCard() {
    const newValues = this.state.values.slice();;
    if (newValues.length < 5) {
      newValues.push({
        index: newValues.length,
        name: '',
        age: '',
        income: '',
        hours: '',
        supe: '' ,
        superResult: '$ ––',
        delete: false
      });
      this.setState({values: newValues});
    }
    else {
      document.getElementById("signUpbtnCal").click();
      document.querySelector(".signupForm__title").innerHTML =
        "<span>Need to calculate for multiple staff?</span><span>Sign up below to start your 14-day free trial</span>";
    }
  }

  handleAdd = () => {
    this.addCard();
    return;
  }

  onChildChange(newName, newValue, index) {
    var newValues = this.state.values.slice();
    if(newName === "delete") {
      newValues.splice(index,1);
    }
    else {
      newValues[index][newName] = newValue
    }

    if(this.state.calculated) {
      var totalSuper = 0;
      var tempArray = newValues.slice();
      const calculated = newValues.map((values,i) =>
        {
          var supe = calculateSuper(parseInt(values.age), parseFloat(values.income), values.hours);
          var result = superResult(values.name, supe, true)
          tempArray[i].supe = supe;
          tempArray[i].superResult = result;
          tempArray[i].calculated = true;
          totalSuper = totalSuper + supe;
        }
      );
      this.handleInput(tempArray, totalSuper);
    }
    else {
      this.setState({values: newValues})
    }
  }

  onSubmit(submit) {
    var date = new Date();
    cookies.set("superAnnuation", date, {path: '/'});
    var totalSuper = 0;
    var tempArray = this.state.values.slice();
    const calculated = this.state.values.map((values,i) =>
      {
        var supe = calculateSuper(parseInt(values.age), parseFloat(values.income), values.hours);
        var result = superResult(values.name, supe, true)
        tempArray[i].supe = supe;
        tempArray[i].superResult = result;
        tempArray[i].calculated = true;
        totalSuper = totalSuper + supe;
      }
    );
    this.handleCalculations(tempArray, totalSuper);
  }

  handleCalculations (newArray, toteSuper) {
    this.setState({
      values: newArray,
      totalSuper: "$"+toteSuper,
      calculated: true
    })
  }

  handleInput(newArray, toteSuper) {
    this.setState({
      values: newArray,
      totalSuper: "$"+toteSuper
    })
  }

  render() {
    return (
      <div className="row super-container">

        <div className="col-sm-12 super-head hide-sm">
          <div className="row">
            <div className="col-md-3">
              Name
            </div>
            <div className="col-md-2">
              Age
            </div>
            <div className="col-md-2">
              Monthly Income
            </div>
            <div className="col-md-2">
              Hours Worked
            </div>
            <div className="col-md-3">
              Superannuation Contribition
            </div>

          </div>
        </div>

        <div class="super-calcs col-sm-12">
        <div class="row">
        {this.createCalcs()}
        </div>
        </div>

        <div className="col-sm-12 super-actions">
          <div className="row">
            <div className="col-md-7  col-sm-8 col-12 calculate-btns">
            <a className="add-staff" onClick={this.handleAdd}>+ Add Staff</a>
            <a className="calculate-super" onClick={this.superCalculation}>Calculate superannuation contribution</a>
            </div>
            <div className="col-md-2 col-sm-2 col-6 total-super-label hide-xs">
              Total Super
            </div>
            <div className="col-md-3 col-sm-2 col-6 total-super-result hide-xs show-md">
              {this.state.totalSuper}
            </div>
            <div className="col-md-2 col-sm-2 col-12 hide-sm hide-md hide-sm show-xs">
              <br/>
              <span class="total-super-label">Total Super</span> <span class="total-super-result">{this.state.totalSuper}</span>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default SuperAnnuation

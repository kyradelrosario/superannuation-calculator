import React, { Component } from 'react';
import './App.css';

function calculateSuper(age, monthlyIncome, hours) {
  if (monthlyIncome < 450) {
    return 0
  }

  if(age >= 18 || hours >= 30) {
    return monthlyIncome*0.095
  }
  else {
    return 0;
  }

}

function superResult(superr , calculated) {

  if(superr > 0 && calculated) {
    return "Your Super is: " + superr
  }
  else if(superr <= 0 && calculated) {
    return "Your do not qualify for superannuation"
  }
  else {
    return "test"
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      age: '',
      retAge: '',
      income: '',
      hours: '',
      supe: '',
      calculated: false
    }

    this.handleAge = this.handleAge.bind(this);
    this.handleIncome = this.handleIncome.bind(this);
    this.handleHours = this.handleHours.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAge(event) {
    this.setState({age: event.target.value})
  }

  handleIncome(event) {
    this.setState({income: event.target.value})
  }

  handleHours(event) {
    this.setState({hours: event.target.value})
  }

  handleSubmit(event) {
    this.setState({supe: calculateSuper(this.state.age, this.state.income, this.state.hours),
    calculated: true})
    event.preventDefault();
      return;
  }

  render() {
    return (
      <div className="App">
        <form>
          <label>Age:</label>
          <input value={this.state.age} onChange={this.handleAge} type="number" />

          <br />
          <label>Income (monthly)</label>
          <input type="number" value={this.state.income} onChange={this.handleIncome}/>

          <br />
          <label>Hours worked each week</label>
          <input type="number" value={this.state.hours} onChange={this.handleHours} />

          <br />
          <button onClick={this.handleSubmit}>Calculate</button>
        </form>

        <div>
          <h6>Your Super:</h6>
          <p>{superResult(this.state.supe, this.state.calculated)}</p>
        </div>
      </div>
    );
  }
}

export default App;

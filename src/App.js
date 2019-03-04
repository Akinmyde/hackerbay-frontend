/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import './App.css';
import Form from '../src/components/form'
import Box from '../src/components/box'
import validate from 'validate.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 10, height: 10, clicked: true, error: '' }
  }
  render() {
    const onInputChange = e => {
      const { value, name } = e.target;
      const userInput = parseInt(value, 10)
      if (userInput > 0 && validate.isNumber(userInput)) {
        if (name === 'height') {
          return this.setState({height: userInput, error: ''})
        } return this.setState({width: userInput, error: ''})
      } return this.setState({error: 'Please enter a valid input (hint: must be a number)'})
    };

    const onButtonClick = e => {
      e.preventDefault();
      const height = document.getElementById('height').value;
      const width = document.getElementById('width').value;

      if ((!validate.isNumber(parseInt(height, 10))) || (!validate.isNumber(parseInt(width, 10)))) {
        return this.setState({error: 'Please enter a valid input (hint: must be a number)', clicked: false});
      } return this.setState({error: '', clicked: true})
    }
    
    const {error, clicked, width} = this.state;
    if (error === '' && clicked) {
      const row = [];
      for (let i = 1; i <= width; i++) {
        row.push(i)
      }
      return (
        <div className="App">
          {row.map(function(id, index) {
            return <Box key={index}>{id}</Box>
          })}
        </div>
      );
    }
    return (
      <div className="App">
        <Form onInputChange={onInputChange} onButtonClick={onButtonClick} error={error}/>
      </div>
    );
  }
}

export default App;
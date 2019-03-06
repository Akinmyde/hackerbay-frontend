/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import validate from 'validate.js';
import './App.css';
import Form from '../src/components/form'
import Box from '../src/components/box'
import Move from '../src/components/move'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, clicked: false, error: '' };
  }

  render() {
    const { error, clicked, width, height } = this.state;

    const onInputChange = e => {
      const { value, name } = e.target;
      const userInput = parseInt(value, 10)
      if (userInput > 0 && validate.isNumber(userInput)) {
        if (name === 'height') {
          return this.setState({ height: userInput, error: '' })
        } return this.setState({ width: userInput, error: '' })
      } return this.setState({ error: 'Please enter a valid input (hint: must be a number)' })
    };

    const onButtonClick = e => {
      e.preventDefault();
      const height = document.getElementById('height').value;
      const width = document.getElementById('width').value;

      if ((!validate.isNumber(parseInt(height, 10))) || (!validate.isNumber(parseInt(width, 10)))) {
        return this.setState({ error: 'Please enter a valid input (hint: must be a number)', clicked: false });
      } return this.setState({ error: '', clicked: true })
    }

    const checkMaze = () => {
      const maze = document.getElementsByClassName('maze');
      if (maze.length === 0) {
        return true;
      }
      return false;
    }

    let movement = 0;

    const movementDirection = (direction, speed) => {
      const player = document.getElementsByClassName('player')[0];
      player.className = 'box current';
      let move = 0;
      const id = parseInt(player.id, 10);
      if (direction === 'up' || direction === 'left') {
        move = id - speed;
        if (move >= 0) {
          const current = document.getElementById(move);
          current.className = 'box player';
          movement += 1;
        }
        else {
          const last = document.getElementsByClassName('current')[0].id;
          document.getElementById(last).className = 'box player';
        }
      } else if (direction === 'right' || direction === 'down') {
        move = id + speed;
        if (move >= 0 && move < width * height) {
          const current = document.getElementById(move);
          current.className = 'box player';
          movement += 1;
        }
        else {
          const last = document.getElementsByClassName('current')[document.getElementsByClassName('current').length - 1].id;
          document.getElementById(last).className = 'box player';
        }
      }
    }

    const onMove = e => {
      e.preventDefault();
      const direction = e.target.id;
      if (!checkMaze()) {
        if (direction === 'up') {
          movementDirection('up', width)
        }
      if (direction === 'down') {
        movementDirection('down', width)
      }
      if (direction === 'left') {
        movementDirection('left', 1)
      }
      if (direction === 'right') {
        movementDirection('right', 1)
      }
    } else {
      alert('level completed successfully, your score is:' + movement);
      this.setState({ width: 0, height: 0, clicked: false, error: '' })
    }
  }

    const styleAuto = [];
    for (let i = 1; i <= width; i++) {
      styleAuto.push('auto')
    }
    const gridTemplateColumns = styleAuto.join(' ');

    const boxContainer = {
      minHeight: '100px',
      maxHeight: '600px',
      display: 'grid',
      gridTemplateColumns,
      'overflowY': 'scroll',
      'overflowX': 'scroll',
      background: 'yellow',
    };

    if (error === '' && clicked) {
      const row = [];
      const times = width * height;
      const middle = parseInt(times / 2) + 1;
      for (let i = 1; i <= times; i++) {
        row.push(i)
      }

      const rands = [middle];
      const generateRandomNumbers = () => Math.floor(Math.random() * times + 1);
      for (let i = 1; i <= height; i++) {
        let rand = generateRandomNumbers();
        while (validate.contains(rands, rand)) {
          rand = generateRandomNumbers();
        }
        rands.push(rand)
      }
      const randonNumbers = rands.filter((x) => x !== middle);
      return (
        <div className='App'>
          <h1>Maze Game</h1>
          <div className='justify-content'>
            <div style={boxContainer}>
              {row.map((id, index) => {
                if (validate.contains(randonNumbers, id)) {
                  return <Box className='box maze' id={index} key={index}>{id}</Box>
                }
                if (id === middle) {
                  return <Box className='box player' id={index} key={index}>{id}</Box>
                }
                return <Box className='box' id={index} key={index}>{id}</Box>
              })}
            </div>
          </div>
          <div className='olu'>
            <Move onMove={onMove} value={'up'} id={'up'}></Move><br />
            <Move onMove={onMove} value={'left'} id={'left'}></Move>
            <Move onMove={onMove} value={'right'} id={'right'}></Move><br />
            <Move onMove={onMove} value={'down'} id={'down'}></Move>
          </div>
        </div>
      );
    }
    return (
      <div className="App container">
        <Form onInputChange={onInputChange} onButtonClick={onButtonClick} error={error} />
      </div>
    );
  }
}

export default App;
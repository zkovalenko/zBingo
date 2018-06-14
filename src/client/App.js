import React, { Component } from 'react';
import {Game} from './Game';
import {RolledNumber} from './RolledNumber';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      username: null,
      bingoData: null
    };
  }

  componentDidMount() {
    fetch('/api/gameStart')
      .then(res => res.json())
      .then(data => {
        this.setState({ 
          username: data.username,
          bingoData: data.bingoData
        })
      });
  }

  render() {
    return (
      <div>
        {this.state.username ? (
          <h1 className="t-capitalize">{this.state.username}, Welcome to BingoLand</h1>
        ) : (
          <h1>Loading BingoLand... Please Wait!</h1>
        )}

        { this.state.bingoData ? (
          <Game data={this.state.bingoData}/>)  : ""
        }
      </div>
    );
  }
}

import React, { Component } from 'react';
import {BoardTile} from './BoardTile';
import _ from 'lodash';
import classnames from "classnames";

import './app.css';

let MAX_ROW_NUM = 5;
let MAX_COL_NUM = 5;


export class Board extends Component {
  constructor(props) {
    super(props);

    this.board = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
    this.fillBoard = this.fillBoard.bind(this);

    this.state= {
        rolledNumber: this.props.rolledNumber,
        board: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        winner: false
    };
  }


  rowNodes() {
    let placeHolder = [];
    let that = this;
    let i=0;
    let data = this.props.data;

    data.map((numbers) => {
        for(let n in numbers) {
          // console.log("~~passing current number to tile",that.props.rolledNumber);
          placeHolder.push(
            <BoardTile 
              data={numbers[n]}
              key={numbers[n]}
              rolledNumber={that.props.rolledNumber}
              x={i}
              y={n}
              updateBoard={that.fillBoard}/>);
        }
        i++;
    });
    return placeHolder;
  }
 
  renderWinner() {
      if (this.state.winner){
        return <h2 className="winner t-capitalize c-red">You are a winner!!!</h2>;
      } 

      if (this.props.gameOver){
        this.verifyWinner();
      }

      return "";
  }

  fillBoard(x,y){
      this.board[x][y] = 1;
  }

  verifyWinner() {
    let that=this;

    fetch('/api/verifyWinner', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({board:this.board})
    })
    .then(result=>{
      return result.json();
    })
    .then(data=>{
      let isWinner = data.winner;
      if (isWinner&&!that.props.gameOver){
        that.props.endOfGame();
      }

      return this.setState({winner:isWinner});
    })
  }

  render() {
    let doneBtnClass =  classnames("done-btn",{"d-n":this.props.gameOver});

    return (
      <div className="bingo-grid">
        { this.rowNodes() }

        <div className={doneBtnClass}>
            <input className="submit-button" type="button" value="Check Result" onClick={this.verifyWinner.bind(this)}/>
        </div>

        {this.renderWinner()}
      </div>
    );
  }
}

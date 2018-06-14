import React, { Component } from 'react';
import './app.css';
import {Board} from './Board';
import {RolledNumber} from './RolledNumber';
import classnames from "classnames";


const MAX_NUM_BOARDS = 4;
const MAX_BOARD_TILES = 25;

export class Game extends Component {
    constructor(props){
        super(props);

        console.log(props);

        // generate an arr of #s from 0-99
        let shuffledArr = this.props.data;
        // console.log("shuffledArr",shuffledArr);

        // pick the first number
        let number = shuffledArr[0];

        // initialize the boards with the random numbers 0-99
        this.boards= this.initBoards();

        this.endGame = this.endGame.bind(this);
        this.gameNumbers=shuffledArr;
        this.lastCalledNumbers=[number];

        this.state = {
            rolledNumber: number,
            rolledCount: 1,
            gameOver: false
        };
    }


    initBoards() {
        let boardIx, k, i;
        let boards=[];

        for (boardIx=0;boardIx<MAX_NUM_BOARDS;boardIx++){
            let board = [];
            let data = _.shuffle(_.range(99));

            for (i=0, k = 0; i < MAX_BOARD_TILES; i++) {
                if(i % 5 === 0) {
                    k++;
                    board[k] = [];
                }
                board[k].push(data[i]);
            }
            boards.push(board);
        }
        
        return boards;
    }

    initGame() {
        let placeHolder = [];
        let that = this;

        for (let n=0;n<MAX_NUM_BOARDS;n++) {
            placeHolder.push(<Board key={n} rolledNumber={that.state.rolledNumber} data={that.boards[n]} endOfGame={that.endGame} gameOver={that.state.gameOver}/>);
        }

        return placeHolder;
    }

    endGame() {
        this.setState({gameOver:true});
    }

    rollBall() {
        // all the numbers were called
        if(this.state.rolledCount >= 100) {
            this.endGame();
            return;
        }


        fetch('/api/roll?rolledCount='+this.state.rolledCount)
          .then(res => res.json())
          .then(data => {
            console.log("~~Data",data);

            let nextNum = this.state.rolledCount+1;
            let curNumber = data.rolledNumber;

            //only show last 5 numbers
            if(this.lastCalledNumbers.length === 5) {
                this.lastCalledNumbers.shift();
            }

            this.lastCalledNumbers.push(curNumber);
            
            this.setState({
                rolledNumber: curNumber, 
                rolledCount: nextNum
            });
          });
    }

    displayLastNumbers() {
        let numbers = [];
        this.lastCalledNumbers.map(function(number) {
            numbers.push(<RolledNumber key={number} calledNumber={number} />);
        });
        return numbers;
    }

    render() {
        let gameStyle = classnames("d-n",{"game-over c-red":this.state.gameOver});
        let gameInfo =  classnames("info-container",{"d-n":this.state.gameOver});

        return (
            <div>
                <div className={gameInfo}>
                    <button onClick={this.rollBall.bind(this)} className="roll-button">Roll</button>

                    <div className="current-number-container">
                        <h3>Last Number</h3>
                        <span>{this.state.rolledNumber}</span>
                    </div>

                    <div className="called-numbers">
                        <p>Previously Rolled Numbers:</p>
                        { this.displayLastNumbers() }
                    </div>
                </div>


                <div className="grid-container">
                    { this.initGame() }
                </div>

                <div className={gameStyle}>
                    <h1>Game Over!</h1>
                </div>
            </div>
        );
    }
}

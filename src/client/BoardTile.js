import React, { Component } from 'react';
import PropTypes from "prop-types";
import './app.css';

export class BoardTile extends Component {
  constructor(props){
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data === nextProps.rolledNumber;
  }

  render() {
    let name = 'tile';
    // console.log("~~ props rolledNumber",this.props.rolledNumber);

    if(this.props.data === this.props.rolledNumber) {
        name = 'tile active';
        this.props.updateBoard(this.props.x,this.props.y);
    }

    return (
        <div className={name}>
            {this.props.data}
        </div>
    );
  }
}

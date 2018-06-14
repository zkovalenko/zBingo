import React, { Component } from 'react';

export class RolledNumber extends Component {

    constructor(){
        super();
    }


    render() {
        return (
            <div className="number animated beat"><span>{this.props.calledNumber}</span></div>
        )
    }
}

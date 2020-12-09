import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  render() {
    return (
      <li>
        <p>{this.props.text}</p>
        <button className="checkbtn"><i className="fas fa-check"></i></button>
        <button className="closebtn"><i className="fas fa-times"></i></button>
      </li>
    );
  }
}

export default Todo;

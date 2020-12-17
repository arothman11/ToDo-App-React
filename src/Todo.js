import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {

  render() {
    return (
      <li id={this.props.id}>
        <p>{this.props.text}</p>
        <button className="checkbtn" onClick={this.props.completeToDo}><i className="fas fa-check"></i></button>
        <button className="closebtn" onClick={this.props.deleteToDo}><i className="fas fa-times"></i></button>
      </li>
    );
  }
}

export default Todo;

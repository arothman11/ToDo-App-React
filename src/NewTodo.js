import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
      <div className="inputbtn">
        <input type="text" id="addform" placeholder="Add new item..."></input>
        <button type="button" id="button">Add</button>
      </div>
    );
  }
}

export default NewTodo;

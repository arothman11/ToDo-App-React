import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
      <div className="inputbtn">
        <input type="text" id="addform" placeholder="Add new item..." value={this.props.input} onChange={this.props.onChange}></input>
        <button type="button" onClick={this.props.addTodo} id="button">Add</button>
        <button type="button" onClick={this.props.sortToDo} id="button">Sort</button>
      </div>
    );
  }
}

export default NewTodo;

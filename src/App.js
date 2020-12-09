import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Amee's ToDo App</h1>
        <div className="tasks">
          <ul id="list">
            <NewTodo />
            <Todo />
          </ul>
      </div>
      </div>
    );
  }

  constructor(){
    super();
    this.setState(
      {
        todosarray: [],
      }
    )
  }

  componentDidMount(){
    var xhttp = new XMLHttpRequest();
    const self = this;
    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200){
        var todos = JSON.parse(this.responseText);
        console.log(todos);
        self.setState({todosarray: todos});
      }
    }

    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key", "d3f1ce-409923-9f921b-6dc584-60ba89");
    xhttp.send();
  }

}

export default App;

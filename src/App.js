import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {


  constructor(props){
    super(props);
    this.state = {
        todos: [],
        input:''
      };
      this.onChange = this.onChange.bind(this);
      this.addTodo = this.addTodo.bind(this);
      this.completeToDo = this.completeToDo.bind(this);
      this.deleteToDo = this.deleteToDo.bind(this);
      this.sortToDo = this.sortToDo.bind(this);
  }

  onChange(event) {
  // Set the state to the value of the input
      this.setState({
        input: event.target.value
      });
    }



  componentDidMount(){
    const self = this;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
      if (this.readyState === 4 && this.status === 200){

        var todos = JSON.parse(this.responseText);
        console.log(todos);
        self.setState({todos: todos});

        for (const [index, value] of todos.entries()) {
          if(value.completed===true){
            document.getElementById(value.id).style.textDecoration="line-through";
          }
        }

        self.setState({todos: todos});
      }
    }

    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key", "d3f1ce-409923-9f921b-6dc584-60ba89");
    xhttp.send();
  }


  addTodo(event) {
    event.preventDefault();
    const newTodoText = this.state.input;
    var data = {
        text: newTodoText
    }
    const self = this;
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var todo = JSON.parse(this.responseText);
            console.log(todo);
            self.setState({todos: [...self.state.todos, todo], input: ''})
        } else if (this.readyState === 4) {
            console.log(this.responseText);
        }
    }

    xhttp2.open("POST", "https://cse204.work/todos", true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "d3f1ce-409923-9f921b-6dc584-60ba89");
    xhttp2.send(JSON.stringify(data));

  }

  deleteToDo(event){
    event.preventDefault();
    const self = this;
    var id = event.target.parentElement.parentElement.id;
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const remainingTodos = self.state.todos.filter((todo) => {
          if (todo.id !== id) {
            return todo;
          }
        });
        self.setState({todos: remainingTodos});


      } else if (this.readyState === 4) {
          // this.status !== 200, error from server
          // console.log(this.responseText);
      }
  };
    xhttp2.open("DELETE", "https://cors-anywhere.herokuapp.com/https://cse204.work/todos/"+id, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "d3f1ce-409923-9f921b-6dc584-60ba89");
    xhttp2.send();
}

  completeToDo(event){
    event.preventDefault();
    var id = event.target.parentElement.parentElement.id;
    var data = {
      completed: true
      };
    var xhttp2 = new XMLHttpRequest();

    // Response handler
      xhttp2.onreadystatechange = function() {

        // Wait for readyState = 4 & 200 response
      if (this.readyState === 4 && this.status === 200) {
          document.getElementById(id).style.textDecoration="line-through";

      } else if (this.readyState === 4) {

            // this.status !== 200, error from server
            // console.log(this.responseText);
      }
    };

      xhttp2.open("PUT", "https://cse204.work/todos/"+id, true);
      xhttp2.setRequestHeader("Content-type", "application/json");
      xhttp2.setRequestHeader("x-api-key", "d3f1ce-409923-9f921b-6dc584-60ba89");
      xhttp2.send(JSON.stringify(data));
  }

  sortToDo(event){
    event.preventDefault();
    var todos = this.state.todos;
    todos.sort(function (a, b) {
      return a.text.localeCompare(b.text);
    })
    this.setState({todos: todos});
  }

    render() {
       return (
         <div className="App">
           <h1>Amee's ToDo App</h1>
           <div className="tasks">
             <ul id="list">
                <NewTodo
                    addTodo={this.addTodo}
                    onChange={this.onChange}
                    input={this.state.input}
                    sortToDo={this.sortToDo}
                    />
                 {this.state.todos.map((todo) =>
                  <Todo
                    key={todo.id}
                    id={todo.id}
                    completed={todo.completed}
                    text={todo.text}
                    removeDeletedTodo={this.removeDeletedTodo}
                    completeToDo={this.completeToDo}
                    deleteToDo={this.deleteToDo}
                    />
                  )}
             </ul>
         </div>
         </div>
       );
     }


}

export default App;

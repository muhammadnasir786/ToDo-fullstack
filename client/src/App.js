import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');

class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      value: '',

    }
  }
  componentDidMount = () => {
    // axios.get('/').then((data)=>{
    // let o = res.json(data)
    // console.log(o)
    // })
    axios.get('/todos').then((data) => {
      console.log(data.data.allToDos)
      this.setState({
        todos: data.data.allToDos
      })
    }).catch((err) => {
      console.log(err)
    })
  }
  render() {
    console.log(this.state.todos)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <input type="text" value={this.state.value}
            onChange={(e) => { this.setState({ value: e.target.value }) }} /><button onClick={() => {
              axios.post('/todo/add', {
                text: this.state.value,
                isDone: false
              })
            }}>Add ToDo</button>
        </p>
        {/* <ul> */}
        {

          this.state.todos.map((val) => {
            console.log(val)
            return <div>
              <ToDoItem key={val._id} todo={val} />

            </div>
          })

        }

        {/* </ul> */}

      </div>
    );
  }
}

export default App;


class ToDoItem extends React.Component {
  constructor() {
    super();
    this.state = {
      isEdit: false,
      updateValue: ""
    }
  }
  render() {
    return (<div>
      {this.state.isEdit ? <div>
        <input type="text" value={this.state.updateValue}
          onChange={(e) => { this.setState({ updateValue: e.target.value }) }}
        /><button onClick={() => {
          axios.put(`/todo/put/${this.props.todo._id}`, {
            text: this.state.updateValue,
            isDone: this.props.todo.isDone
          })
        }}>Update</button>
      </div> : <div key={this.props.todo._id}>{this.props.todo.text}<button onClick={() => {
        axios.put(`/todo/done/${this.props.todo._id}`)
      }}>{this.props.todo.isDone ? "Completed" : "Not Completed "}</button>
          <button onClick={() => {
            axios.delete(`/todo/del/${this.props.todo._id}`);
          }}>Delete</button><button onClick={() => {
            this.setState({ isEdit: true, updateValue: this.props.todo.text })
          }}>Edit</button>
        </div>}
    </div>
    );
  }
}

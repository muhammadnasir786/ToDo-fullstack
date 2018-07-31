import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from "socket.io-client";
const axios = require('axios');

// let socket = io.connect('http://localhost:4000');
// const socketUrl = "http://localhost:3231"


class DemoApp extends Component {
    constructor() {
        super()
        this.state = {
            todos: [],
            value: '',

        }
        this.socket = io('http://localhost:3000');
    }

    componentDidMount = () => {
        // FOR first Time 
        axios.get('/todos').then((data) => {
            console.log(data.data.allToDos)
            this.setState({
                todos: data.data.allToDos
            })
        }).catch((err) => {
            console.log(err)
        })
        // All Listenier Here !

        this.socket.on('GET_TODO_ADD', todo => {
            let todos = this.state.todos;
            todos.push(todo);
            this.setState({ todos: todos })
        });
        // GET TODO DELETE
        this.socket.on('GET_TODO_DELETE', todoID => {
            let todos = this.state.todos;
            todos = todos.filter(todo => todo._id !== todoID);
            this.setState({ todos: todos })
        });
        // COMPLETED TODO
        this.socket.on('GET_TODO_COMPLETED', todoId => {
            let todos = this.state.todos;
            let todoObj = todos.find((todo) => todo._id === todoId).isDone = true;
            this.setState({ todos: todos })
        });
        // TODO UPADTE
        this.socket.on('GET_TODO_UPDATE', todoo => {
            // console.log(todo)
            let todos = this.state.todos;
            let todoObj = todos.find((todo) => todo._id === todoo._id);
            todoObj.text = todoo.text;
            todoObj.isDone = todoo.isDone;
            console.log(todoObj)
            this.setState({ todos: todos })
        });

    }

    render() {
        console.log(this.state.todos)
        return (
            <div className="App">
                <h1>ToDo Application with S0cket</h1>
                <input text="text"
                    onChange={(e) => { this.setState({ value: e.target.value }) }} />
                <button onClick={() => {
                    this.socket.emit('ADD_TODO', {
                        text: this.state.value,
                        isDone: false
                    })
                }}>Add ToDo</button>
                <br />
                <hr />
                <div>
                    {this.state.todos.map((val) => {
                        return (
                            <ToDoItem socket={this.socket} key={val._id} todo={val} />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default DemoApp;


class ToDoItem extends React.Component {
    constructor() {
        super();
        this.state = {
            isEdit: false,
            updateValue: ""
        }
        // this.socket = io('http://localhost:3000');
    }
    render() {
        return (<div>
            {this.state.isEdit ? <div>
                <input type="text" value={this.state.updateValue}
                    onChange={(e) => { this.setState({ updateValue: e.target.value }) }}
                /><button onClick={() => {
                    this.props.socket.emit('UPDATE_TODO', {
                        id: this.props.todo._id,
                        todo: {
                            text: this.state.updateValue,
                            isDone: this.props.todo.isDone
                        }
                    })
                    this.setState({ isEdit: false })

                }}>Update</button>
            </div> : <div key={this.props.todo._id}>{this.props.todo.text}<button onClick={() => {
                this.props.socket.emit('COMPLETED_TODO', this.props.todo._id);

            }}>{this.props.todo.isDone ? "Completed" : "Not Completed "}</button>
                    <button onClick={() => {
                        this.props.socket.emit('DELETE_TODO', this.props.todo._id)
                    }}>Delete</button><button onClick={() => {
                        this.setState({ isEdit: true, updateValue: this.props.todo.text })
                    }}>Edit</button>
                </div>}
        </div>
        );
    }
}

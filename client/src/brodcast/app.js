import React, { Component } from 'react';
import io from "socket.io-client";
// import logo from './logo.svg';
// import './App.css';
const axios = require('axios');

class App extends Component {
    constructor() {
        super()
        this.state = {


        }
        this.socket = io('/');
        this.nsp = io('/nsp')

    }
    componentDidMount() {
        // this.socket.on('newclientconnect', (data) => {
        //     console.log(data)
        // });
        // this.socket.on('ALERT', (data) => {
        //     // alert(data)
        // })


        this.nsp.on('EMIT_IN_NSP', (data) => {
            console.log(data)
        })
        this.nsp.on('event', (data) => {
            console.log(data)
        })


    }

    render() {
        return (
            <div className="App">
                Hello Bradcast
         </div>
        );
    }
}

export default App;



const express = require('express');
const router = express.Router();
const ToDo = require('../models/todo');
router.get('/todos', (req, res) => {
    res.send({
        msg: 'GET TODOS'
    })
})
router.post('/add', (req, res) => {
    res.send({
        msg: 'ADD TODOS'
    })
})
router.delete('/delete', (req, res) => {
    res.send({
        msg: 'DELETE TODOS'
    })
})
router.put('/update', (req, res) => {
    res.send({
        msg: 'UPDATE TODOS'
    })
})

module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express();
mongoose.connect('')
app.use(bodyParser.json());



app.use('/todo', require('./routes/todo'))
app.get('/', (req, res) => {
    res.send({
        msg: '/ Suucess /'
    })
})

app.listen(4000, () => {
    console.log('Listen At 4000')
})
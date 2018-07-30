const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const ToDo = require('./models/todo')
const app = express();
mongoose.connect('mongodb://admin123:admin123@ds249079.mlab.com:49079/oauth', () => {
    console.log('MONGO CONNECT')
})
app.use(function(req, res, next) {
    var allowedOrigins = ['http://localhost:3000', 'http://localhost:3000?'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
  });
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', (req, res, err) => {
   
    res.send({ msg: 'OK bhai' })
})
app.get('/todos', (req, res, err) => {
    // console.log(req.body)
    ToDo.find().then((data) => {
        res.send({ allToDos: data })
    })
    // console.log('shoaib')
    // console.log(err)
    // res.send({ msg: 'OK bhai' })
})

app.use('/todo', require('./routes/todo'))
// app.get("/shoaib",(req,res,next)=>{
//     console.log('shoaib');
//     res.send({message:'nasir bhai'})
// })

app.listen( 4001,() => {
    console.log('Listen At 4001')
})
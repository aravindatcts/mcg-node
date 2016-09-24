var express = require('express'); 
// var cors = require('cors');
var bodyparser = require('body-parser'); 

var app = express(); 
var router = express.router; 

var http = require("http"); 


var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


console.log("Yes i am being served with data");

app.use(multipartMiddleware);
// app.use(cors());

app.use(bodyparser.json()); 


app.use(require('./controllers')); 

app.listen('8080',function(){
    console.log('listening on the post'); 
    
});



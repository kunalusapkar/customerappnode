var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var expressValidator = require('express-validator');

// var logger = function(req,res,next){
//   console.log('Logging...');
//   next();
// }
// app.use(logger);
// View Engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// Validator   Middleware
app.use(expressValidator());﻿
// set static path
// app.use(express.static(path.join(__dirname,'public')));
var users = [
  {
      id: 1,
      first_name: 'kunal',
      last_name: 'Usapkar',
      email: 'kusapkar@gmail.com'
  },
  {
      id: 2,
      first_name: 'Arohi',
      last_name: 'Usapkar',
      email: 'aarohi@gmail.com'
  },
  {
      id: 3,
      first_name: 'Adhya',
      last_name: 'Usapkar',
      email: 'adhya@gmail.com'
  }
]


app.get('/',function(req,res){
    res.render('index',{
      title: 'Customers',
      users: users
    });
});
app.post('/users/add',function(req,res){
  req.checkBody ('first_name', 'FirstName is required').notEmpty();
  req.checkBody ('last_name', ' LastName is required').notEmpty();
  req.checkBody ('email', ' Email is required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
      console.log('Errors');
  }else{
    var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }
      console.log('Success');
  }
});
app.listen(3000,function(){
  console.log('Server started on port 3000...');
})

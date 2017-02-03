var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');


// create a connection to our Cloud9 server
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'coco_moloko', // CHANGE THIS :)
  password : '',
  database: 'reddit'
});

// load our API and pass it the connection
var reddit = require('./reddit');
var redditAPI = reddit(connection);


app.use(bodyParser.urlencoded({ extended: false }));

// At the top (already added for you)
app.set('view engine', 'pug');

app.get('/', function(request, response) {
  // This is only an example!
  redditAPI.getAllPosts(function(err, posts) {
    if (err) {
        console.log(err);
    }
    // Response.render will call the Pug template engine with the `post-list.pug` file.
    response.render('post-list', {
      posts: posts,
    });

  });
});
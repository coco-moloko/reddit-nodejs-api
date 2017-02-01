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

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// //EXERCISE 1
// app.get('/hello', function (req, res) {
//   res.send('<h1>Hello World!</h1>');
// });

// //EXERCISE 2
// app.get('/hello', function (req, res) {
  
//   var firstName = req.query.name;
  
//   res.send("<h1>Hello " + firstName + "!</h1>");
// });

// //EXERCISE 2B

// app.get('/hello', function(req, res){
//     console.log(req.query.name);
//     res.send('<h1> Hello : '+ req.query.name);

// });

// //EXERCISE 3

// app.get('/calculator/:operation/', function(req, res) {

//   console.log(req.params.operation);
//   var var1 = +req.query.num1;
//   var var2 = +req.query.num2;
//   console.log(var1);
//   console.log(var2);

//   switch(req.params.operation) {
//     case 'add':
//       var answer = var1 + var2;
//       res.send('<h1> The answer is ' + parseInt(answer) + '</h1');
//       break;
//     case 'sub':
//       var answer = var1 - var2;
//       res.send('<h1> The answer is ' + parseInt(answer) + '</h1');
//       break;
//     case 'mult':
//       var answer = var1 * var2;
//       res.send('<h1> The answer is ' + (+answer) + '</h1');
//       break;
//     case 'div':
//       var answer = var1 / var2;
//       res.send('<h1> The answer is ' + parseInt(answer) + '</h1');
//       break;
//     default:
//       res.status("Error code: 417");
//   }

// });

//EXERCISE 4 - map

app.get(`/posts`, function(req, res) {
    redditAPI.getAllPosts({}, function(err, listOfPosts) {
        if (err){
            console.log(err);
        } else {
            console.log(listOfPosts);
            
        var output = `<div id="contents">
                    <h1>List of contents</h1>
                    <ul class="contents-list">
        `;
    
        for(var i = 0; i < 5; i++) {
            output += `<li class="content-item">
                    <h2 class="content-item__title">
                    <a href="${listOfPosts[i].url}">${listOfPosts[i].title}</a>
                    </h2>
                    <p>Created by ${listOfPosts[i].username}</p>
                    </li>`;
        }
    
    output += ` </ul>The end!
                </div>`;
    
            res.send(output);
        }
    }); 
});

//EXERCISE 5

app.get('/createContent', function (req, res) {
    res.send(`<form action="/createContent" method="POST"> 
  <div>
    <input type="text" name="url" placeholder="Enter a URL to content">
  </div>
  <div>
    <input type="text" name="title" placeholder="Enter the title of your content">
  </div>
  <button type="submit">Create!</button>
    </form>`);
});

//EXERCISE 6

app.post('/createContent', function(req, res){
    console.log(req.body);
    
    redditAPI.createPost({}, function(err, result) {
    if (err) {
        console.log(err);
    } else {
        // res.send("OK");
        // res.send(req.body);
        res.redirect('/posts');
    }
});
    
});

//EXERCISE 7






/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
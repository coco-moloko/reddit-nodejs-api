var express = require('express');
var app = express();

app.get('/calculator/:operation/', function(req, res) {

  console.log(req.params.operation);
  var var1 = +req.query.num1;
  var var2 = +req.query.num2;
  console.log(var1);
  console.log(var2);

  switch(req.params.operation) {
    case 'add':
      var answer = var1 + var2;
      res.send('<h1> The answer is ' + parseInt(answer) + '</h1');
      break;
    case 'sub':
      var answer = var1 - var2;
      res.send('<h1> The answer is ' + parseInt(answer) + '</h1');
      break;
    case 'mult':
      var answer = var1 * var2;
      res.send('<h1> The answer is ' + (+answer) + '</h1');
      break;
    case 'div':
      var answer = var1 / var2;
      res.send('<h1> The answer is ' + parseInt(answer) + '</h1');
      break;
    default:
      res.status("Error code: 417");
  }

});

//do it but put function outside the app.get with the switch statement
//then an if === err print err
//else do function and print result as a JSON object
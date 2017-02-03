// load the mysql library
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

// To Create a User and a Post
// redditAPI.createUser({
//   username: 'drnick',
//   password: 'xxx'
// }, function(err, user) {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     redditAPI.createPost({
//       title: 'Octopuses are weird',
//       url: 'https://www.reddit.com/octo',
//       userId: user.id,
//       subredditId: 4
//     }, function(err, post) {
//       if (err) {
//         console.log(err);
//       }
//       else {
//         console.log(post);
//       }
//     });
//   }
// });

// redditAPI.createSubreddit({
//   name: 'Lolz',
//   description: 'A subreddit about teh lolz',
// }, function (err, post) {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     console.log(post);
//   }
// });

// redditAPI.getAllSubreddits({}, function(err, post){
//   if (err) {
//     console.log(err);
//   }
//   else {
//     console.log(post);
//   }
// });

// redditAPI.getAllPostsWithSubreddit({}, function(err, post){
//   if (err) {
//     console.log(err);
//   }
//   else {
//     console.log(post);
//   }
// });

redditAPI.createOrUpdateVote({
  postId: 1,
  userId: 1,
  votes: 1
}, function(err, postVote) {
  if (err) {
    console.log(err);
  }
  else {
    console.log(postVote);
  }
})
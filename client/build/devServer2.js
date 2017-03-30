/* eslint-disable */
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser')
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(cookieParser());

// app.use((req, res, next) => {
//   // check if client sent cookie
//   var username = 'songzehao'
//   var cookie = req.cookies['d_xiaomi_user_client_29'];
//   if (cookie === undefined || cookie !== username)
//   {
//     // no: set a new cookie
//     res.cookie('d_xiaomi_user_client_29', username, { maxAge: 900000, httpOnly: false });
//     console.log('cookie created successfully');
//   }
//   else
//   {
//     // yes, cookie was already present
//     console.log('cookie exists', cookie);
//   }
//   next(); // <-- important!
// })

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'index.html'));
});

app.listen(6888, 'localhost', function(err) {
  // if (err) {
  //   console.log(err);
  //   return;
  // }

  console.log('Listening at http://localhost:6888');
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
const path = require('path');

const port = 3000;
const app = express();

mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Unable to connect to database', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

app.use(express.static(__dirname + '/client/dist/'));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});
app.listen(port);
console.log('Server is running at http://localhost:' + port);

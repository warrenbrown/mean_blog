const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);

const port = 3000;
const app = express();

mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Unable to connect to database', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

//middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', authentication);


//connect server to Angular 2 index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});
app.listen(port);
console.log('Server is running at http://localhost:' + port);

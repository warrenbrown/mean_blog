const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database');

const api = require('./server/routes/api');

const port = 3000;
const app = express();

mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Unable to connect to database', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'dist/index.html'));
});

app.listen(port);
console.log('Server is running on http://localhost/' + port)

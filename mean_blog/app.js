const express = require('express');
const mongoose = require('moongoose');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

app.listen(port);
console.log('Server is running at http://localhost:' + port);

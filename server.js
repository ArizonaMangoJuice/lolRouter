'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
// const lolUser = require('./models/user');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');

app.use(express.static('public'));

app.use('/summoner', userRouter);


mongoose.connect('mongodb://localhost/lol');


app.listen(8080, () => {
  console.log('listening on port 8080');
});
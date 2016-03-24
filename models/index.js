'use strict';
const mongoose = require('mongoose');

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

let models = {};

require('./user.js')(mongoose, models);



module.exports = models;

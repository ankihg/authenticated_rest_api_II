'use strict';
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
let publicRouter = new express.Router();
let apiRouter = new express.Router();

let models = require('./models');

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.use('/auth', require('./lib/authenticate.js'));

app.use(bodyParser.json());

require('./routes/login.js')(publicRouter, models);
require('./routes/user-router.js')(publicRouter, models);

app.use(publicRouter);

app.listen(3000, () => console.log('server speaking'));

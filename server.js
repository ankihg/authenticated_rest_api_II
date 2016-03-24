'use strict';
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
let router = new express.Router();

let models = require('./models');

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.use(bodyParser.json());

require('./routes/login.js')(router, models);
require('./routes/user-router.js')(router, models);

app.use(router);

app.listen(3000, () => console.log('server speaking'));

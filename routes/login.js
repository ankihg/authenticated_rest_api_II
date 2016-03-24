'use strict';
const jwt = require('jsonwebtoken');

module.exports = (router, models) => {

  let User = models.User;

  router.post('/login', (req, res) => {
    console.log('plz login');
    let authArr = req.headers.authorization.split(' ');
    if (authArr[0] !== 'basic') return res.status(400).send('basic authentication only');
    authArr = new Buffer(authArr[1], 'base64').toString().split(':');

    let username = authArr[0];
    let password = authArr[1];

    User.findOne({name:username}, (err, user) => {
      if (err) return res.status(500).send('error finding username');
      if (!user) return res.status(400).json({msg:`user does not exist`});

      let valid = user.compareHash(password);
      if (!valid) return res.status(200).json({msg:'invalid login'});
      res.status(200).json({token:user.generateToken()}).end();
    });
  });

};

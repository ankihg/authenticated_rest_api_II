'use strict';
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  var decoded;
  try {
    var token = req.headers.authorization.split(' ')[1];
    decoded = jwt.verify(token, process.env.SECRET || 'change me');
    req.id = decoded._id;
    next();
  } catch (e){
    console.log(e);
    return res.status(400).json({'err': e, 'msg': 'authentication error'});
  }
}

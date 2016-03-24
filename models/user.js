'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (mongoose, models) => {

  let userSchema = new mongoose.Schema({
    name: String,
    password: String
  });

  userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    next();
  });

  userSchema.methods.compareHash = function(input) {
    return bcrypt.compareSync(input, this.password);
  };

  userSchema.methods.generateToken = function() {
    return jwt.sign({_id: this._id}, 'change me');
  }

  models.User = mongoose.model('User', userSchema);

};

'use strict';

module.exports = (router, models) => {

  let User = models.User;

  router.route('/users')
  .post((req, res) => {

    let authArr = req.headers.authorization.split(' ');
    if (authArr[0] !== 'basic') return res.status(400).send('basic authentication only');
    authArr = new Buffer(authArr[1], 'base64').toString().split(':');

    let username = authArr[0];
    let password = authArr[1];

    User.find({name:username})
    .then(matches => {
      if (matches.length) return res.status(200).json({'msg':'username already exists. choose another'}).end();
      var newUser = new User({'name':username, 'password':password});
      newUser.save((e, user) => {
        if (e) return res.status(500).json({'err':e, 'msg':'error creating user'}).end();
        return res.status(200).json(user).end();
      });
    })
    .catch(e => {
      console.log(e);
      return res.status(500).json({'err':e, 'msg':'error, sorry'}).end();
    });
  });

  router.route('/users/setup')
  .get((req, res) => {
    console.log('get setup');
    var tad = {
      name: 'tad',
      password: 'meow'
    }
    let newUser = new User(tad);
    newUser.save((err, user) => {
      if (err) return res.status(500).send('error saving user');
      return res.status(200).json(user).end();
    });
  });

  router.route('/auth/users')
  .get((req, res) => {
    console.log('get auth user');
    console.log(req.id);
    User.findOne({_id:req.id})
    .then(user => {
      res.status(200).json(user).end();
    })
    .catch(e => {
      res.status(400).json({'err':e, 'msg':'user not found'}).end();
    })
  });


};

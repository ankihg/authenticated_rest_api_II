'use strict';

module.exports = (router, models) => {

  let User = models.User;

  router.route('/users')
  .get((req, res) => {

  })
  .post((req, res) => {
    User.find({name:req.body.name}, (err, matches) => {
      if (err) return res.status(500).send(err);
      if (matches.length) return res.status(200).send('username already exists. choose another');

      var newUser = new User(req.body);
      newUser.save((err, user) => {
        if (err) return res.status(500).send('error creating user');
        return res.status(200).json(user).end();
      });
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

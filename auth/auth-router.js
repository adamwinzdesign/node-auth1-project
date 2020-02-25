const bcrypt = require('bcryptjs');
const router = require('express').Router();

const Users = require('../users/users-model.js');

// register new user
router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      req.session.loggedIn = true;

      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

// login
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome, ${user.username}!` })
      } else {
        res.status(401).json({ message: 'Invalid Credentials!' })
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

// logout
router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.desrtoy(error => {
      if (error) {
        res.status(500).json({ errorMessage: 'Error logging out!', error })
      } else {
        res.status(200).json({ message: 'You logged out!' })
      }
    })
  } else {
    res.status(200).json({ message: 'Bye!' })
  }
})

module.exports = router;

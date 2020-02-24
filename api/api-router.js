const bcrypt = require('bcryptjs');
const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const restricted = require('../auth/restricted-middleware.js');

router.use('/auth', authRouter);
router.use('/users', restricted, usersRouter);

router.get('/hash', (req, res) => {
  // read Authentication header
  const authentication = req.headers.authentication;

  // hash the value from the header
  const hash = bcrypt.hashSync(authentication, 8);

  res.json({ originalValue: authentication, hashedValue: hash })
})

module.exports = router;

// const bcrypt = require('bcryptjs');

// const Users = require('../users/users-model.js');

// module.exports = (req, res, next) => {
//   let { username, password } = req.headers;

//   if (username && password) {
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if(user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: 'Invalid Credentials!' })
//         }
//       })
//       .catch(({ name, message, stack }) => {
//         res.status(500).json({ name, message, stack })
//       })
//   } else {
//     res.status(400).json({ error: 'Please provide credentials!' })
//   }
// }

// commented code is from prior day of work, before sessions/cookies!  Refactored on day 2!

module.exports = (req, res, next) => {
  if (req.session && res.session.loggedIn) {
    next();
  } else {
    res.status(401).json({ message: 'You cannot pass!' })
  }
}

const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);

const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');

// const apiRouter = require('./api/api-router.js');
const configureMiddleware = require('./api/configure-middleware.js');
const restricted = require('./auth/restricted-middleware.js');
const knex = require('./data/dbconfig.js');

const server = express();

configureMiddleware(server);

const sessionConfig = {
  name: 'monster',
  secret: 'can you keep a secret?',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,  // should be true in production
    httpOnly: true
  },
  store: new KnexStore({
    knex,
    tablename: 'sessions',
    createtable: true,
    sidfieldname: 'sid',
    clearInterval: 1000 * 60 * 15,
  })
}

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));  // turns on the session middleware

// server.use('/api', apiRouter);
server.use('api/auth', authRouter);
server.use('api/users', restricted, usersRouter)

server.use('/', (req, res) => {
  res.send(`
    <h1>Welcome to the API/auth server!</h2>
  `)
})

module.exports = server;

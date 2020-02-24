const express = require('express');

const apiRouter = require('./api/api-router.js');
const configureMiddleware = require('./api/configure-middleware.js');

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);

// server.use('/', (req, res) => {
//   res.send(`
//     <h1>Welcome to the API/auth server!</h2>
//   `)
// })

module.exports = server;

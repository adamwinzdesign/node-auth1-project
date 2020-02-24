const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

// webauth-1-guided uses cors???
// const cors = require('cors');

module.exports = server => {
  server.use(helmet());
  server.use(morgan('dev'));  
  server.use(express.json());
  // server.use(cors());
}

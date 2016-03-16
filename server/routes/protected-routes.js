var express = require('express'),
	router = express.Router(),
    jwt     = require('express-jwt'),
    config  = require('../config');

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: config.secret
});

app.use('/', jwtCheck);

app.get('/random-quote', function(req, res) {
  res.status(200).send(123);
});

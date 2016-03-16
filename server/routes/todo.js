var express = require('express'),
	router = express.Router(),
	mongojs = require('mongojs'),
	db = mongojs('gamble', ['todo']);

var app = module.exports = express.Router();

app.get('/todos', function(req, res, next) {
    db.todo.find(function(err, todo) {
        if (err) {
            res.send(err);
        } else {
            res.json(todo);
        }
    });
});
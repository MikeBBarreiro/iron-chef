'use strict';

var Recipe = require('../models/recipe');

exports.index = function(req, res){
  Recipe.all(function(err, recipes){
    res.render('home/index', {recipes:recipes});
  });
};


exports.create = function(req, res){
  Recipe.create(req.body, function(err, recipe){
    console.log(recipe);
    res.render('home/recipe', {recipe:recipe});
  });
};


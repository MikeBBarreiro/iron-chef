'use strict';

function Recipe(r){
  this.name        = (!(r.name.trim().length)) ? 'Generic Recipe' : r.name;
  this.photo       = r.photo || 'http://yeastinfectionnomoreofficial.com/boubaker25/wp-content/themes/gonzo/images/no-image-blog-one.png';
  this.ingredients = r.ingredients.split(',').map(function(i){return i.trim();});
  this.directions  = r.directions || 'none';
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.create = function(obj, cb){
  var r = new Recipe(obj);
  Recipe.collection.save(r, cb);
};

Recipe.all = function(cb){
  Recipe.collection.find().toArray(cb);
};

module.exports = Recipe;


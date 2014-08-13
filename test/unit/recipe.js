/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Recipe    = require('../../app/models/recipe'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'iron-chef-test',
    Mongo     = require('mongodb');

describe('Recipe', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Recipe object', function(){
      var r = {name:'BBQ', photo:'URL', ingredients:['Chickin', 'BBQ', 'season'], directions:'Smuther chicken in BBQ and season, and Cook at 350 for 1 hour'},
          bbq = new Recipe(r);

      expect(bbq).to.be.instanceof(Recipe);
      expect(bbq.name).to.equal('BBQ');
      expect(bbq.photo).to.equal('URL');
      expect(bbq.ingredients).to.have.length(3);
      expect(bbq.directions).to.equal('Smuther chicken in BBQ and season, and Cook at 350 for 1 hour');
    });
  });

  describe('.create', function(){
    it('should find and create a recipe', function(done){
      var r = new Recipe({name:'BBQ', photo:'URL', ingred:'Chickin, BBQ, season', direc:'Smuther chicken in BBQ and season, and Cook at 350 for 1 hour'});

      Recipe.create(r, function(err, recipe){
        expect(recipe._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.all', function(){
    it('should get all recipes', function(done){
      Recipe.all(function(err, recipes){
        expect(recipes).to.have.length(3);
        done();
      });
    });
  });
});

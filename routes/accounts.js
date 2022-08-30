var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { create, getUser } = require('../db/queries');
var router = express.Router();
const { body, validationResult } = require('express-validator');

 
/* POST create an Account*/
router.post('/signup', 

// Express Validation
 body('username').isEmail(),
 body('pwd').isLength({min: 8}),

// Continue with the function
function(req, res, next) {

  // Express Validation - validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }

  const createAccount = req.body;
  bcrypt.hash(createAccount.pwd, 12, function(err, hash) {
    if(err) {
      return next(err);
      }
      create('accounts', { username: createAccount.username, hash }, (err, account) => {
        if(err) {
          return next(err);
        }
        res.send(account);
      });
    });
  });
 
/* POST Login*/
router.post('/login', 

// Express Validation
 body('username').isEmail(),
 body('pwd').isLength({min: 8}),

// Continue with the function
function(req, res, next) {

  // Express Validation - validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }

  const login = req.body;
    getUser(login.username, (err, [account]) => {                         // This is a spread and its one way we tell SQL that only bring the first result.
      if(err) {
        return next(err);
      }
      if(!account) {                                                      // This is another way to tell SQL to bring the first result if(!account[0]) {
        return res.sendStatus(404);
      }
      bcrypt.compare(login.pwd, account.hash, function(err, result) {      // Same as above: bcrypt.compare(login.pwd, account[0].pwd, function(err, result) {   
        if(err) {
          return next(err);
        }
        if(!result) {
          return res.sendStatus(401);                    
        }
        let token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + 60,               // (60 * 60) One hour
          username: login.username      
        }, 'secret');                                                   // Never pass a password in your code, use enviroment variables
        res.send({token: token});
      });
      
    });
  });

module.exports = router;

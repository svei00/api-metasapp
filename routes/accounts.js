var express = require('express');
var bcrypt = require('bcrypt');
const { getAll, getItem, create, update, delGoal } = require('../db/queries');
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
 

module.exports = router;

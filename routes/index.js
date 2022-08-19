var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to the MetasAPP API!!');          // Was before delelte/comment views folder: res.render('index', { title: 'Express' });
});

module.exports = router;

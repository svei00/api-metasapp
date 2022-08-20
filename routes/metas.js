var express = require('express');
var router = express.Router();

let goals = [
    {
      "id": "1",
      "details": "Run for 30 minutes",
      "frequency": "Daily",
      "events": 1,
      "icon": "🏃",
      "goal": 365,
      "term": "2022-12-31",
      "complete": 10
  },

  {
      "id": "2",
      "details": "Read Books",
      "frequency": "Yearly",
      "events": 6,
      "icon": "📚",
      "goal": 12,
      "term": "2022-12-31",
      "complete": 2
  },

  {
      "id": "3",
      "details": "Travel to National Parks",
      "frequency": "Montly",
      "events": 1,
      "icon": "🏞️",
      "goal": 60,
      "term": "2024-12-31",
      "complete": 40
  }
];

/* GET Goals list. */
router.get('/', function(req, res, next) {
  // Was: res.send('Write something here!');
});

/* GET Goal with id */
router.get('/:id', function (req, res, next) {

});
 
/* POST create a Goal*/
router.post('/', function(req, res, next) {

});

/* PUT update a goal */
router.put('/:id', function(req, res, next) {

});

/* DELETE goal */
router.delete('/:id', function(req, res, next) {

});

module.exports = router;

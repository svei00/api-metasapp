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
  res.send(goals);                                          // Was: res.send('Write something here!');
});

/* GET Goal with id */
router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  const goal = goals.find(item => item.id === id);
  if(!goal) {
    return res.sendStatus(404);                             // With return we guarantee that if there's nothing it stops.
  }
  res.send(goal);
});
 
/* POST create a Goal*/
router.post('/', function(req, res, next) {
  const goal = req.body;
  goals.push(goal);
  res.status(201);
  res.send(goal);
});

/* PUT update a goal */
router.put('/:id', function(req, res, next) {
  const goal = req.body;
  const id = req.params.id;
  if (goal.id !== id) {
    return res.sendStatus(409);
  }
  const index = goals.findIndex(item => item.id === id);
  if(index === -1) {
    return res.sendStatus(404);
  }
  goals[index] = goal;
  res.send(goal);
});

/* DELETE goal */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  const index = goals.findIndex(item => item.id === id);
  if(index === -1) {
    return res.sendStatus(404);
  }
  goals.splice(index, 1);
  res.sendStatus(204);
});

module.exports = router;

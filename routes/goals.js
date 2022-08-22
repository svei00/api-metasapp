var express = require('express');
const { getAll, getItem, create, update, delGoal } = require('../db/queries');
var router = express.Router();
const { body, validationResult } = require('express-validator');

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
  getAll('goals', (err, goals) => {                         // Was1: res.send('Write something here!'); Was2 before db: res.send(goals);
    if(err) {
      return next(err);                                     // Goes to the next middleware. You can watch it on app.js
    }
    console.log(goals)
    res.send(goals);
  });                          
});

/* GET Goal with id */
router.get('/:id', function (req, res, next) {
  /* Was before db
  const id = req.params.id;
  const goal = goals.find(item => item.id === id);
  if(!goal) {
    return res.sendStatus(404);                             // With return we guarantee that if there's nothing it stops.
  }
  res.send(goal);
});
*/
  const id = req.params.id;
  getItem('goals', id, (err, goal) => {
    if(err) {
      return next(err);
    }
    if(!goal.length) {
      return res.sendStatus(404);
    }
    res.send(goal[0]);
  });
});
 
/* POST create a Goal*/
router.post('/', 

// Express Validation
 body('details').isLength({ min: 5}),
 body('period').not().isEmpty(),

// Continue with the function
function(req, res, next) {
  /* Was before the db connection
  const goal = req.body;
  goals.push(goal);
  res.status(201);
  res.send(goal);
});
*/
  // Express Validation - validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }

  const createGoal = req.body;
  create('goals', createGoal, (err, goal) => {
    if(err) {
      return next(err);
    }
    res.send(goal);
  });
});

/* PUT update a goal */
router.put('/:id', 
  
  // Validation with Express-Validation
  body('details').isLength({min: 5}),
  body('period').not().isEmpty(),
  function(req, res, next) {
  
  /* Was before db integration 
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
*/
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }

  const body = req.body;
  const id = req.params.id;
  if(body.id !== id) {
    return res.sendStatus(409);
  }

  getItem('goals', id, (err, goal) => {
    if(err) {
      return next(err);
    }
    if(!goal.length) {
      return res.sendStatus(404);
    }

    update('goals', id, body, (err, actualizar) => { //
      if(err) {
        return next(err);
      }
      res.send(actualizar)
    });
  });
});

/* DELETE goal */
router.delete('/:id', function(req, res, next) {
  /*
  Was before the addition of the db
  const id = req.params.id;
  const index = goals.findIndex(item => item.id === id);
  if(index === -1) {
    return res.sendStatus(404);
  }
  goals.splice(index, 1);
  res.sendStatus(204);
});
*/
const id = req.params.id;
  getItem('goals', id, (err, goal) => {
    if(err) {
      return next(err);
    }
    if(!goal.length) {
      return res.sendStatus(404);
    }
    delGoal('goals', id, (err) => {
      if(err) {
        return next(err);
      }
      res.sendStatus(204);
    });
  });
});

module.exports = router;

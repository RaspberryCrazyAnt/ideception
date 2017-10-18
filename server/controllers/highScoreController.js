const HighScore = require('../models/highScoreModel.js'),
      db = require('../models/database');


const HighScoreController = {};

/**
* Add Idea
*/
HighScoreController.createScore = (req, res) => {
  let newScore = new HighScore({
    username: req.body.username,
    targetWord: req.body.targetWord,
    score: req.body.score
  });

  const query = {
    text: "INSERT INTO high-scores(username, targetWord, score) VALUES($1, $2, $3)",
    values: Object.values(newScore)
  };

  db.conn.one(query)
    .then(createdScore => {
      res.status(200).send({
        'msg' : 'score successfully created'
      })
    })
    .catch(err => {
      res.status(404).send(err)
    });
};

/**
* get Idea - gets ALL scores from table
*/
HighScoreController.getScores = (req, res) => {
  db.getAll('high-scores')
  .then(highScores => {
    if(!highScores) {res.status(404).send('No high scores found')};
    res.status(200).send(highScores);
  })
  .catch(err => {
    res.status(404).send(err);
  })
};

module.exports = HighScoreController;

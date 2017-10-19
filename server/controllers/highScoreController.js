const HighScore = require('../models/highScoreModel'),
      db = require('../models/database');


const HighScoreController = {};

/**
* Add Idea
*/
HighScoreController.createScore = (req, res) => {
  console.log(req.body);

  let newScore = new HighScore({
    username: req.body.username,
    targetword: req.body.targetword,
    score: req.body.score
  });

  const query = {
    text: "INSERT INTO high_scores(username, targetword, score) VALUES($1, $2, $3)",
    values: Object.values(newScore)
  };

  db.conn.query(query.text, query.values)
    .then(createdScore => {
      res.status(200).send({
        'msg' : 'score successfully created'
      })
    })
    .catch(err => {
      console.log(err);
      res.status(200).send(err)
    });
};

/**
* Get Scores - gets ALL scores from table
*/
HighScoreController.getScores = (req, res) => {
  db.conn.query('SELECT * FROM high_scores ORDER BY score ASC')
  .then(highScores => {
    if(!highScores) {res.status(404).send('No high scores found')};
    res.status(200).send(highScores);
  })
  .catch(err => {
    res.status(404).send(err);
  })
};

module.exports = HighScoreController;

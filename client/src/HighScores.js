import React from 'react';

const HighScores = (props) => {

  const scoresArr = []

  //grab all scores in the database
  props.scores.forEach( (scoreObj, index) => {
    scoresArr.push(
      <li key = {index}>
        <div>
          <span className="listSpan">{scoreObj.username}</span>
          <span className="listSpan">{scoreObj.targetword}</span>
          <span className="listSpan">{scoreObj.score}</span>
        </div>
      </li>);
  });

  return (
    <div className="highScores">
      <h3>High Scores: </h3>
      <ul>{scoresArr}</ul>
    </div>
  )
}

export default HighScores;

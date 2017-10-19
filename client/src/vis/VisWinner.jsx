import React from 'react';
import HighScores from '../HighScores';

const VisWinner = (props) => {
  return(
    <div className="VisWinner">
      <p>Yay! You Win!</p>
      <img src="https://media.giphy.com/media/d8ilc8qcW4lG0/giphy.gif"></img>
      <button type="submit" onClick={() => window.location.reload()}>Play Again?</button>
      <h3>
        Post your score by submitting your username
      </h3>
      <input onKeyUp={props.handleScoreSubmit} type="text" name="username" placeholder="Name" />
      <HighScores scores={props.scores}/>
    </div>
  );
};

export default VisWinner;

class HighScore {
  constructor(data) {
    this.username = data.username;
    this.targetWord = data.targetWord;
    this.score = Number(data.score);
  }
}

module.exports = HighScore;

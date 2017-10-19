class HighScore {
  constructor(data) {
    this.username = data.username;
    this.targetword = data.targetword;
    this.score = Number(data.score);
  }
}

module.exports = HighScore;

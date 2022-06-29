import test from "tape";

type PreMappedScore = 0 | 1 | 2 | 3;

class Game {
  player1Score: PreMappedScore;
  player2Score: PreMappedScore;
  tennisScoreMap: Record<PreMappedScore, number>;
  constructor() {
    this.player1Score = 0;
    this.player2Score = 0;
    this.tennisScoreMap = {
      0: 0,
      1: 15,
      2: 30,
      3: 40,
    };
  }

  private mapTennisScore(score: PreMappedScore): number {
    return this.tennisScoreMap[score];
  }

  getScore(): string {
    if (this.player1Score >= 3 && this.player2Score >= 3) {
      if (this.player1Score === this.player2Score) {
        return "deuce";
      } else if (this.player1Score > this.player2Score) {
        return "advantage - 40";
      } else if (this.player2Score > this.player1Score) {
        return "40 - advantage";
      }
    }
    return `${this.mapTennisScore(this.player1Score)} - ${this.mapTennisScore(
      this.player2Score
    )}`;
  }

  player1Scores() {
    this.player1Score += 1;
  }

  player2Scores() {
    this.player2Score += 1;
  }
}

test("the score is 0 - 0 at the start", async (assert) => {
  const game = new Game();
  assert.equal(game.getScore(), "0 - 0");
});

test("the score is 15 - 0 when player 1 scores", async (assert) => {
  const game = new Game();
  game.player1Scores();
  assert.equal(game.getScore(), "15 - 0");
});

test("the score is 0 - 15 when player 2 scores", async (assert) => {
  const game = new Game();
  game.player2Scores();
  assert.equal(game.getScore(), "0 - 15");
});

test("the score is 15 - 40 when player 2 scores 3 times and player 1 score once", async (assert) => {
  const game = new Game();
  game.player2Scores();
  game.player2Scores();
  game.player2Scores();
  game.player1Scores();
  assert.equal(game.getScore(), "15 - 40");
});

test("the score is 40 - 0 when player 1 scores three times", async (assert) => {
  const game = new Game();
  game.player1Scores();
  game.player1Scores();
  game.player1Scores();
  assert.equal(game.getScore(), "40 - 0");
});

test("the score is 0 - 40 when player 2 scores three times", async (assert) => {
  const game = new Game();
  game.player2Scores();
  game.player2Scores();
  game.player2Scores();
  assert.equal(game.getScore(), "0 - 40");
});

test("the score is deuce when player1 and player2 have both scored 3 times", async (assert) => {
  const game = new Game();
  game.player1Scores();
  game.player1Scores();
  game.player1Scores();
  game.player2Scores();
  game.player2Scores();
  game.player2Scores();
  assert.equal(game.getScore(), "deuce");
});

test("the score is advantage player1", async (assert) => {
  const game = new Game();
  game.player1Scores();
  game.player1Scores();
  game.player1Scores();
  game.player1Scores();
  game.player2Scores();
  game.player2Scores();
  game.player2Scores();
  assert.equal(game.getScore(), "advantage - 40");
});

test("the score is advantage player2", async (assert) => {
  const game = new Game();
  game.player1Scores();
  game.player1Scores();
  game.player1Scores();
  game.player2Scores();
  game.player2Scores();
  game.player2Scores();
  game.player2Scores();
  assert.equal(game.getScore(), "40 - advantage");
});

test("the score is back to deuce after advantage to player2", async (assert) => {
  const game = new Game();
  game.player1Scores();
  game.player1Scores();
  game.player1Scores();
  game.player2Scores();
  game.player2Scores();
  game.player2Scores();
  game.player2Scores();
  game.player1Scores();
  assert.equal(game.getScore(), "deuce");
});

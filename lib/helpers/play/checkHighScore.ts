export function checkHighScore(gameScore: number, lastHighScore: number) {
  if (gameScore > lastHighScore) {
    return true;
  } else return false;
}

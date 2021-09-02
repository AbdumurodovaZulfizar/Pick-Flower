import scoreRate from '../helpers/scoreRate';
import gameState from '../helpers/gameState';

test('should return the number corresponding to the game score', () => {
  gameState.score = 300;
  expect(scoreRate()).toBe(0.38);
});

test('should return the number corresponding to the game score', () => {
  gameState.score = 0;
  expect(scoreRate()).toBe(0.46);
});
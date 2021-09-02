// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { jest } from '@jest/globals';
import setMode from '../helpers/modeSet';
import gameState from '../helpers/gameState';

jest.mock('./prep.js');

beforeEach(() => {
  gameState.flowerDelay = null;
  gameState.thornDelay = null;
});

test('should set mode with the given arguments', () => {
  setMode(100, 300);
  expect(gameState.flowerDelay).toBe(100);
  expect(gameState.thornDelay).toBe(300);
});

test('should not set mode if the either argument type is not a number', () => {
  setMode('abc', 'xyz');
  expect(gameState.flowerDelay).toBe(null);
  expect(gameState.thornDelay).toBe(null);
});
import gameState from './gameState';

const setMode = (flowerDelay, thornDelay, playMode) => {
  if (typeof flowerDelay !== 'number' || typeof thornDelay !== 'number') return;
  gameState.flowerDelay = flowerDelay;
  gameState.thornDelay = thornDelay;
  gameState.mode = playMode;
};

export default setMode;
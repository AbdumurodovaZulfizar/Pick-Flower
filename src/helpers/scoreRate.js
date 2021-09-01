
import gameState from './gameState';

const scoreRate = () => {
  let result;
  if (gameState.score < 10) {
    result = 0.46;
  } else if (gameState.score < 100) {
    result = 0.42;
  } else if (gameState.score < 1000) {
    result = 0.38;
  } else {
    result = 0.34;
  }
  return result;
};

export default scoreRate;
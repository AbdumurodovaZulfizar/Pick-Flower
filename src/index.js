// eslint-disable-next-line import/no-unresolved
import 'regenerator-runtime/runtime';
import Phaser from 'phaser';
import './style.css';
import gameState from './helpers/gameState';
import Start from './scenes/start';
import InputName from './scenes/inputName';
import Play from './scenes/play';
import GameOver from './scenes/gameOver';
import Score from './scenes/score';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  dom: {
    createContainer: true,
  },
  width: gameState.canvas.width,
  height: gameState.canvas.height,
  backgroundColor: 'b9eaff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      enableBody: true,
    },
  },
  scene: [Start, InputName, Play, GameOver, Score],
};

gameState.game = new Phaser.Game(config);
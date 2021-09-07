import Phaser from 'phaser';
import gameState from '../helpers/gameState';
import playerImg from '../assets/images/player.png';
import flower1 from '../assets/images/flower1.png';
import flower2 from '../assets/images/flower2.png';
import landImg from '../assets/images/platform.png';
import miniPlatformImg from '../assets/images/platform2.png';
import thornImg from '../assets/images/thorn.png';
import flower3 from '../assets/images/flower3.png';
import playMusic from '../assets/sounds/game2.mp3';
import ouchSound from '../assets/sounds/over.wav';
import getSound from '../assets/sounds/score.wav';
import greenImg from '../assets/images/BG.png';

class Play extends Phaser.Scene {
  constructor() {
    super({ key: 'Play' });
  }

  preload() {
    this.load.image('platform', landImg);
    this.load.image('mini-platform', miniPlatformImg);
    this.load.image('flower1', flower1);
    this.load.image('flower2', flower2);
    this.load.image('flower3', flower3);
    this.load.image('thorn1', thornImg);
    this.load.image('green', greenImg);
    this.load.audio('play-music', playMusic);
    this.load.audio('ouch-sound', ouchSound);
    this.load.audio('get-sound', getSound);
    this.load.audio('play-music', playMusic);
    this.load.spritesheet('girl', playerImg, { frameWidth: 72, frameHeight: 90 });
  }

  create() {
    this.createParallaxBackgrounds();
    this.createPlatforms();
    this.createPlayer();
    this.createScore();
    this.setCameras();
    this.createCursor();
    this.createFlowers();
    this.createEnemies();
    this.addColliders();
    this.addSounds();
  }

  createParallaxBackgrounds() {
    this.bg3 = this.add.image(0, 0, 'green');
    this.bg3.setOrigin(0, 0);
  }

  createPlatforms() {
    this.land = this.physics.add.staticGroup();
    this.land.create(gameState.canvas.width * 0.5, gameState.canvas.height - 10, 'platform').setScale(1.1, 1).refreshBody();
    this.land.create(20, 500, 'mini-platform');
    this.land.create(430, 500, 'mini-platform');
    this.land.create(100, 340, 'mini-platform');
    this.land.create(340, 340, 'mini-platform');
    this.land.create(520, 340, 'mini-platform');
    this.land.create(680, 450, 'mini-platform');
    this.land.create(750, 280, 'mini-platform');
    this.land.create(940, 340, 'mini-platform');
  }

  createPlayer() {
    gameState.player = this.physics.add.sprite(gameState.canvas.width * 0.5, gameState.canvas.height * 0.8, 'girl').setScale(0.5);
    this.add.existing(gameState.player);
    this.physics.add.collider(gameState.player, this.land);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('girl', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('girl', { start: 4, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('girl', { start: 6, end: 9 }),
      frameRate: 5,
      repeat: -1,
    });
  }

  createScore() {
    this.scoreText = this.add.text(gameState.canvas.width * 0.41, gameState.canvas.height - 16, 'Score: 0', { fill: '#FFFFFF', font: '400 15px Roboto' });
  }

  setCameras() {
    this.cameras.main.setBounds(0, 0, gameState.camera.width, gameState.camera.height);
    this.physics.world.setBounds(0, 0, gameState.camera.width, gameState.camera.height);
    this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5);
    this.scoreText.setScrollFactor(0);
  }

  createCursor() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createFlowers() {
    this.flowers = this.physics.add.group();
    this.flowerList = ['flower1', 'flower2', 'flower3'];

    this.flowerGen = () => {
      const xCoord = Math.random() * gameState.camera.width;
      const randomflower = this.flowerList[Math.floor(Math.random() * this.flowerList.length)];
      this.flowers.create(xCoord, 10, randomflower);
    };

    this.flowerGenLoop = this.time.addEvent({
      delay: gameState.flowerDelay,
      callback: this.flowerGen,
      callbackScope: this,
      loop: true,
    });
  }

  createEnemies() {
    this.enemies = this.physics.add.group();
    this.enemiesList = ['thorn1'];

    this.thornGen = () => {
      const xCoord = Math.random() * gameState.camera.width;
      const randomthorn = this.enemiesList[Math.floor(Math.random() * this.enemiesList.length)];
      this.enemies.create(xCoord, 10, randomthorn);
    };

    this.thornGenLoop = this.time.addEvent({
      delay: gameState.thornDelay,
      callback: this.thornGen,
      callbackScope: this,
      loop: true,
    });
  }

  addSounds() {
    this.ouchSound = this.sound.add('ouch-sound');
    this.getSound = this.sound.add('get-sound');
    this.playMusic = this.sound.add('play-music');
    this.playMusic.loop = true;
    this.playMusic.play();
  }

  addColliders() {
    gameState.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.flowers, this.land, (flower) => { flower.destroy(); });
    this.physics.add.collider(this.enemies, this.land, (thorn) => { thorn.destroy(); });
    this.physics.add.overlap(gameState.player, this.flowers, this.getFlowers, null, this);
    this.physics.add.overlap(this.enemies, gameState.player, this.changeToGameOver, null, this);
  }

  update() {
    if (gameState.player.x >= (gameState.camera.width - 36)) {
      gameState.player.setX(0);
    }

    if (this.cursors.left.isDown) {
      gameState.player.setVelocityX(-160);
      gameState.player.anims.play('run', true);
      gameState.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      gameState.player.setVelocityX(160);
      gameState.player.anims.play('run', true);
      gameState.player.flipX = false;
    } else {
      gameState.player.setVelocityX(0);
      gameState.player.anims.play('idle', true);
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if (gameState.player.body.onFloor()) {
        this.canDoubleJump = true;
        gameState.player.body.setVelocityY(-300);
      } else if (this.canDoubleJump) {
        this.canDoubleJump = false;
        gameState.player.body.setVelocityY(-300);
      }
    }
  }

  getFlowers(player, flower) {
    flower.destroy();
    this.getSound.play();
    gameState.score += 70;
    this.scoreText.setText(`Score: ${gameState.score}`);
    return false;
  }

  changeToGameOver() {
    this.ouchSound.play();
    this.flowerGenLoop.destroy();
    this.thornGenLoop.destroy();
    this.physics.pause();
    this.anims.pauseAll();
    this.scene.stop('Play');
    this.playMusic.stop();
    this.scene.start('GameOver');
  }
}

export default Play;
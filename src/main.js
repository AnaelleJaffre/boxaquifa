import * as Phaser from "phaser";
import "./style.scss";
import GameScene from "./scenes/GameScene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [GameScene],
};

new Phaser.Game(config);
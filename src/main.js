import * as Phaser from "phaser";
import "./style.scss";
import SceneJeu from "./scenes/SceneJeu.js";
import { CONFIG_JEU } from "./config/Constantes.js";

const config = {
  type: Phaser.AUTO,
  parent: CONFIG_JEU.ID_JEU,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [SceneJeu],
};

new Phaser.Game(config);
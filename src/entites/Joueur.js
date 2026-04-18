import * as Phaser from "phaser";
import { CONFIG_JEU } from "../config/Constantes.js";

export default class Joueur {
  constructor(scene) {
    this.scene = scene;
    this.vie = CONFIG_JEU.VIE_MAX_JOUEUR;

    this.sprite = scene.add.circle(
      scene.scale.width / 2,
      scene.scale.height / 2,
      10,
      CONFIG_JEU.COULEUR_JOUEUR
    );

    this.curseurs = scene.input.keyboard.createCursorKeys();
  }

  mettreAJour() {
    const vitesse = CONFIG_JEU.VITESSE_JOUEUR;
    const { left, right, up, down } = this.curseurs;

    if (left?.isDown)  this.sprite.x -= vitesse;
    if (right?.isDown) this.sprite.x += vitesse;
    if (up?.isDown)    this.sprite.y -= vitesse;
    if (down?.isDown)  this.sprite.y += vitesse;
  }

  obtenirVie() {
    return this.vie;
  }
}
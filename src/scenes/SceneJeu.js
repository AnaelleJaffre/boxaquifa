import * as Phaser from "phaser";
import { CONFIG_JEU } from "../config/Constantes.js";
import Joueur from "../entites/Joueur.js";
import Inventaire from "../systemes/Inventaire.js";
import Interface from "../ui/Interface.js";

export default class SceneJeu extends Phaser.Scene {
  constructor() {
    super("SceneJeu");
  }

  create() {
    this.joueur     = new Joueur(this);
    this.inventaire = new Inventaire();
    this.interface  = new Interface();

    this.toucheInventaire = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes[CONFIG_JEU.TOUCHE_INVENTAIRE]
    );

    this.scale.on("resize", (gameSize) => {
      this.cameras.main.setSize(gameSize.width, gameSize.height);
    });

    this.interface.mettreAJourVie(this.joueur.obtenirVie());
  }

  update() {
    this.joueur.mettreAJour();

    if (Phaser.Input.Keyboard.JustDown(this.toucheInventaire)) {
      const ouvert = this.inventaire.basculer();
      this.interface.afficherInventaire(ouvert);
    }
  }
}
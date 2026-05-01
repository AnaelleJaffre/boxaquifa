import * as Phaser from "phaser";
import { CONFIG_JEU } from "../config/Constantes.js";
import { ASSETS } from "../config/Assets.js";
import Joueur from "../entites/Joueur.js";
import Inventaire from "../systemes/Inventaire.js";
import Interface from "../ui/Interface.js";
import Carte from "../systemes/Carte.js";

export default class SceneJeu extends Phaser.Scene {
  constructor() {
    super("SceneJeu");
  }

  preload() {
    this.load.tilemapTiledJSON(ASSETS.CARTE.CLE, ASSETS.CARTE.CHEMIN);

    // Tilesets classiques
    ASSETS.TILESETS.forEach(({ CLE, CHEMIN }) => {
      this.load.spritesheet(CLE, CHEMIN, { frameWidth: 30, frameHeight: 30 });
    });

    // Objets individuels du tileset moridano
    const objets = ASSETS.OBJETS_MORIDANO;

    objets.forEach((nom) => {
      this.load.image(nom, `assets/tilesets/moridona/objets/${nom}.png`);
    });

    // Mira
    this.load.spritesheet(
      ASSETS.PERSONNAGES.MIRA.CLE,
      ASSETS.PERSONNAGES.MIRA.CHEMIN,
      {
        frameWidth:  CONFIG_JEU.MIRA_FRAME_LARGEUR,
        frameHeight: CONFIG_JEU.MIRA_FRAME_HAUTEUR,
      }
    );
  }

  create() {
    this.carte = new Carte(this);
    this.carte.creer();
    this.children.depthSort();

    const depart = this.carte.obtenirPointDepart();
    this.joueur = new Joueur(this, depart.x, depart.y);

    // Collisions joueur <-> carte
    this.carte.activerCollisionJoueur(this.joueur.sprite);

    this.inventaire = new Inventaire();
    this.interface  = new Interface();
    this.interface.mettreAJourVie(this.joueur.obtenirVie());

    this.cameras.main.setBounds(
      0, 0,
      this.carte.tilemap.widthInPixels,
      this.carte.tilemap.heightInPixels
    );
    this.cameras.main.startFollow(this.joueur.sprite, true, 0.1, 0.1);

    this.toucheInventaire = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes[CONFIG_JEU.TOUCHE_INVENTAIRE]
    );

    this.scale.on("resize", (gameSize) => {
      this.cameras.main.setSize(gameSize.width, gameSize.height);
    });
  }

  update() {
    this.joueur.mettreAJour();
    this.carte.mettreAJourDepth(this.joueur.sprite);
    // this.children.depthSort();

    if (Phaser.Input.Keyboard.JustDown(this.toucheInventaire)) {
      const ouvert = this.inventaire.basculer();
      this.interface.afficherInventaire(ouvert);
    }

  }
}
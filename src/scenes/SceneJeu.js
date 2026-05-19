import * as Phaser from "phaser";
import { CONFIG_JEU } from "../config/Constantes.js";
import { ASSETS } from "../config/Assets.js";
import Joueur from "../entites/Joueur.js";
import Inventaire from "../systemes/Inventaire.js";
import Interface from "../ui/Interface.js";
import Carte from "../systemes/Carte.js";
import Son from "../systemes/Son.js";
import Tactile from "../systemes/Tactile.js";

export default class SceneJeu extends Phaser.Scene {
  constructor() {
    super("SceneJeu");
  }

  preload() {
    this.load.tilemapTiledJSON(ASSETS.CARTE.CLE, ASSETS.CARTE.CHEMIN);
    this.load.audio(ASSETS.SONS.DEPLACEMENT.CLE,    ASSETS.SONS.DEPLACEMENT.CHEMIN);
    this.load.audio(ASSETS.SONS.DEPLACEMENT_HERBE.CLE,    ASSETS.SONS.DEPLACEMENT_HERBE.CHEMIN);
    this.load.audio(ASSETS.SONS.THEME_MORIDONA.CLE, ASSETS.SONS.THEME_MORIDONA.CHEMIN);

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
    this.tactile = new Tactile(this);
    this.tactile.creer();
    this.objetProche = null;

    const depart = this.carte.obtenirPointDepart();
    this.joueur = new Joueur(this, depart.x, depart.y);

    // Collisions joueur <-> carte
    this.carte.activerCollisionJoueur(this.joueur.sprite);

    this.inventaire = new Inventaire();
    this.interface  = new Interface();
    this.interface.mettreAJourVie(this.joueur.obtenirVie());

    // Son du jeu
    this.son = new Son(this);
    this.son.creer();
    
    this.cameras.main.setBounds(
      0, 0,
      this.carte.tilemap.widthInPixels,
      this.carte.tilemap.heightInPixels
    );
    this.cameras.main.startFollow(this.joueur.sprite, true, 0.1, 0.1);

    // Touches
    this.toucheInventaire = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes[CONFIG_JEU.TOUCHE_INVENTAIRE]
    );   
    this.toucheRamasser = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes[CONFIG_JEU.TOUCHE_RAMASSER]
    );

    this.scale.on("resize", (gameSize) => {
      this.cameras.main.setSize(gameSize.width, gameSize.height);
    });
  }


  update() {

    // Joueur
    this.joueur.mettreAJour(this.tactile)
    this.son.mettreAJourPas(this.joueur.estEnMouvement())
    this.carte.mettreAJourDepth(this.joueur.sprite)
    this.carte.animerVegetation(this.joueur.sprite, this.son)

    // Inventaire toggle
    if (Phaser.Input.Keyboard.JustDown(this.toucheInventaire)) {
      this.interface.afficherInventaire(this.inventaire.basculer())
    }

    // Interaction objet
    const objet = this.objetProche = this.carte.obtenirObjetProche(this.joueur.sprite)
    this.interface.afficherIndicateurRamassage(this.objetProche, this.cameras.main)

    // Pickup
    if (Phaser.Input.Keyboard.JustDown(this.toucheRamasser) && objet) {

      if (this.inventaire.ajouterObjet({
        cle: this.objetProche.cleStack,
        nom: this.objetProche.nom,
        icone: this.objetProche.icone,
        quantite: this.objetProche.quantiteRamassee
      })) {

        this.carte.retirerObjet(objet)

        this.interface.mettreAJourSlots(
          this.inventaire.obtenirSlots()
        )

        this.objetProche = null
      }
    }
  }

}
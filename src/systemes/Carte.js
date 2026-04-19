import { ASSETS } from "../config/Assets.js";

export default class Carte {
  constructor(scene) {
    this.scene = scene;
    this.calques = {};
    this.objets = {};
    this.objetsDepth = []; // Objets individuels pour le depth sorting
  }

  creer() {
    this.tilemap = this.scene.make.tilemap({ key: ASSETS.CARTE.CLE });

    const tilesets = ASSETS.TILESETS.map(({ CLE }) =>
      this.tilemap.addTilesetImage(CLE, CLE)
    );

    // Calques fixes — rendu normal, toujours derrière
    this.calques.fond = this.tilemap
      .createLayer(ASSETS.CALQUES.FOND, tilesets)
      .setDepth(0);

    this.calques.detailsSol = this.tilemap
      .createLayer(ASSETS.CALQUES.DETAILS_SOL, tilesets)
      .setDepth(1);

    this.calques.herbes1 = this.tilemap
      .createLayer(ASSETS.CALQUES.HERBES_1, tilesets)
      .setDepth(2);

    // Calques avec depth sorting — convertis en Image individuelles
    this._creerObjetsDepth(tilesets, ASSETS.CALQUES.MAISON_POUBELLE, true);
    this._creerObjetsDepth(tilesets, ASSETS.CALQUES.HERBES_2, false);

    this._creerCorpsStatiques();
  }

  _creerObjetsDepth(tilesets, nomCalque, avecCollision) {
    const calque = this.tilemap.createLayer(nomCalque, tilesets);

    if (avecCollision) {
      calque.setCollisionByExclusion([-1]);
      this.calques.maisonPoubelle = calque;
    }

    calque.forEachTile((tuile) => {
      if (tuile.index === -1) return;

      const x = (tuile.x + 0.5) * this.tilemap.tileWidth;
      const y = (tuile.y + 0.5) * this.tilemap.tileHeight;

      const tileset = this.tilemap.getTileset(tuile.tileset.name);
      const frameIndex = tuile.index - tileset.firstgid;

      const img = this.scene.add.image(x, y, tileset.name, frameIndex);
      // Bas de la tuile = référence de profondeur
      img.setDepth(y + this.tilemap.tileHeight / 2);

      this.objetsDepth.push(img);
    });

    calque.setAlpha(0); // Cache le calque original, garde la collision
  }

  _creerCorpsStatiques() {
    const coucheObjets = this.tilemap.getObjectLayer(ASSETS.CALQUES.OBJETS);
    if (!coucheObjets) return;

    coucheObjets.objects.forEach((objet) => {
      if (objet.name) this.objets[objet.name] = objet;
    });
  }

  activerCollisionJoueur(spriteJoueur) {
    this.scene.physics.add.collider(
      spriteJoueur,
      this.calques.maisonPoubelle
    );
  }

  mettreAJourDepth(spriteJoueur) {
    // Depth du joueur = Y de ses pieds
    const piedJoueur = spriteJoueur.y + spriteJoueur.displayHeight / 2;
    spriteJoueur.setDepth(piedJoueur);

    // Chaque tuile-objet compare ses pieds à ceux du joueur
    // Rien à faire ici — leur depth est fixe (bas de tuile)
    // Le tri Phaser s'occupe du reste automatiquement
  }

  obtenirPointDepart() {
    const obj = this.objets[ASSETS.OBJETS.POINT_DEPART];
    if (!obj) return { x: 400, y: 300 };
    return { x: obj.x + obj.width / 2, y: obj.y + obj.height / 2 };
  }
}
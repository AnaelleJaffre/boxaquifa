import { ASSETS } from "../config/Assets.js";

// Correspondance gid -> cle texture (firstgid du tileset moridano = 2305)
const FIRSTGID_MORIDANO = 2305;

export default class Carte {
  constructor(scene) {
    this.scene = scene;
    this.calques = {};
    this.objets = {};       // Objets fonctionnels (portes, spawn...)
    this.objetsDepth = [];  // Sprites soumis au depth sorting
  }

  creer() {
    this.tilemap = this.scene.make.tilemap({ key: ASSETS.CARTE.CLE });
    this.firstGidMonridano = this._obtenirFirstGidMonridano();

    const tilesets = ASSETS.TILESETS.map(({ CLE }) =>
      this.tilemap.addTilesetImage(CLE, CLE)
    );

    // Calques de sol — depth fixe, toujours derrière
    this.calques.fond = this.tilemap
      .createLayer(ASSETS.CALQUES.FOND, tilesets)
      .setDepth(0);

    this.calques.sol = this.tilemap
      .createLayer(ASSETS.CALQUES.SOL, tilesets)
      .setDepth(1);

    // Objets depuis les objectgroups
    this._chargerBatiments();
    this._chargerHerbes();
    this._chargerFonctionnels();
  }

  _obtenirFirstGidMonridano() {
    const donneesBrutes = this.tilemap.tilesets;
    const tileset = donneesBrutes.find(t => t.name === "moridano");
    return tileset?.firstgid ?? 2369; // fallback en dur
  }

  _gidVersCle(gid) {
    const gidPur = gid & 0x1FFFFFFF;
    const index = gidPur - this.firstGidMonridano;
    return ASSETS.OBJETS_MORIDANO[index] ?? null;
  }

  _flipDepuisGid(gid) {
    return {
      flipX: !!(gid & 0x80000000),
      flipY: !!(gid & 0x40000000),
    };
  }

  _creerSpriteObjet(objet, profondeurReference) {
    const cle = this._gidVersCle(objet.gid);
    console.log("gid:", objet.gid, "gid pur:", objet.gid & 0x1FFFFFFF, "index:", (objet.gid & 0x1FFFFFFF) - FIRSTGID_MORIDANO, "cle:", cle);
    if (!cle) return null;

    const { flipX, flipY } = this._flipDepuisGid(objet.gid);

    // Tiled : origine en bas-gauche pour les objets tileset
    const img = this.scene.add.image(
      objet.x + objet.width / 2,
      objet.y - objet.height / 2,
      cle
    );

    img.setFlip(flipX, flipY);
    img.setDisplaySize(objet.width, objet.height);

    // Depth = Y du bas de l'objet (pieds)
    const depth = profondeurReference ?? (objet.y);
    img.setDepth(depth);

    return img;
  }

  _chargerBatiments() {
    const couche = this.tilemap.getObjectLayer(ASSETS.CALQUES.BATIMENTS);
    
    console.log("couche Batiments:", couche);
    console.log("objets:", couche?.objects);
    if (!couche) return;
    

    couche.objects.forEach((objet) => {
      const sprite = this._creerSpriteObjet(objet, objet.y);
      if (sprite) this.objetsDepth.push(sprite);
    });
  }

  _chargerHerbes() {
    const couche = this.tilemap.getObjectLayer(ASSETS.CALQUES.HERBES);
    if (!couche) return;

    couche.objects.forEach((objet) => {
      const sprite = this._creerSpriteObjet(objet, objet.y + 1);
      if (sprite) this.objetsDepth.push(sprite);
    });
  }

  _chargerFonctionnels() {
    const couche = this.tilemap.getObjectLayer(ASSETS.CALQUES.FONCTIONNELS);
    if (!couche) return;

    couche.objects.forEach((objet) => {
      if (objet.name) this.objets[objet.name] = objet;
    });
  }

  activerCollisionJoueur(spriteJoueur) {
    // Les collisions seront gerees via overlap sur les objets nommes
    // (poubelle, maison) dans SceneJeu — pas de calque de collision ici
  }

  mettreAJourDepth(spriteJoueur) {
    // Depth du joueur = Y de ses pieds
    const piedJoueur = spriteJoueur.y + spriteJoueur.displayHeight / 2;
    spriteJoueur.setDepth(piedJoueur);
    // Les objets ont un depth fixe base sur leur Y bas — Phaser trie automatiquement
  }

  obtenirPointDepart() {
    const obj = this.objets[ASSETS.OBJETS.POINT_DEPART];
    if (!obj) return { x: 400, y: 300 };
    return { x: obj.x + obj.width / 2, y: obj.y + obj.height / 2 };
  }

  obtenirObjet(nom) {
    return this.objets[nom] ?? null;
  }
}
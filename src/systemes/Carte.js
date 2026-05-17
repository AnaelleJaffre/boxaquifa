import { ASSETS } from "../config/Assets.js";
import { CONFIG_JEU } from "../config/Constantes.js";
import * as Phaser from "phaser";

export default class Carte {
  constructor(scene) {
    this.scene = scene;
    this.calques = {};
    this.objets = {};
    this.objetsDepth = [];
    this.zonesVegetation = []; // Herbes + fleurs
    this.corpsStatiques = [];
  }

  creer() {
    this.tilemap = this.scene.make.tilemap({ key: ASSETS.CARTE.CLE });
    this.firstGidMonridano = this._obtenirFirstGidMonridano();

    const tilesets = ASSETS.TILESETS.map(({ CLE }) =>
      this.tilemap.addTilesetImage(CLE, CLE)
    );

    this.calques.fond = this.tilemap.createLayer(ASSETS.CALQUES.FOND, tilesets).setDepth(0);
    this.calques.sol  = this.tilemap.createLayer(ASSETS.CALQUES.SOL,  tilesets).setDepth(1);

    this._chargerBatiments();
    this._chargerVegetation(ASSETS.CALQUES.HERBES);
    this._chargerVegetation(ASSETS.CALQUES.FLEURS);
    this._chargerCoquillages();
    this._chargerFonctionnels();
    this._creerCollisions();
  }

  // ─── Tileset ────────────────────────────────────────────────────────────────

  _obtenirFirstGidMonridano() {
    const tileset = this.tilemap.tilesets.find(t => t.name === "moridano");
    return tileset?.firstgid ?? ASSETS.FIRSTGID_MORIDANO_FALLBACK;
  }

  _gidVersCle(gid) {
    const gidPur = gid & 0x1FFFFFFF;
    const index  = gidPur - this.firstGidMonridano;
    return ASSETS.OBJETS_MORIDANO[index] ?? null;
  }

  _flipDepuisGid(gid) {
    return {
      flipX: !!(gid & 0x80000000),
      flipY: !!(gid & 0x40000000),
    };
  }

  // ─── Creation de sprites ────────────────────────────────────────────────────

  _creerSpriteObjet(objet, depth) {
    const cle = this._gidVersCle(objet.gid);
    if (!cle) return null;

    const { flipX, flipY } = this._flipDepuisGid(objet.gid);

    const img = this.scene.add.image(
      objet.x + objet.width  / 2,
      objet.y - objet.height / 2,
      cle
    );

    img.setFlip(flipX, flipY);
    img.setDisplaySize(objet.width, objet.height);
    img.setDepth(depth ?? objet.y);

    return img;
  }

  _creerSpriteVegetation(objet) {
    const cle = this._gidVersCle(objet.gid);
    if (!cle) return null;

    const { flipX, flipY } = this._flipDepuisGid(objet.gid);

    const img = this.scene.add.image(
      objet.x + objet.width / 2,
      objet.y, // origine bas
      cle
    );

    img.setOrigin(0.5, 1);
    img.setFlip(flipX, flipY);
    img.setDisplaySize(objet.width, objet.height);
    img.setDepth(objet.y + 0.5);

    // etat d'animation
    img.enAller          = false;
    img.enRetour         = false;
    img.timestampAller   = null;
    img.timestampRetour  = null;
    img.timestampDebut   = null;
    img.rotationCible    = 0;
    img.rotationDepart   = 0;
    img.rotation         = 0;

    return img;
  }

  // ─── Chargement des calques ─────────────────────────────────────────────────

  _chargerBatiments() {
    const couche = this.tilemap.getObjectLayer(ASSETS.CALQUES.BATIMENTS);
    if (!couche) return;

    couche.objects.forEach((objet) => {
      const sprite = this._creerSpriteObjet(objet, objet.y);
      if (sprite) this.objetsDepth.push(sprite);
    });
  }

  _chargerVegetation(nomCalque) {
    const couche = this.tilemap.getObjectLayer(nomCalque);
    if (!couche) return;

    couche.objects.forEach((objet) => {
      const img = this._creerSpriteVegetation(objet);
      if (!img) return;

      // Zone de detection à la base
      const zone = this.scene.add.rectangle(
        objet.x + objet.width / 2,
        objet.y - CONFIG_JEU.MIRA_HITBOX_HAUTEUR / 2,
        objet.width,
        CONFIG_JEU.MIRA_HITBOX_HAUTEUR
      );
      this.scene.physics.add.existing(zone, true);
      zone.sprite = img;

      this.zonesVegetation.push(zone);
      this.objetsDepth.push(img);
    });
  }

  _chargerCoquillages() {
    const couche = this.tilemap.getObjectLayer(ASSETS.CALQUES.COQUILLAGES);
    if (!couche) return;

    couche.objects.forEach((objet) => {
      const sprite = this._creerSpriteObjet(objet, CONFIG_JEU.DEPTH_SOL_OBJETS);
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

  _creerCollisions() {
    const couche = this.tilemap.getObjectLayer(ASSETS.CALQUES.COLLISIONS);
    if (!couche) return;

    couche.objects.forEach((objet) => {
      const zone = this.scene.add.rectangle(
        objet.x + objet.width  / 2,
        objet.y + objet.height / 2 + 15,
        objet.width,
        objet.height
      );
      this.scene.physics.add.existing(zone, true);
      this.corpsStatiques.push(zone);
    });
  }

  // ─── Physique ───────────────────────────────────────────────────────────────

  activerCollisionJoueur(spriteJoueur) {
    spriteJoueur.body.setCollideWorldBounds(true);
    this.scene.physics.world.setBounds(
      0, 0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels
    );

    this.corpsStatiques.forEach((zone) => {
      this.scene.physics.add.collider(spriteJoueur, zone);
    });
  }

  // ─── Mise à jour ────────────────────────────────────────────────────────────

  mettreAJourDepth(spriteJoueur) {
    const piedJoueur = spriteJoueur.y + spriteJoueur.displayHeight / 2;
    spriteJoueur.setDepth(piedJoueur);
  }

  animerVegetation(spriteJoueur, son) {
    const maintenant  = this.scene.time.now;
    const distance    = CONFIG_JEU.VEGETATION_DISTANCE_DECLENCHEMENT;
    const dureeAller  = CONFIG_JEU.VEGETATION_DUREE_ALLER_MS;
    const delai       = CONFIG_JEU.VEGETATION_DELAI_RETOUR_MS;
    const dureeRetour = CONFIG_JEU.VEGETATION_DUREE_RETOUR_MS;
    const rotMax      = CONFIG_JEU.VEGETATION_ROTATION_MAX;

    const piedX = spriteJoueur.x;
    const piedY = spriteJoueur.y + spriteJoueur.displayHeight / 2;

    const joueurBouge = spriteJoueur.body.velocity.x !== 0 || spriteJoueur.body.velocity.y !== 0;

    this.zonesVegetation.forEach((zone) => {
      const img = zone.sprite;
      const dx   = piedX - img.x;
      const dy   = piedY - img.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Nouveau declenchement uniquement si le joueur bouge
      if (joueurBouge && dist < distance && !img.enAller && !img.enRetour && img.timestampRetour === null) {
      img.enAller        = true;
      img.timestampAller = maintenant;
      img.rotationCible  = dx > 0 ? rotMax : -rotMax;
      son.jouerBruitVegetation();
      } else if (img.enAller) {
        const progression = Math.min((maintenant - img.timestampAller) / dureeAller, 1);
        img.rotation = img.rotationCible * progression;

        if (progression >= 1) {
          img.enAller        = false;
          img.timestampRetour = maintenant + delai;
        }

      } else if (!img.enAller && !img.enRetour && img.timestampRetour !== null) {
        if (maintenant >= img.timestampRetour) {
          img.enRetour       = true;
          img.timestampDebut = maintenant;
          img.rotationDepart = img.rotation;
        }

      } else if (img.enRetour) {
        const progression = Math.min((maintenant - img.timestampDebut) / dureeRetour, 1);
        img.rotation = img.rotationDepart * (1 - progression);

        if (progression >= 1) {
          img.rotation        = 0;
          img.enRetour        = false;
          img.timestampRetour = null;
        }
      }
    });
  }

  // ─── Accès ──────────────────────────────────────────────────────────────────

  obtenirPointDepart() {
    const obj = this.objets[ASSETS.OBJETS.POINT_DEPART];
    if (!obj) return { x: 400, y: 300 };
    return { x: obj.x + obj.width / 2, y: obj.y + obj.height / 2 };
  }

  obtenirObjet(nom) {
    return this.objets[nom] ?? null;
  }
}
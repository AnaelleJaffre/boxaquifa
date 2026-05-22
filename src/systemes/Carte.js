import { ASSETS } from "../config/Assets.js";
import { CONFIG_JEU } from "../config/Constantes.js";
import { DEFINITIONS } from "../config/Definitions.js";
import * as Phaser from "phaser";

export default class Carte {
  constructor(scene) {
    this.scene = scene;
    this.calques = {};
    this.objets = {};
    this.objetsDepth = [];
    this.zonesVegetation = [];
    this.corpsStatiques = [];
    this.objetsRamassables = [];
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
    this._chargerCalque(ASSETS.CALQUES.HERBES);
    this._chargerCalque(ASSETS.CALQUES.FLEURS);
    this._chargerCalque(ASSETS.CALQUES.COQUILLAGES);
    this._chargerFonctionnels();
    this._creerCollisions();
    this._initialiserVent();
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

  _chargerCalque(nomCalque) {
    const couche = this.tilemap.getObjectLayer(nomCalque);
    if (!couche) return;

    couche.objects.forEach((objet) => {
      const cle = this._gidVersCle(objet.gid);
      if (!cle) return;

      const def = DEFINITIONS[cle];
      if (!def) return; // objet non déclaré = ignoré

      const tags = def.tags ?? [];
      const estVegetation = tags.includes("vegetation");

      // Le sprite est créé selon son comportement visuel principal
      const img = estVegetation
        ? this._creerSpriteVegetation(objet)
        : this._creerSpriteObjet(objet, 1.5);

      if (!img) return;

      if (estVegetation)            this._appliquerVegetation(img, objet);
      if (tags.includes("ramassable")) this._appliquerRamassable(img, def);

      this.objetsDepth.push(img);
    });
  }

  _appliquerVegetation(img, objet) {
    const zone = this.scene.add.rectangle(
      objet.x + objet.width / 2,
      objet.y - CONFIG_JEU.MIRA_HITBOX_HAUTEUR / 2,
      objet.width,
      CONFIG_JEU.MIRA_HITBOX_HAUTEUR
    );
    this.scene.physics.add.existing(zone, true);
    zone.sprite = img;
    this.zonesVegetation.push(zone);
  }

  _appliquerRamassable(img, def) {
    img.ramassable       = true;
    img.cleStack         = def.cleStack;
    img.nom              = def.nom;
    img.icone            = def.icone;
    img.quantiteRamassee = def.quantiteRamassee;
    this.objetsRamassables.push(img);
  }

  obtenirObjetProche(spriteJoueur) {
    const piedX = spriteJoueur.x;
    const piedY = spriteJoueur.y + spriteJoueur.displayHeight / 2;
    const dist  = CONFIG_JEU.DISTANCE_RAMASSAGE;

    let plusProche = null;
    let distMin    = Infinity;

    this.objetsRamassables.forEach((sprite) => {
      const dx = piedX - sprite.x;
      const dy = piedY - sprite.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < dist && d < distMin) {
        distMin    = d;
        plusProche = sprite;
      }
    });

    return plusProche;
  }

  retirerObjet(sprite) {
    const index = this.objetsRamassables.indexOf(sprite);
    if (index !== -1) this.objetsRamassables.splice(index, 1);

    const indexZone = this.zonesVegetation.findIndex(z => z.sprite === sprite);
    if (indexZone !== -1) {
      this.zonesVegetation[indexZone].destroy();
      this.zonesVegetation.splice(indexZone, 1);
    }

    const indexDepth = this.objetsDepth.indexOf(sprite);
    if (indexDepth !== -1) this.objetsDepth.splice(indexDepth, 1);

    sprite.destroy();
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
    const rotationVent = this._animerVent();

    const piedX = spriteJoueur.x;
    const piedY = spriteJoueur.y + spriteJoueur.displayHeight / 2;

    const joueurBouge = spriteJoueur.body.velocity.x !== 0 || spriteJoueur.body.velocity.y !== 0;

    this.zonesVegetation.forEach((zone) => {
      const img = zone.sprite;
      const dx   = piedX - img.x;
      const dy   = piedY - img.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (joueurBouge && dist < distance && !img.enAller && !img.enRetour && img.timestampRetour === null) {
        img.enAller        = true;
        img.timestampAller = maintenant;
        img.rotationCible  = dx > 0 ? rotMax : -rotMax;
        son.jouerBruitVegetation();

      } else if (img.enAller) {
        const progression = Math.min((maintenant - img.timestampAller) / dureeAller, 1);
        img.rotation = img.rotationCible * progression;
        if (progression >= 1) {
          img.enAller         = false;
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

      if (img.enAller || img.enRetour || img.timestampRetour !== null) {
        img.rotation += rotationVent * 0.4;
      } else {
        img.rotation = rotationVent;
      }
    });
  }

  // ___ Vent __________________________________________________________________

  _initialiserVent() {
    this.vent = {
      timestampDebut:  this.scene.time.now,
      duree:           CONFIG_JEU.VENT_DUREE_MS,
      rotationCible:   this._nouvelAngleVent(),
      rotationDepart:  0,
    };
    }

    _nouvelAngleVent() {
    const base      = CONFIG_JEU.VENT_ROTATION_MAX;
    const variation = CONFIG_JEU.VENT_VARIATION;
    // Alterne gauche/droite avec légère variation aléatoire
    const signe = this.vent?.rotationCible > 0 ? -1 : 1;
    return signe * (base + (Math.random() * variation - variation / 2));
    }

    _animerVent() {
    const maintenant = this.scene.time.now;
    const progression = Math.min(
      (maintenant - this.vent.timestampDebut) / this.vent.duree,
      1
    );

    // Interpolation sinusoïdale pour un mouvement doux
    const t = Math.sin(progression * Math.PI / 2);
    const rotationVent = this.vent.rotationDepart + 
      (this.vent.rotationCible - this.vent.rotationDepart) * t;

    // Nouveau cycle
    if (progression >= 1) {
      this.vent.rotationDepart = this.vent.rotationCible;
      this.vent.rotationCible  = this._nouvelAngleVent();
      this.vent.timestampDebut = maintenant;
    }

    return rotationVent;
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
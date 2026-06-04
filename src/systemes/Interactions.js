import { CONFIG_JEU } from "../config/Constantes.js";
import { DEFINITIONS } from "../config/Definitions.js";

// Association tag - config d'interaction
const INTERACTIONS = {
  ramassable: {
    verbe:   "Ramasser",
    passif:  false,
    tuto:    null,
  },
  jeter: {
    verbe:   "Jeter",
    passif:  true,
    tuto:    "Glisse un objet de l'inventaire vers la poubelle pour le jeter.",
  },
  entrer: {
    verbe:   "Entrer",
    passif:  false,
    tuto:    null,
  },
  parler: {
    verbe:   "Parler",
    passif:  false,
    tuto:    null,
  },
};

export default class Interactions {
  constructor(scene, interface_) {
    this.scene      = scene;
    this.interface  = interface_;
    this.objetsInteractifs = []; // { sprite, tags, nom, callbacks... }
    this.objetActif = null;
  }

  // ─── Enregistrement ────────────────────────────────────────────────────────

  enregistrer(objet) {
    // objet = { sprite, tags, nom, icone, callbacks: { ramassable, jeter, entrer, parler } }
    this.objetsInteractifs.push(objet);
  }

  supprimer(sprite) {
    this.objetsInteractifs = this.objetsInteractifs.filter(
      (o) => o.sprite !== sprite
    );
  }

  // ─── Detection ─────────────────────────────────────────────────────────────

  mettreAJour(spriteJoueur) {
    const piedX = spriteJoueur.x;
    const piedY = spriteJoueur.y + spriteJoueur.displayHeight / 2;

    let plusProche  = null;
    let distMin     = Infinity;
    let tagActif    = null;
    const passifs   = [];

    this.objetsInteractifs.forEach((objet) => {
      const tag = objet.tags.find((t) => INTERACTIONS[t]);
      if (!tag) return;

      const config = INTERACTIONS[tag];
      const distMax = config.passif
        ? CONFIG_JEU.DISTANCE_INTERACTION_PASSIVE
        : CONFIG_JEU.DISTANCE_INTERACTION;

      const dx = piedX - objet.sprite.x;
      const dy = piedY - objet.sprite.y;
      const d  = Math.sqrt(dx * dx + dy * dy);

      if (d > distMax) return;

      if (config.passif) {
        passifs.push({ objet, config });
      } else if (d < distMin) {
        distMin    = d;
        plusProche = objet;
        tagActif   = tag;
      }
    });

    this.objetActif = plusProche;
    this.tagActif   = tagActif;
    this.passifsActifs = passifs;

    const configActif = tagActif ? INTERACTIONS[tagActif] : null;
    this.interface.mettreAJourIndicateurs(plusProche, configActif, passifs, spriteJoueur);
  }

  // ─── Declenchement ─────────────────────────────────────────────────────────

  declencherAction() {
    if (!this.objetActif || !this.tagActif) return false;
    const config = INTERACTIONS[this.tagActif];
    if (config.passif) return false; // Pas de declenchement clavier sur passif

    const callback = this.objetActif.callbacks?.[this.tagActif];
    if (callback) {
      callback(this.objetActif);
      return true;
    }
    return false;
  }

  obtenirActif() {
    return this.objetActif;
  }

  obtenirTagActif() {
    return this.tagActif;
  }

  aTagPassifActif(tag) {
    return this.passifsActifs?.some(p => p.objet.tags.includes(tag)) ?? false;
  }
}
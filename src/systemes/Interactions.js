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
    const dist  = CONFIG_JEU.DISTANCE_INTERACTION;

    let plusProche  = null;
    let distMin     = Infinity;
    let tagRetenu   = null;

    this.objetsInteractifs.forEach((objet) => {
      const dx = piedX - objet.sprite.x;
      const dy = piedY - objet.sprite.y;
      const d  = Math.sqrt(dx * dx + dy * dy);

      const tag = objet.tags.find((t) => INTERACTIONS[t]);
      if (!tag) return;

      const estPassif = INTERACTIONS[tag].passif;
      const distMax   = estPassif
        ? CONFIG_JEU.DISTANCE_INTERACTION_PASSIVE
        : CONFIG_JEU.DISTANCE_INTERACTION;

      if (d < distMax && d < distMin) {
        distMin    = d;
        plusProche = objet;
        tagRetenu  = tag;
      }
    });

    this.objetActif = plusProche;
    this.tagActif   = tagRetenu;

    const config = tagRetenu ? INTERACTIONS[tagRetenu] : null;
    this.interface.afficherIndicateurInteraction(plusProche, config, spriteJoueur);
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
}
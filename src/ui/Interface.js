import { CONFIG_JEU } from "../config/Constantes.js";

export default class Interface {
  constructor() {
    this.indicateurInteraction  = null;
    this._construireHud();
    this._construireInventaire();
  }

  _construireHud() {
    this.hud = document.getElementById(CONFIG_JEU.ID_HUD);

    // Bouton inventaire mobile
    this.boutonInventaire = document.createElement("button");
    this.boutonInventaire.id = "bouton-inventaire";
    this.boutonInventaire.textContent = "I";
    document.body.appendChild(this.boutonInventaire);

    // Indicateur de ramassage
    this.indicateurInteraction  = document.createElement("div");
    this.indicateurInteraction .id = "indicateur-ramassage";
    this.indicateurInteraction .style.display = "none";
    document.body.appendChild(this.indicateurInteraction );
  }

  _construireInventaire() {
    const conteneur = document.getElementById(CONFIG_JEU.ID_INVENTAIRE);
    const grille = conteneur.querySelector(".grille");
    grille.innerHTML = "";

    for (let i = 0; i < CONFIG_JEU.NOMBRE_SLOTS; i++) {
      const slot = document.createElement("div");
      slot.classList.add("slot");
      slot.dataset.index = i;
      grille.appendChild(slot);
    }

    this.conteneurInventaire = conteneur;
  }

  mettreAJourVie(vie) {
    if (this.elementVie) {
      this.elementVie.textContent = `❤️ ${vie}`;
    }
  }

  surClicInventaire(callback) {
    this.boutonInventaire.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      callback();
    });
  }

  afficherInventaire(estOuvert) {
    this.conteneurInventaire.classList.toggle(
      CONFIG_JEU.CLASSE_ACTIF,
      estOuvert
    );
  }

  mettreAJourSlots(slots) {
    const elements = this.conteneurInventaire.querySelectorAll(".slot");
    slots.forEach((objet, i) => {
      const el = elements[i];
      el.innerHTML = "";

      if (objet) {
        const icone = document.createElement("img");
        icone.src = objet.icone;
        icone.classList.add("slot-icone");

        const nom = document.createElement("span");
        nom.classList.add("slot-nom");
        nom.textContent = objet.nom;

        const quantite = document.createElement("span");
        quantite.classList.add("slot-quantite");
        quantite.textContent = `${objet.quantite}`;

        el.appendChild(icone);
        el.appendChild(nom);
        el.appendChild(quantite);
      }
    });
  }

  afficherIndicateurInteraction(objet, config, spriteJoueur) {
    if (!objet || !config) {
      this.indicateurInteraction .style.display = "none";
      this.indicateurInteraction .dataset.tutoOuvert = "false";
      return;
    }
    
    const estTactile = !window.matchMedia("(hover: hover)").matches;
    const raccourci  = (!estTactile && !config.passif) ? " (F)" : "";
    const texte      = `${config.verbe}${raccourci}`;

    const cam = this._derniereCamera;
    if (cam) {
      const pos = cam.worldView;
      const x   = Math.round(objet.sprite.x - pos.x);
      // Utilise getBounds() pour avoir le vrai haut du sprite
      const bounds = objet.sprite.getBounds();
      const y   = Math.round(bounds.top - pos.y);
      this.indicateurInteraction .style.left = `${x}px`;
      this.indicateurInteraction .style.top  = `${y}px`;
    }

    this.indicateurInteraction .style.display = "block";
    this.indicateurInteraction .dataset.passif = config.passif ? "true" : "false";

    const tutoOuvert = this.indicateurInteraction .dataset.tutoOuvert === "true";
    if (config.passif && config.tuto) {
      this.indicateurInteraction .textContent = tutoOuvert ? config.tuto : texte;
      this.indicateurInteraction .onclick = () => {
        const ouvert = this.indicateurInteraction .dataset.tutoOuvert === "true";
        this.indicateurInteraction .dataset.tutoOuvert = ouvert ? "false" : "true";
        this.indicateurInteraction .dataset.passif = ouvert ? "true" : "false";
        this.afficherIndicateurInteraction(objet, config, null);
      };
    } else {
      this.indicateurInteraction .textContent = texte;
      this.indicateurInteraction .onclick = null;
    }
  }

  enregistrerCamera(camera) {
    this._derniereCamera = camera;
  }

}
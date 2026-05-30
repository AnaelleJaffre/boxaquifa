import { CONFIG_JEU } from "../config/Constantes.js";

export default class Interface {
  constructor() {
    this.indicateurRamassage = null;
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
    this.indicateurRamassage = document.createElement("div");
    this.indicateurRamassage.id = "indicateur-ramassage";
    this.indicateurRamassage.style.display = "none";
    document.body.appendChild(this.indicateurRamassage);
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

  afficherIndicateurRamassage(objet, camera) {

    if (!objet) {
      this.indicateurRamassage.style.display = "none";
      return
    }

    const estTactile = !window.matchMedia("(hover: hover)").matches;
    const texte = estTactile ? "Prendre" : "Prendre (F)";
    
    const pos = camera.worldView;
    const x = Math.round(objet.x - pos.x);
    const y = Math.round(objet.y - pos.y);

    this.indicateurRamassage.style.display = "block";
    this.indicateurRamassage.textContent = texte;

    this.indicateurRamassage.style.left = `${x}px`;
    this.indicateurRamassage.style.top = `${y}px`;

    const offsetY = 30;
    this.indicateurRamassage.style.top = `${y - offsetY}px`;

  }

}
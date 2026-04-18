import { CONFIG_JEU } from "../config/Constantes.js";

export default class Interface {
  constructor() {
    this._construireHud();
    this._construireInventaire();
  }

  _construireHud() {
    this.hud = document.getElementById(CONFIG_JEU.ID_HUD);
    this.elementVie = document.getElementById("hud-vie");
  }

  _construireInventaire() {
    const conteneur = document.getElementById(CONFIG_JEU.ID_INVENTAIRE);

    // Génération dynamique des slots
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

  afficherInventaire(estOuvert) {
    this.conteneurInventaire.classList.toggle(
      CONFIG_JEU.CLASSE_ACTIF,
      estOuvert
    );
  }

  mettreAJourSlots(slots) {
    const elements = this.conteneurInventaire.querySelectorAll(".slot");
    slots.forEach((objet, i) => {
      elements[i].textContent = objet ? objet.nom : "";
    });
  }
}
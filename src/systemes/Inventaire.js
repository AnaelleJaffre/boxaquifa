import { CONFIG_JEU } from "../config/Constantes.js";

export default class Inventaire {
  constructor() {
    this.slots = new Array(CONFIG_JEU.NOMBRE_SLOTS).fill(null);
    this.estOuvert = false;
  }

  basculer() {
    this.estOuvert = !this.estOuvert;
    return this.estOuvert;
  }

  ajouterObjet(objet) {
    const indexLibre = this.slots.findIndex((s) => s === null);
    if (indexLibre !== -1) {
      this.slots[indexLibre] = objet;
      return true;
    }
    return false; // Inventaire plein
  }

  obtenirSlots() {
    return this.slots;
  }
}
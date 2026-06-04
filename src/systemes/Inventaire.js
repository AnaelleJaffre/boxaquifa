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

    const index = this.slots.findIndex(
      s => s && s.cle === objet.cle
    )

    if (index !== -1) {
      this.slots[index].quantite += objet.quantite || 1
      return true
    }

    const libre = this.slots.findIndex(s => s === null)

    if (libre === -1) return false

    this.slots[libre] = {
      cle: objet.cle,
      nom: objet.nom,
      icone: objet.icone,
      quantite: objet.quantite || 1
    }

    return true
  }

  retirerSlot(index) {
    this.slots[index] = null;
  }

  obtenirSlots() {
    return this.slots;
  }
}
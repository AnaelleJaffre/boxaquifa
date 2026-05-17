import { CONFIG_JEU } from "../config/Constantes.js";

export default class Tactile {
  constructor(scene) {
    this.scene = scene;
    this.actif = false;

    this.depart = null;       // Position du doigt au toucher initial
    this.direction = {        // Direction normalisée courante
      x: 0,
      y: 0,
    };
  }

  creer() {
    const input = this.scene.input;

    input.on("pointerdown", (pointeur) => {
      if (this._surInterface(pointeur)) return;
      this.actif = true;
      this.positionPrecedente = { x: pointeur.x, y: pointeur.y };
    });

    input.on("pointermove", (pointeur) => {
      if (!this.actif || !this.positionPrecedente) return;
      if (!pointeur.isDown) return;

      const dx = pointeur.x - this.positionPrecedente.x;
      const dy = pointeur.y - this.positionPrecedente.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Micro-seuil — ignore les tremblements
      if (distance < CONFIG_JEU.TACTILE_SEUIL) return;

      // Change la direction selon le delta
      if (Math.abs(dx) > Math.abs(dy)) {
        this.direction = { x: dx > 0 ? 1 : -1, y: 0 };
      } else {
        this.direction = { x: 0, y: dy > 0 ? 1 : -1 };
      }

      // Met à jour la position de référence pour le prochain delta
      this.positionPrecedente = { x: pointeur.x, y: pointeur.y };
    });

    input.on("pointerup", () => {
      this.actif = false;
      this.positionPrecedente = null;
      this.direction = { x: 0, y: 0 };
    });
  }

  obtenirDirection() {
    // Garantit qu'une seule des deux composantes est non nulle
    if (Math.abs(this.direction.x) >= Math.abs(this.direction.y)) {
        return { x: this.direction.x, y: 0 };
    } else {
        return { x: 0, y: this.direction.y };
    }
    }

  estActif() {
    return this.actif;
  }

  _surInterface(pointeur) {
    const elements = ["hud", "inventaire"].map(id =>
      document.getElementById(id)
    );
    return elements.some(el => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return (
        pointeur.x >= rect.left &&
        pointeur.x <= rect.right &&
        pointeur.y >= rect.top &&
        pointeur.y <= rect.bottom
      );
    });
  }
}
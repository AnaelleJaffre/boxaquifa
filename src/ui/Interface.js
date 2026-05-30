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

    // Indicateur d'interaction
    this.indicateurInteraction = document.createElement("div");
    this.indicateurInteraction.classList.add("indicateur-interaction");
    this.indicateurInteraction.style.display = "none";
    document.body.appendChild(this.indicateurInteraction);

    this._indicateursPassifs = [];
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

  mettreAJourIndicateurs(objetActif, configActif, passifs, spriteJoueur) {
    
    // ─── Actif ────────────────────────────────────────────────────────────────
    this._afficherIndicateurActif(objetActif, configActif);

    // ─── Passifs ──────────────────────────────────────────────────────────────
    this._mettreAJourIndicateursPassifs(passifs);
  }

  _afficherIndicateurActif(objet, config) {
    if (!objet || !config) {
      this.indicateurInteraction.style.display = "none";
      this.indicateurInteraction.dataset.tutoOuvert = "false";
      return;
    }

    const estTactile = !window.matchMedia("(hover: hover)").matches;
    const raccourci  = (!estTactile && !config.passif) ? " (F)" : "";
    const texte      = `${config.verbe}${raccourci}`;

    this._positionnerIndicateur(this.indicateurInteraction, objet);
    this.indicateurInteraction.style.display = "block";
    this.indicateurInteraction.dataset.passif = "false";
    this.indicateurInteraction.textContent = texte;
    this.indicateurInteraction.onclick = null;
  }

  _mettreAJourIndicateursPassifs(passifs) {
    // Recycle ou crée les indicateurs passifs nécessaires
    passifs.forEach(({ objet, config }, i) => {
      if (!this._indicateursPassifs[i]) {
        const el = document.createElement("div");
        el.classList.add("indicateur-interaction");
        el.dataset.passif = "true";
        el.style.display = "none";
        document.body.appendChild(el);
        this._indicateursPassifs.push(el);
      }

      const el = this._indicateursPassifs[i];
      const texte = config.verbe;

      this._positionnerIndicateur(el, objet);
      el.style.display = "block";
      el.dataset.passif = "true";

      const tutoOuvert = el.dataset.tutoOuvert === "true";
      if (config.tuto) {
        el.textContent = tutoOuvert ? config.tuto : texte;
        el.onclick = () => {
          const ouvert = el.dataset.tutoOuvert === "true";
          el.dataset.tutoOuvert = ouvert ? "false" : "true";
          el.dataset.passif = ouvert ? "true" : "false";
          this._mettreAJourIndicateursPassifs(passifs);
        };
      } else {
        el.textContent = texte;
        el.onclick = null;
      }
    });

    // Cache les indicateurs en surplus
    for (let i = passifs.length; i < this._indicateursPassifs.length; i++) {
      this._indicateursPassifs[i].style.display = "none";
      this._indicateursPassifs[i].dataset.tutoOuvert = "false";
    }
  }

  _positionnerIndicateur(el, objet) {
    const cam = this._derniereCamera;
    if (!cam) return;
    const pos    = cam.worldView;
    const x      = Math.round(objet.sprite.x - pos.x);
    const bounds = objet.sprite.getBounds?.();
    const y      = bounds
      ? Math.round(bounds.top - pos.y)
      : Math.round(objet.sprite.y - pos.y);
    el.style.left = `${x}px`;
    el.style.top  = `${y}px`;
  }

  enregistrerCamera(camera) {
    this._derniereCamera = camera;
  }

}
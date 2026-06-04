import { CONFIG_JEU } from "../config/Constantes.js";

export default class Interface {
  constructor() {
    this.indicateurInteraction  = null;
    this._construireHud();
    this._construireInventaire();
  }

  _construireHud() {
    this.hud = document.getElementById(CONFIG_JEU.ID_HUD);
    document.addEventListener("dragover", (e) => e.preventDefault());

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

    // Drag pour jeter
    this._labelDrag = document.createElement("div");
    this._labelDrag.id = "label-drag";
    this._labelDrag.style.display = "none";
    document.body.appendChild(this._labelDrag);
  }

  _construireInventaire() {
    const conteneur = document.getElementById(CONFIG_JEU.ID_INVENTAIRE);
    const grille = conteneur.querySelector(".grille");
    grille.innerHTML = "";

    for (let i = 0; i < CONFIG_JEU.NOMBRE_SLOTS; i++) {
      const slot = document.createElement("div");
      slot.classList.add("slot");
      slot.dataset.index = i;
      slot.setAttribute("draggable", true);

      slot.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("slot-index", i);
        slot.classList.add("dragging");
        this._labelDrag.style.display = "block";
        document.body.dataset.dropValide = "false";
      });
      
      slot.addEventListener("dragend", () => {
        slot.classList.remove("dragging");
        this._labelDrag.style.display = "none";
        document.body.removeAttribute("data-drop-valide");
      });

      grille.appendChild(slot);
    }

    document.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (this._labelDrag) {
        this._labelDrag.style.left = `${e.clientX + 12}px`;
        this._labelDrag.style.top  = `${e.clientY + 12}px`;

        // Vérifier si la souris est réellement au-dessus d'une zoneDrop active
        const sousLaSouris = document.elementFromPoint(e.clientX, e.clientY);
        const dropValide = this._indicateursPassifs.some(el =>
          el._zoneDrop &&
          el._zoneDrop.style.pointerEvents !== "none" &&
          el._zoneDrop === sousLaSouris
        );

        document.body.dataset.dropValide = dropValide ? "true" : "false";
        this._labelDrag.textContent = dropValide ? "Jeter" : "Trop loin";
      }
    });

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

  surJeter(callback) {
    this._callbackJeter = callback;
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

      // Drop pour jeter
      if (objet.tags.includes("jeter") && !el._dropBranche) {
        const zoneDrop = document.createElement("div");
        zoneDrop.style.position = "fixed";
        zoneDrop.style.pointerEvents = "auto";
        document.body.appendChild(zoneDrop);
        el._zoneDrop = zoneDrop;

        zoneDrop.addEventListener("dragover", (e) => e.preventDefault());
        zoneDrop.addEventListener("drop", (e) => {
          const index = parseInt(e.dataTransfer.getData("slot-index"));
          if (!isNaN(index) && this._callbackJeter) {
            this._callbackJeter(index);
          }
          document.body.dataset.dropValide = "false";
          this._labelDrag.style.display = "none";
        });
        el._dropBranche = true;
      }

      // Mise à jour position/taille à chaque frame
      if (el._zoneDrop) {
        el._zoneDrop.style.pointerEvents = "auto";
        const cam = this._derniereCamera;
        const pos = cam.worldView;
        const bounds = objet.sprite.getBounds?.();
        el._zoneDrop.style.left   = `${Math.round(bounds.left  - pos.x)}px`;
        el._zoneDrop.style.top    = `${Math.round(bounds.top   - pos.y)}px`;
        el._zoneDrop.style.width  = `${Math.round(bounds.width)}px`;
        el._zoneDrop.style.height = `${Math.round(bounds.height)}px`;
      }
    });

    // Cache les indicateurs en surplus
    for (let i = passifs.length; i < this._indicateursPassifs.length; i++) {
      this._indicateursPassifs[i].style.display = "none";
      this._indicateursPassifs[i].dataset.tutoOuvert = "false";
      if (this._indicateursPassifs[i]._zoneDrop) {
        this._indicateursPassifs[i]._zoneDrop.style.pointerEvents = "none";
        document.body.dataset.dropValide = "false";
      }
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
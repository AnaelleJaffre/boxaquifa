import { ASSETS } from "../config/Assets.js";
import { CONFIG_JEU } from "../config/Constantes.js";

export default class Joueur {
  constructor(scene, x, y) {
    this.scene = scene;
    this.vie = CONFIG_JEU.VIE_MAX_JOUEUR;

    this.sprite = scene.physics.add.sprite(x, y, ASSETS.PERSONNAGES.MIRA.CLE);
    
    // Hitbox reduite aux pieds
    this.sprite.body.setSize(
      CONFIG_JEU.MIRA_HITBOX_LARGEUR,
      CONFIG_JEU.MIRA_HITBOX_HAUTEUR
    );
    this.sprite.body.setOffset(
      (this.sprite.width - CONFIG_JEU.MIRA_HITBOX_LARGEUR) / 2,
      this.sprite.height - CONFIG_JEU.MIRA_HITBOX_HAUTEUR
    );

    this.curseurs = scene.input.keyboard.createCursorKeys();
    this._creerAnimations();
  }

  _creerAnimations() {
    const anims = this.scene.anims;
    const cle = ASSETS.PERSONNAGES.MIRA.CLE;

    // Une frame par direction = pas d'animation, juste changement de frame
    // Si tu as plusieurs frames par direction plus tard, change "frames" en tableau
    anims.create({ key: "mira-bas",    frames: [{ key: cle, frame: CONFIG_JEU.MIRA_FRAMES.BAS }], frameRate: 1 });
    anims.create({ key: "mira-gauche", frames: [{ key: cle, frame: CONFIG_JEU.MIRA_FRAMES.GAUCHE }], frameRate: 1 });
    anims.create({ key: "mira-haut", frames: [{ key: cle, frame: CONFIG_JEU.MIRA_FRAMES.HAUT }], frameRate: 1 });
    anims.create({ key: "mira-droite",   frames: [{ key: cle, frame: CONFIG_JEU.MIRA_FRAMES.DROITE }], frameRate: 1 });
  }

  estEnMouvement() {
    const { left, right, up, down } = this.curseurs;
    return left?.isDown || right?.isDown || up?.isDown || down?.isDown;
  }

  mettreAJour(tactile = null) {
    const vitesse = CONFIG_JEU.VITESSE_JOUEUR;
    const { left, right, up, down } = this.curseurs;
    const corps = this.sprite.body;

    corps.setVelocity(0);

    if (left?.isDown && !up?.isDown && !down?.isDown) {
      corps.setVelocityX(-vitesse * 60);
      this.sprite.anims.play("mira-gauche", true);
    } else if (right?.isDown && !up?.isDown && !down?.isDown) {
      corps.setVelocityX(vitesse * 60);
      this.sprite.anims.play("mira-droite", true);
    } else if (up?.isDown) {
      corps.setVelocityY(-vitesse * 60);
      this.sprite.anims.play("mira-haut", true);
    } else if (down?.isDown) {
      corps.setVelocityY(vitesse * 60);
      this.sprite.anims.play("mira-bas", true);
    } else if (tactile?.estActif()) {
      const dir = tactile.obtenirDirection();

      if (dir.x !== 0 || dir.y !== 0) {
        corps.setVelocityX(dir.x * vitesse * 60);
        corps.setVelocityY(dir.y * vitesse * 60);

        if (Math.abs(dir.x) > Math.abs(dir.y)) {
          this.sprite.anims.play(dir.x > 0 ? "mira-droite" : "mira-gauche", true);
        } else {
          this.sprite.anims.play(dir.y > 0 ? "mira-bas" : "mira-haut", true);
        }
      } else {
        // Doigt posé mais pas de mouvement — arrêt
        corps.setVelocity(0);
        this.sprite.anims.stop();
      }
    }
  }

  estEnMouvement() {
    const { left, right, up, down } = this.curseurs;
    const corps = this.sprite.body;
    return (
      left?.isDown || right?.isDown ||
      up?.isDown   || down?.isDown  ||
      corps.velocity.x !== 0 || corps.velocity.y !== 0
    );
  }

  obtenirVie() {
    return this.vie;
  }
}
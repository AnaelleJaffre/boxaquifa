import { ASSETS } from "../config/Assets.js";
import { CONFIG_JEU } from "../config/Constantes.js";

export default class Son {
  constructor(scene) {
    this.scene = scene;
    this.theme = null;
    this.sonPas = null;
    this.joueLesPas = false;
  }

  creer() {
    this.theme = this.scene.sound.add(ASSETS.SONS.THEME_MORIDONA.CLE, {
      loop: true,
      volume: CONFIG_JEU.VOLUME_THEME,
    });

    this.sonPas = this.scene.sound.add(ASSETS.SONS.DEPLACEMENT.CLE, {
      loop: true,
      volume: CONFIG_JEU.VOLUME_PAS,
    });

    this.theme.play();
  }

  mettreAJourPas(joueurEnMouvement) {
    if (joueurEnMouvement && !this.joueLesPas) {
      this.sonPas.play();
      this.joueLesPas = true;
    } else if (!joueurEnMouvement && this.joueLesPas) {
      this.sonPas.stop();
      this.joueLesPas = false;
    }
  }

  changerTheme(cleTheme) {
    if (this.theme?.isPlaying) {
      this.theme.stop();
    }
    this.theme = this.scene.sound.add(cleTheme, {
      loop: true,
      volume: CONFIG_JEU.VOLUME_THEME,
    });
    this.theme.play();
  }
}
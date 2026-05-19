export const ASSETS = {
  CARTE: {
    CLE: "monde",
    CHEMIN: "assets/maps/maison_mira.json",
  },
  TILESETS: [
    { CLE: "fond",         CHEMIN: "assets/tilesets/moridona/fond.png" },
    { CLE: "sol_moridano", CHEMIN: "assets/tilesets/moridona/maison_mira.png" },
  ],
  OBJETS_TILESET: "moridano", // Tileset à images individuelles
  CALQUES: {
    FOND:         "Fond",
    SOL:          "Sol",
    OBJETS:       "GameObjects",
    BATIMENTS:    "GameObjects/Batiments",
    HERBES:       "GameObjects/Herbes",
    FLEURS:       "GameObjects/Fleurs",
    COQUILLAGES:  "GameObjects/Coquillages",
    FONCTIONNELS: "GameObjects/Fonctionnels",
    COLLISIONS:   "GameObjects/Collisions",
  },
  OBJETS: {
    POINT_DEPART: "Spone",
    PORTE_MAISON: "Porte_Maison_Mira",
    MAISON:       "Maison_Mira",
    POUBELLE:     "Poubelle",
  },
  OBJETS_MORIDANO: [
    "coquil_1", "coquil_2", "coquil_3", "coquil_4",
    "coquil_5", "coquil_6", "coquil_7",
    "drapeaux_1", "drapeaux_lanterne",
    "fleur_1", "fleur_2",
    "herbe_1", "herbe_2", "herbe_3", "herbe_4",
    "herbe_5", "herbe_6", "herbe_7",
    "lampadaire_1", "maison", "poubelle",
  ],
  OBJETS_RAMASSABLES: {

    "coquil_1": { cleStack: "coquillage_nacre",   nom: "Coquillage nacré",   icone: "assets/tilesets/moridona/objets/coquil_1.png", quantiteRamassee: 1 },
    "coquil_2": { cleStack: "coquillage_spiral",  nom: "Coquillage spiralé", icone: "assets/tilesets/moridona/objets/coquil_2.png", quantiteRamassee: 1 },
    "coquil_3": { cleStack: "coquillage_plat",    nom: "Coquillage plat",    icone: "assets/tilesets/moridona/objets/coquil_3.png", quantiteRamassee: 1 },
    "coquil_4": { cleStack: "coquillage_petit",   nom: "Petit coquillage",   icone: "assets/tilesets/moridona/objets/coquil_4.png", quantiteRamassee: 1 },
    "coquil_5": { cleStack: "coquillage_casse",   nom: "Coquillage cassé",    icone: "assets/tilesets/moridona/objets/coquil_5.png", quantiteRamassee: 1 },
    "coquil_6": { cleStack: "coquillage_plat  ",  nom: "Coquillage plat",    icone: "assets/tilesets/moridona/objets/coquil_6.png", quantiteRamassee: 1 },
    "coquil_7": { cleStack: "coquillage_moche",   nom: "Coquillage moche",   icone: "assets/tilesets/moridona/objets/coquil_7.png", quantiteRamassee: 1 },

    "fleur_1":  { cleStack: "fleur_dunes",        nom: "Fleur des dunes",    icone: "assets/tilesets/moridona/objets/fleur_1.png", quantiteRamassee: 1 },
    "fleur_2":  { cleStack: "fleur_dunes",        nom: "Fleur des dunes",    icone: "assets/tilesets/moridona/objets/fleur_1.png", quantiteRamassee: 2 }

  },
  PERSONNAGES: {
    MIRA: { CLE: "mira", CHEMIN: "assets/personnages/mira_spritesheet.png" },
  },
  SONS: {
    DEPLACEMENT: { CLE: "pas",   CHEMIN: "assets/sons/actions/marcher_1.mp3" },
    DEPLACEMENT_HERBE: { CLE: "pas_herbes",   CHEMIN: "assets/sons/actions/marcher_herbes_court.mp3" },
    THEME_MORIDONA: { CLE: "theme_moridona", CHEMIN: "assets/sons/themes/moridona-theme.mp3" },
  },
  FIRSTGID_MORIDANO_FALLBACK: 2369,
};
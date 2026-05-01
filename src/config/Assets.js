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
    COQUILLAGES:       "GameObjects/Coquillages",
    FONCTIONNELS: "GameObjects/Fonctionnels",
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
  PERSONNAGES: {
    MIRA: { CLE: "mira", CHEMIN: "assets/personnages/mira_spritesheet.png" },
  },
};
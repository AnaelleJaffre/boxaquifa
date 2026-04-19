# Boxaquifa
C'est un jeu vidéo parce que les switch case ça me manquait, mais version web parce que je suis mordue de CSS.

Le nom, c'est juste mon copain qui a dit un mot au hasard, donc c'est normal s'il est moche.

## Note à moi-même (pour continuer le dev)
La profondeur est cassée, en fait Phaser utiliser une tuile 32x32 donc ça se coupe à chaque fois selon cette taille et pas selon la taille de l'objet.

Il faut donc faire du depth sorting non pas par tuile mais par objet. Pour ça, **retourner dans Tiled** et placer les objets dans le claque GameObject (pas sûr de l'info) comme des objets Tileset (avec un gid ?) et non des tuiles peintes. Comme ça, chaque objet a une position xy, une taille propre et un nom. Phaser les charge ensuite avec getObjectLayer.

Potentiel problème : ça va être gavé long, de nommer toutes les herbes à la main. Solution non viable à long terme. ✨
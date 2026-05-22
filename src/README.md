# Trucs de devs

## Mise en place

1. Clonner ce repo

2. Sur Windows : installer Node JS LTS
3. Vérifier la version de `node` et de `npm`. Sur Windows, autoriser l'exécutions de scripts :
    ```
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```

4. Lancer l'installation de `npm`
    ```
    npm install
    ```
   
5. C'est bon pour la config !


## Lancement

- Pour lancer npm avec vite
    ```
    npm run dev
    ```

- Localhost
    ```
    http://localhost:5173/
    ```
    Apparemment on peut utiliser `--host` pour "expose".

- Quand le jeu marche
    ```
    npm run build
    ```
    Ça crée un dossier "dist" qui contient le jeu, plus qu'à le push sur GitHub Pages GG dans la matrice for sure.

- Pour déployer sur GitHub Pages
    ```
    npm run deploy
    ```

## Import d'une carte Tiled

### Tiled
1. Choisir Base64 lors de la création de la carte
2. Pour le fond, utiliser un multiple de 30 pixels, donc 1920x1080 ou 1920x1110 px
3. Utiliser des calques Objets pour le DepthSorting de Phaser (herbes, consommables, bâtiments...)
4. Exporter la carte `tmx` en format JSON

### JSON
1. Remplacer les "\\/" par "/"
2. Remplacer les ".." par "assets" (chemin relatif, dans le dossier *public*)
3. Éventuellement remplacer la taille des objets mal dimensionnés (1088 -> 1080)

## Ce qu'il se passe dans le code

### Fichiers de configuration

#### `Assets.js`
Référentiel technique des ressources Phaser : chemins de fichiers, clés de
chargement, ordre des GID du tileset (OBJETS_MORIDANO — ne pas réordonner),
noms des calques Tiled. Ne contient aucune logique de jeu.

#### `Definitions.js`
Source de vérité sur les comportements des objets du monde.
Chaque clé correspond à un nom d'objet issu de OBJETS_MORIDANO.
Les tags disponibles sont : `vegetation`, `ramassable` (à compléter au fil du dev).
Un objet non déclaré ici est chargé visuellement mais sans aucun comportement.

#### `Constantes.js`
Paramètres numériques et de configuration du jeu : vitesses, volumes, distances,
dimensions des hitbox, identifiants DOM. À modifier pour tuner le gameplay.
# Trucs de devs

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
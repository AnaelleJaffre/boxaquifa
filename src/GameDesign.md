# Game Design

Objectif de ce document : établir un gameplay.

## But du jeu
Le but du jeu est d'invoquer les trois Chevaux d'Hist, des créatures mystiques démoniaques qui vont permettre au personnage de détruire le monde.

Pour invoquer un Cheval d'Hist, il faut assembler les éléments primordiaux qui correspondent au Cheval en question. Pour ce faire, il est possible de créer des objets sur mesure, qui possèdent les propriétés demandées. Enfin, il est nécessaire d'avoir un niveau assez élevé en invocation, sinon le personnage meurt.

## Personnage initial
Le personnage qui souhaite détruire le monde peut être sélectionné parmi :
- **Mira |** Jeune fille passionnée de sciences qui habite au village Moridona. Elle souhaite détruire le monde juste pour voir ce que ça fait - pour le fun. De toute manière, si le monde disparait, personne ne sera là pour le savoir, n'est-ce pas ?

- **Eno |** Jeune fou de 20 ans, qui pense que sa tête est hantée par des fantômes réquisitionneurs. Il se dit que s'il détruit le monde, ça pourra détruire les fantômes. Il imagine que lui aussi sera détruit, mais il préfère ça que continuer à souffrir. Et il se fout totalement que d'autres personnes meurent par sa faute. De toute façon, tout le monde finit bien par mourir un jour, donc ça ne fera qu'avancer la date ; et puis, plus on est de fous, plus on rit !

- **Gherhbi nettoyeur de l'Avrestch Socierty |** Vieil homme, toujours en pleine forme. A découvert que le monde était maudit par un étrange phénomène, appelé *La Force Bizarre*. Il a prévu un plan de secours pour l'humanité, avec le Président de la République, donc la situation est sous contrôle. Par contre, il faut vraiment détruire le monde, sinon l'humanité va finir hantée par la Force Bizarre. Un peu comme Eno.

## Personnalisation
Au fil du jeu, le joueur peut personnaliser : 
- Son personnage, via des tenues obtenues après une quête
- Son lieu d'habitation, donc la place où il vit et l'intérieur

## Système

### Introduction
Le joueur commence par choisir son personnage, puis il est lâché dans l'endroit initial associé au personnage. 

### Sauvegarde
Le joueur peut se connecter avec un pseudo et une clé. Ses informations sont sauvegardées, dans un JSON **public** sur le github. Je n'ai actuellement aucune compétence en cybersécurité, et de toute manière personne ne jouera à ce truc.

### Multijoueur
Il n'y a pas de mode multijoueur, c'est un jeu solo. Effectivement, puisqu'il n'y a que 3 personnages à jouer, cela signifierait que trois joueurs peuvent être Mira et être pareils. Cela me déplaît. Donc pas de multi.

### Carte
À tout instant, le joueur peut accéder à la carte du monde, en appuyant sur C.

### Inventaire
Pareil que pour la carte. Raccourcis : I.
Peut contenir un certain nombre de choses. Peut être agrandi grâce à certains artefacts, comme une poche magique, un sac à dos invisible ou un sort de portée, qui permet au joueur de faire léviter les objets grâce à sa magie.

### Livre des recettes
Le joueur possède un grand livre de recettes, qui contient tout ce qu'il faut savoir pour fusionner ou fissionner des entités. Chaque entité pouvant être créée est organisée selon sa catégorie : 
1. Descendant d'**Elter**, le 1er Cheval d'Hist, à l'origine de la région de l'Elter.
2. Descendant d'**Amari**, le 2e Cheval d'Hist, à l'origine de la région d'Amari.
3. Descendant de **KLR V32**, le 3e Cheval d'Hist, à l'origine de la région de KLR.
4. Associé à la région de Fifth.
5. Utilitaire.

Le livre de recettes est légal, et ne contient donc aucune information pour invoquer les Chevaux d'Hist. Pour ce faire, le joueur doit donc impérativement trouver le ***Grand Livre de l'Interdit et de l'Ipséité, version imprimée 2004***. Il ne peut l'obtenir qu'en discutant avec certains PNJ, ou en le trouvant par hasard dans un lieu spécial.

### Capacités
Le joueur possède une liste de capacités. Au début du jeu, elles sont toutes à 0, sauf l'invocation qui est à 1.
- **Invocation** | Permet de pratiquer la magie, à l'aide de rituels d'invocations.
- **Bidouillage** | Permet de faire de la fusion, de la fission et de construire des objets plus ou moins complexes.
- **Danse** | Permet de danser plus ou moins bien. La danse peut faire gagner des choses particulières dans certains contextes.
- **Nerd** | Permet de geeker et de profiter de sa vie avant la fin du monde. Permet aussi de pirater certains services.
- **Condition physique** | Permet de survivre à des environnements plus ou moins hostiles, et de tenir plus longtemps lors d'un effort (le combat, la danse ou la course).
- **Mixologie** | Permet de faire des cocktails alcoolisés. Utile pour sociabiliser lors des soirées. Peut aider pour certaines recettes.
- **Complotisme** | Permet de comprendre les ouvrages complotistes.
- **Jardinage** | Permet de faire pousser des plantes et des créatures.

Parler à un PNJ qui a une capacité élevée dans un domaine similaire aux capacités élevées du joueur lui permettra de s'y lier d'amitié plus facilement.

### Passions
Le joueur peut sélectionner trois passions, qui le définissent. Selon ses passions, il aura plus de facilités dans certains domaines.
- Faire du ski
- Boire de l'eau
- Dessiner
- Chanter
- Voltiger
- Boire de la Monster
- Distiller du raisin
- Rencontrer des inconnus
- Lire des manuels d'utilisation très techniques
- Faire des combats de robots
- Sauter à pieds joints (aucun bonus)
- Se poser des questions sur la vie
- Faire des mots-fléchés (aucun bonus)
- Pratiquer le krav-maga
- Regarder les étoiles
- Jouer à Death Stranding 2
- Étudier le droit
- Acheter des trucs inutiles au marché
- Coudre

## Entités du jeu

Boxaquifa contient un grand nombre d'entités, plus ou moins puissantes. La plupart des créatures, plantes et des objets utilisables possèdent un certain nombre de caractéristiques. Il est souvent possible de les associer lors d'une fusion nucléaire, ou de les dissocier par fission.

### PNJ
Certains Personnages Non-Joueurs (PNJ) sont des IA qui jouent un rôle, d'autres suivent des lois algorithmiques définies dans le code source.

Certains PNJ peuvent donner des objets ou informations essentiels à l'invocation des Chevaux d'Hist.

Il est possible d'obtenir des points d'amitié avec certains PNJ, pour avoir plus de chance d'obtenir des informations confidentielles.

#### Créatures
On trouve de nombreuses créatures en liberté, dans le monde. Il est parfois possible de les capturer. Il est aussi possible de les tuer, ce qui peut donner des matériaux spéciaux.

Les créatures capturées peuvent être mises en exposition, domptées avec le temps, ou bien utilisées pour produire certains phénomènes. Par exemple, les Britoupaps sont des papillons dont le battement d'aile produit de la lumière. On peut les mettre dans une lanterne, pour voyager la nuit et y voir quelque chose.

#### Familiers
Les familiers sont des créatures qui sont attachées au joueur. Il est possible de dompter une créature pour en faire un familier, mais c'est assez rare. La manière la plus efficace d'obtenir un familier est de faire pousser la graine qui lui correspond dans un pot à plante, et de l'arroser avec le bon produit.

Les familiers peuvent, une fois par jour, nous offrir un objet spécial, s'ils sont heureux. Ces objets sont très utiles pour procéder aux invocations des Chevaux d'Hist, car ils possèdent des caractéristiques souvent puissantes, surtout lorsque le familier est rare et à un haut niveau.

### Lieux de vie

#### Centre Administratif

Tous les mois, s'il est actif, le joueur doit se rendre au Centre Administratif. Il doit y déclarer le **nombre total de créatures qu'il possède** (vivantes ou non).

Chaque habitant de Boxaquifa a le droit d'élever un maximum de 10 créatures. Cette loi a été votée en 1581 par les services administratifs, afin d'éviter la destruction du monde.

Le joueur peut mentir lors de sa déclaration, mais si sa maison se fait inspecter, il sera enfermé dans les prisons administratives.

Le joueur peut aussi prêter des créatures à ses amis. Cela peut être d'autres joueurs, ou des PNJ.

#### Pharmacie
Le joueur peut s'y rendre s'il a besoin de produits chimiques ou de se faire vacciner contre un litige (par exemple pour être invisible aux yeux de l'administration).

#### Hôpital
Permet de soigner le joueur s'il est dans un état critique. C'est l'endroit de respone. Il existe un hôpital par région.

#### Autel Maléfique Ultra Flippant
Lieu d'invocation des Chevaux d'Hist.

#### Fontaine de la Sororité
Une jolie fontaine avec une histoire qui n'est pas partagée dans la société, donc je ne l'écris pas ici. Son eau possède des propriétés spéciales.

#### Marché
Lieu de vie, où le joueur peut acheter des ingrédients pour faire des recettes, ou encore certains objets utilisables.

## Actions du jeu

### Accomplir l'objectif
Afin d'accomplir l'objectif de détruire le monde, le joueur possède différents moyens.
1. Rencontrer **Henri**, qui put demander au programmeur du jeu de détruire le monde.
2. Rencontrer **Malto**, et lui demander de pratiquer le rituel de la Danse des Ombres. Attention, Malto est un être furtif et très jmenfoutiste. Il a autre chose à faire que d'écouter le joueur.
3. Invoquer les trois **Chevaux d'Hist** (qui ne sont pas des chevaux mais des créatures mystiques).
4. Passer l'**aspirateur** depuis la machine de résonnance dans le labo de Malto, après avoir appuyé sur le bouton rouge.

### Expériences
Le joueur possède un **laboratoire** dans sa demeure, dans lequel il peut faire du bricolage, de la fusion et de la fission. Il peut aussi accéder à sa **serre**, dans laquelle il cultive son jardin botanique. C'est là que ses plantes et ses créatures poussent.

### Actions inutiles
Dans le jeu, il existe certaines actions considérées comme inutiles par le créateur du jeu.
- Boire de l'eau à l'aide de couteaux. En réalité, dans Boxaquifa, personne ne boit de l'eau avec un verre, tout le monde utilise des couteaux.
- Faire du ski sur des crayons. Possible dans la région de Frost, après avoir fabriqué des skis crayons.

### Déplacements
Pour se déplacer dans le monde, le joueur a plusieurs choix : 
- **Marcher**. La vitesse de marche peut être augmentée en mangeant un Champi Super Stylé.
- Utiliser un artefact de **déplacement rapide** : 
    - Trotinette vintage à moitié défoncée.
    - Jetpack Trop Méga Cool.
    - Planneur. Possibilité de modifier le profil aérodynamique de l'aile, ce qui modifie l'efficacité du vol. Il faut courir vite pour s'envoler.
    - Magie singulière.
- Voyager par le biais d'un **téléporteur**. Le joueur en possède un chez lui. Il existe au moins un téléporteur par pays.

#### Objets utilisables
Certains objets peuvent être équipés par le joueur pour effectuer des actions particulières.
- **Tarte** | Peut être lancée sur un individu ou une créature pour l'aveugler pendant une courte durée.
- **Arme** | Permet de diminuer les points de vie d'un autre individu ou créature.
- **Couteau** | N'est pas une arme. Permet seulement de boire de l'eau.
- **Microphone** | Permet de gueuler quelque chose dans le jeu. Provoque des réactions.
- **Parfum** | Permet de sentir bon. Provoque des réactions.
- **Glace à la menthe** | Peut être offerte à un PNJ.
- **Ordinateur avec Minecraft dessus** | Permet de faire du gaming. Eno peut parfois le faire sans que le joueur ne puisse plus contrôler son corps. Il a des phases comme ça.
- **Livre *"Le C# pour les nuls"*** | Peut être lancé sur des PNJ. Ne fait pas grand chose.

### Mariage
Le joueur peut se marier avec un PNJ. Les deux personnages sont alors liés par un pacte :
- Si l'un des deux meurt, l'autre aussi.
- Ils partagent désormais leur richesse. Attention : certains PNJ sont dépensiers.

### Danse
Le joueur peut pratiquer certaines danses, après les avoir apprises.
- Danse de l'eau | Permet d'invoquer la pluie. Nécessite d'avoir certains objets sur soi.
- Danse de la joie | Permet de faire fuir les gens, si c'est Eno ou Gherbi qui danse. Dans le cas de Mira, permet d'obtenir des points d'amitié avec d'autres PNJ. 
- Danse du voyage | Permet de se téléporter au point de téléportation le plus proche. peut être pratiqué après avoir atteint un certain niveau en danse et en invocation.
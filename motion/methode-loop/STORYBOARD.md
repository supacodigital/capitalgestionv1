---
format: 840x1120
duration: 12s
message: "Le patrimoine se construit avec méthode et dans la durée"
arc: Tenue → le rouge se retire → le relais → le noir se renoue → tenue (boucle)
audience: particuliers et frontaliers du bassin franco-genevois sur le site S Capital Gestion
mode: collaborative
---

# Boucle Méthode (v2)

## Changes from v1

- « supprime larriere. plan juste un fond blanc » : fond blanc uni #FFFFFF ; dégradé, halo bordeaux et filets à 118° retirés. Triangles conservés.

## Locked

- Planche v2 validée : fond blanc uni, S en pleine couleur (#8C1622 / #1A1A1A) à 356, 52, triangles de la carte de visite en haut à gauche et en bas à droite, horaires des coupures rouge 1,0 à 6,2 s et noir 5,0 à 10,6 s.

## Décisions

- **Message** : le patrimoine se construit avec méthode et dans la durée.
- **Format** : 840 × 1120 (3:4), 30 i/s, 12 s, muet, MP4 H.264 < 2 Mo. Aucun texte dans la vidéo.
- **Fil conducteur** : le monogramme S. Une coupure parcourt chaque ruban dans le sens de l'écriture du S (rouge d'abord, noir ensuite) : le ruban se retire devant elle et se redessine derrière. Les rubans se relaient : le rouge de 1,0 à 6,2 s, le noir de 5,0 à 10,6 s. La coupure couvre 40 % d'un ruban au plus, donc le S reste lisible et la bande mobile n'est jamais vide.
- **Marque** (src/index.css) : bordeaux #8C1622 (ruban), #7A1420 (triangles), anthracite #1A1A1A, fond blanc uni #FFFFFF.
- **Motifs** : triangles à 45° de la carte de visite (recto), en haut à gauche et en bas à droite, rouge devant, coin noir derrière.
- **Mouvement** : tout est périodique sur 12 s pour une boucle sans raccord : les triangles glissent le long de leur diagonale (aller-retour, sine.inOut). Coupures des rubans en sine.inOut.
- **Image tenue** : 0 à 1,0 s et 10,6 à 12 s, S complet. L'image 0 sert d'image fixe en mode « animations réduites ».
- **Placement** : S à 356, 52, échelle 0,889 (528 × 800), qui déborde de 44 px à droite ; triangles hors de la bande mobile.
- **Zones protégées** : bas de l'image (y > 616) assombri par le site, citation vers y 870 à 1015 ; sur mobile, seule la bande y 385 à 735 est visible.
- **Interdits** : pas de rebond, pas de lueur, pas de grain lourd, pas de texte. Pas d'effet diaporama (tout se passe dans un seul plan) ni d'économiseur d'écran (chaque mouvement sert le S ou la carte de visite).

## Frame 1 — Tenue

- scene: S complet sur fond blanc, triangles au repos
- duration: 1s
- poster: 0
- transition_in: cut
- status: animated
- src: index.html
- voiceover: onscreen

L'état de départ et d'arrivée de la boucle, et l'image fixe en mode « animations réduites ». Le logo est lisible d'emblée. Sketch : storyboard.html#frame-01.

## Frame 2 — Le rouge se retire

- scene: la coupure naît à la pointe haute du ruban rouge et parcourt l'arc supérieur
- duration: 3s
- poster: 2.8
- transition_in: continuous
- status: animated
- src: index.html
- voiceover: onscreen

Premier mouvement du S. Le ruban noir reste entier ; les triangles reculent vers leurs coins. Coupure franche, perpendiculaire au ruban, sans fondu. Sketch : storyboard.html#frame-02.

## Frame 3 — Le relais

- scene: le rouge se redessine et se referme, la coupure passe au ruban noir depuis sa pointe gauche
- duration: 3s
- poster: 5.4
- transition_in: continuous
- status: animated
- src: index.html
- voiceover: onscreen

Passage de témoin entre les deux rubans, dans le sens de l'écriture du S. Un ruban est toujours presque complet. Sketch : storyboard.html#frame-03.

## Frame 4 — Le noir se renoue

- scene: la coupure traverse la diagonale noire puis l'arc bas, le ruban se referme à 10,6 s et le S tient
- duration: 5s
- poster: 8.6
- transition_in: continuous
- status: animated
- src: index.html
- voiceover: onscreen

Retour à la tenue ; les triangles regagnent leur place à 12 s et la dernière image enchaîne sur la première. Sketch : storyboard.html#frame-04.

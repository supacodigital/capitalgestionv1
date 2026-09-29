# Vidéo de la section Méthode

`methode.mp4` est une boucle de 12 s en motion design (monogramme S et
triangles de la carte de visite sur fond blanc), importée par
`src/components/Method/Method.tsx`. `methode-poster.webp` est sa première
image, utilisée comme affiche.

La source est le projet HyperFrames `motion/methode-loop/` (brief,
storyboard, composition `index.html`). Pour régénérer après une retouche :

```sh
cd motion/methode-loop
npx hyperframes check
npx hyperframes render --quality delivery --fps 30 --output renders/methode-master.mp4
cp renders/methode-master.mp4 ../../src/assets/video/methode.mp4
```

Puis réextraire l'affiche depuis la première image du MP4.

## Contraintes du fichier

- **Format** : MP4 (H.264, `yuv420p`), lu partout. Un `.webm` en
  complément réduirait le poids, mais impose une balise `<source>` double.
- **Cadrage** : vertical ou carré. La colonne fait environ 420 × 560 px sur
  desktop et la vidéo est recadrée en `object-fit: cover` : prévoir que les
  bords puissent être rognés.
- **Durée** : 8 à 15 s, avec une boucle qui se referme proprement (la
  dernière image doit enchaîner sur la première sans à-coup).
- **Poids** : viser moins de 2 Mo. La vidéo se charge sur la page d'accueil.
- **Son** : inutile, la lecture est muette (`muted` est requis pour que
  l'autoplay soit autorisé par les navigateurs).

Le bas de l'image est assombri par un dégradé pour que la citation reste
lisible : éviter d'y placer un élément important.

Si `METHOD_VIDEO` repasse à `null`, la colonne retrouve son motif graphique
(monogramme sur dégradé).

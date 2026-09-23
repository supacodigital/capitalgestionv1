# Vidéo de la section Méthode

Déposer ici le fichier `methode.mp4`, puis dans
`src/components/Method/Method.tsx` décommenter l'import et remplacer
l'affectation :

```ts
import methodVideo from "../../assets/video/methode.mp4";
const METHOD_VIDEO: string | null = methodVideo;
```

## Contraintes du fichier

- **Format** : MP4 (H.264, `yuv420p`) — lu partout. Un `.webm` en
  complément réduirait le poids, mais impose une balise `<source>` double.
- **Cadrage** : vertical ou carré. La colonne fait environ 420 × 560 px sur
  desktop et la vidéo est recadrée en `object-fit: cover` — prévoir que les
  bords puissent être rognés.
- **Durée** : 8 à 15 s, avec une boucle qui se referme proprement (la
  dernière image doit enchaîner sur la première sans à-coup).
- **Poids** : viser moins de 2 Mo. La vidéo se charge sur la page d'accueil.
- **Son** : inutile, la lecture est muette (`muted` est requis pour que
  l'autoplay soit autorisé par les navigateurs).

Le bas de l'image est assombri par un dégradé pour que la citation reste
lisible : éviter d'y placer un élément important.

Sans fichier, la colonne conserve son motif graphique (monogramme sur
dégradé) — le site reste donc valide en l'état.

---
workflow: general-video
flow: automation
storyboard: yes
message: "Le patrimoine se construit avec méthode et dans la durée"
destination: website
aspect: 840x1120
language: fr
audience: particuliers et frontaliers du bassin franco-genevois visitant le site S Capital Gestion
length: 12s
angle: boucle d'ambiance de marque
---

## Intent

Boucle d'ambiance muette pour la colonne visuelle de la section Méthode du site
S Capital Gestion (src/components/Method/Method.tsx). Elle remplace le motif fixe
(monogramme sur dégradé) et accompagne la citation HTML « Une méthode, quatre
temps, et le temps qu'il faut. » Ton premium, sobre, rassurant : le temps long,
la maîtrise, pas l'univers fintech.

## Assets

- ../../src/assets/logo-monogram-lg.webp — monogramme S (raster uniquement, pas de source vectorielle fournie) ; à redessiner en SVG pour le tracé en ruban.
- ../../src/index.css — tokens de marque (couleurs, easings) : source de vérité du design.
- ../../CLAUDE.md — identité visuelle (logo, triangles diagonaux, bandeau, ton).

## Customizations

- Lien privé vers la vidéo finie (hyperframes publish) pour validation par Béatrice avant mise en ligne.
- Intégration au site après accord : methode.mp4 dans src/assets/video/, activation dans Method.tsx.

## Notes

- MP4 H.264 yuv420p, muet, moins de 2 Mo, 30 i/s, boucle parfaite (dernière image = première).
- Première image soignée : elle sert d'image fixe quand prefers-reduced-motion est actif (la vidéo est mise en pause sur l'image 0).
- Aucun texte dans la vidéo : la citation reste en HTML par-dessus.
- Bas de l'image (45 %) assombri par un dégradé CSS et porteur de la citation : rien d'important n'y va.
- Sous 900 px, la colonne devient une bande horizontale d'environ 200 px (object-fit: cover) : seule la bande centrale reste visible, le mouvement doit occuper tout le cadre.
- Couleurs du site, pas le rouge vif du fichier logo : bordeaux #7A1420 / #8C1622, anthracite #1A1A1A.
- Fond blanc uni #FFFFFF, sans dégradé ni texture (demande de l'utilisateur au storyboard v1).
- À éviter : personnages, icônes qui rebondissent, dégradés flashy, grain lourd (poids du fichier).
- Pas de tiret cadratin ni demi-cadratin dans les textes (préférence de l'utilisateur).

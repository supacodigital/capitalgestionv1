# CLAUDE.md — Site vitrine S Capital Gestion

## Contexte projet

Site vitrine pour une conseillère indépendante en gestion de patrimoine, à destination d'une clientèle de particuliers et de frontaliers dans le bassin franco-genevois (Pays de Gex / Lyon / Genève).

Ce projet est distinct du site "wealth-advisor-website" (client affilié Inovea, inspiration J.P. Morgan / Nalo / Goodvest, cible grand public primo-investisseurs). Ici, le positionnement est plus classique et haut de gamme : conseil personnalisé, patrimoine, confiance, discrétion — pas un univers fintech/startup.

## Client

- **Société** : S Capital Gestion — gestion de patrimoine
- **Contact** : Béatrice Sem, Conseillère en gestion de patrimoine
- **Téléphone** : 06 95 63 60 96
- **Email** : contact@sbc.capitalgestion.com
- **Site actuel** : sbc-capitalgestion.com
- **Zones d'intervention** : Pays de Gex, Lyon, Genève
- **Domaines de service (à structurer en sections/piliers du site)** :
  - Investissement
  - Retraite
  - Prévoyance
  - Fiscalité

## Identité visuelle (d'après logo, carte de visite recto/verso)

### Logo
- Monogramme "S" stylisé en forme de flamme/ruban, bicolore : partie haute rouge bordeaux, partie basse noire, tracé fluide asymétrique (pas un S géométrique classique).
- Typographie du nom : "CAPITAL" en serif élégant, majuscules espacées (letter-spacing large), noir.
- "GESTION" en dessous, plus petit, serif, majuscules espacées, en rouge bordeaux.
- Le logo doit pouvoir être utilisé seul (favicon, filigrane) et accompagné du texte (header, footer).
- Utiliser le monogramme "S" en filigrane semi-transparent (gris très clair) comme élément de fond décoratif sur certaines sections, comme sur la carte de visite verso.

### Couleurs
- **Rouge bordeaux principal** : proche de `#7A1420` / `#8C1622` (à affiner avec le fichier logo source si disponible) — couleur d'accent, CTA, bandeaux, mots-clés services.
- **Noir / anthracite** : `#1A1A1A` — typographie principale, éléments graphiques (triangles de la carte de visite).
- **Blanc** : fond principal, respiration, sobriété.
- Éviter les couleurs vives additionnelles : la palette reste volontairement restreinte (rouge / noir / blanc), avec un gris clair possible pour les fonds de section alternés.

### Typographie
- Titres et logo : serif élégant (type Playfair Display, Cormorant, ou équivalent premium) — évoque le classique et le haut de gamme.
- Texte courant : sans-serif sobre et lisible (type Inter, Source Sans) pour ne pas surcharger visuellement.
- Emploi généreux du letter-spacing sur les titres en majuscules, à l'image du logo.

### Éléments graphiques distinctifs
- Formes triangulaires en diagonale (rouge / noir) comme motif de fond, visibles sur la carte de visite recto — peuvent inspirer un motif de header/footer ou de séparateurs de section.
- Bandeau rouge à bord arrondi (forme de "vague" en bas de carte) contenant les mots-clés services en majuscules blanches espacées — pattern réutilisable pour une bannière CTA ou un footer.

### Ton
- Premium, sobre, rassurant. Éviter l'univers "startup fintech" (pas de gradients flashy, pas de illustrations cartoon). Privilégier photographie soignée / textures discrètes / espace blanc généreux.

## Stack technique

- **Frontend** : React + Vite, CSS Modules (pas de Tailwind, pas de style inline)
- **TypeScript** : à évaluer selon préférence du moment ; par défaut adopté sur les nouveaux projets
- **Animations** :
  - GSAP + `@gsap/react` (`useGSAP()`) pour scroll/parallax/ScrollTrigger
  - Framer Motion (`motion.*`) pour les transitions de composants (mount/unmount)
  - Lottie via `lottie-react` si besoin d'icônes/illustrations animées légères
- **Icônes** : Lucide React et/ou Phosphor Icons
- **Backend** : non nécessaire a priori pour un site vitrine (formulaire de contact via service tiers ou petit backend Express ESM si besoin de traitement serveur)
- **Déploiement** : VPS Hostinger (Ubuntu), PM2 + Nginx + Certbot

## Conventions de code

- Commentaires en français, identifiants (variables, fonctions, composants) en anglais
- Composants React fonctionnels uniquement
- Un seul fichier CLAUDE.md pour piloter Claude Code (pas de système multi-fichiers)
- Pas de Tailwind, pas de styles inline — CSS Modules uniquement

## Structure du site (proposition de base — à valider)

1. **Header** — logo + navigation (Accueil, Services, À propos, Contact) + CTA "Prendre rendez-vous"
2. **Hero** — accroche sur la confiance/l'expertise patrimoniale, zone géographique (Pays de Gex / Lyon / Genève), CTA principal
3. **Piliers de service** — 4 blocs : Investissement / Retraite / Prévoyance / Fiscalité, avec description courte de chacun
4. **À propos de Béatrice Sem** — présentation, approche, valeurs (confiance, discrétion, sur-mesure)
5. **Pourquoi un conseiller indépendant** — argumentaire différenciant vs banque traditionnelle
6. **Témoignages / réassurance** (si contenu disponible)
7. **Bandeau CTA** (reprenant le style bandeau rouge de la carte de visite) avec coordonnées de contact
8. **Footer** — logo, coordonnées, mentions légales, liens

## Notes

- Vérifier la disponibilité des fichiers sources du logo (SVG/AI) auprès du client pour les couleurs exactes et une intégration propre en haute résolution.
- Prévoir une version mobile soignée : la clientèle patrimoniale consulte aussi bien sur desktop (dossiers, simulations) que mobile (premier contact).

# En-têtes de sécurité — sbc-capitalgestion.com

Deux en-têtes manquent sur le VPS (145.223.34.3) : `Referrer-Policy` et
`Strict-Transport-Security`. Ils relèvent de la sécurité « adaptée au risque »
attendue par l'article 32 du RGPD sur un site qui collecte des données
patrimoniales.

Je n'ai pas pu les appliquer : l'écriture sur le serveur distant est bloquée
dans ma session. Les commandes ci-dessous sont à exécuter manuellement.

## Sauvegarde déjà en place

`/root/nginx-sbc-backup-20260922-000211.conf`

## Modification

Dans `/etc/nginx/sites-available/sbc-capitalgestion.com`, ajouter les deux
lignes après `add_header X-XSS-Protection` (ligne 17) :

```nginx
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

En une commande :

```bash
ssh root@145.223.34.3 "sed -i '/X-XSS-Protection/a\\    add_header Referrer-Policy \"strict-origin-when-cross-origin\" always;\\n    add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;' /etc/nginx/sites-available/sbc-capitalgestion.com && nginx -t && systemctl reload nginx"
```

`nginx -t` valide la syntaxe **avant** le rechargement : si la config est
invalide, le `&&` empêche le reload et le site continue de tourner.

## Vérification

```bash
curl -sI https://sbc-capitalgestion.com | grep -iE "referrer-policy|strict-transport"
```

Attendu :

```
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## À savoir sur HSTS

`Strict-Transport-Security` est un engagement difficilement réversible : le
navigateur mémorise l'instruction pendant toute la durée du `max-age` (ici un
an) et refusera toute connexion HTTP au domaine pendant ce temps.

C'est sans risque ici — le HTTPS fonctionne et Certbot renouvelle le certificat
automatiquement — mais deux précautions ont été prises :

- **pas de `preload`** : cette directive inscrit le domaine dans une liste
  intégrée aux navigateurs, dont la sortie prend des mois. Inutile ici.
- **`max-age` d'un an**, valeur standard. Pour un test prudent, commencer à
  `max-age=300` (5 minutes), vérifier, puis passer à un an.

## Rollback

```bash
ssh root@145.223.34.3 "cp /root/nginx-sbc-backup-20260922-000211.conf /etc/nginx/sites-available/sbc-capitalgestion.com && nginx -t && systemctl reload nginx"
```

Note : un rollback retire l'en-tête, mais les navigateurs ayant déjà reçu le
HSTS continueront de forcer le HTTPS jusqu'à expiration.

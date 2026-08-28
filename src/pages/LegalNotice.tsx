import { useEffect } from "react";
import styles from "./LegalNotice.module.css";

const EDITOR_EMAIL = "contact@sbc-capitalgestion.com";
const EDITOR_PHONE = "07 43 66 91 93";

export default function LegalNotice() {
  useEffect(() => {
    const DEFAULT_TITLE =
      "Capital Gestion — Conseil en gestion de patrimoine indépendant | Pays de Gex, Lyon, Genève";
    document.title = "Mentions légales — Capital Gestion";

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousHref = canonical?.href;
    if (canonical) canonical.href = "https://sbc-capitalgestion.com/mentions-legales";

    return () => {
      document.title = DEFAULT_TITLE;
      if (canonical && previousHref) canonical.href = previousHref;
    };
  }, []);

  return (
    <section className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowLine} aria-hidden="true" />
          Informations légales
        </p>
        <h1 className={styles.title}>Mentions légales</h1>
        <p className={styles.updated}>Dernière mise à jour : [À COMPLÉTER]</p>

        <div className={styles.content}>
          <section className={styles.block}>
            <h2>1. Éditeur du site</h2>
            <p>
              Le présent site est édité par <strong>S Capital Gestion</strong>.
            </p>
            <ul>
              <li>Forme juridique : [À COMPLÉTER]</li>
              <li>Capital social : [À COMPLÉTER]</li>
              <li>Siège social : [À COMPLÉTER]</li>
              <li>SIREN / SIRET : [À COMPLÉTER]</li>
              <li>RCS / RM : [À COMPLÉTER]</li>
              <li>N° TVA intracommunautaire : [À COMPLÉTER]</li>
              <li>
                Contact :{" "}
                <a href={`mailto:${EDITOR_EMAIL}`}>{EDITOR_EMAIL}</a> — {EDITOR_PHONE}
              </li>
              <li>Directeur de la publication : [À COMPLÉTER]</li>
            </ul>
          </section>

          <section className={styles.block}>
            <h2>2. Activité réglementée</h2>
            <ul>
              <li>
                Conseiller en Investissements Financiers (CIF) enregistré auprès de l'ORIAS sous le
                n° [À COMPLÉTER], adhérent de l'association [À COMPLÉTER] agréée par l'Autorité des
                Marchés Financiers (AMF).
              </li>
              <li>
                Courtier en assurance et/ou intermédiaire en opérations de banque, enregistré à
                l'ORIAS sous le n° [À COMPLÉTER] — registre consultable sur{" "}
                <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer">
                  orias.fr
                </a>
                .
              </li>
              <li>Carte professionnelle Transaction / Gestion immobilière (le cas échéant) : [À COMPLÉTER]</li>
              <li>
                Autorité de contrôle : Autorité de Contrôle Prudentiel et de Résolution (ACPR), 4
                place de Budapest, CS 92459, 75436 Paris Cedex 09.
              </li>
              <li>Assurance de responsabilité civile professionnelle : [À COMPLÉTER]</li>
            </ul>
          </section>

          <section className={styles.block}>
            <h2>3. Hébergement</h2>
            <p>
              Le site est hébergé par <strong>Hostinger International Ltd.</strong>, 61 Lordou
              Vironos Street, 6023 Larnaca, Chypre —{" "}
              <a href="https://www.hostinger.fr" target="_blank" rel="noopener noreferrer">
                hostinger.fr
              </a>
              .
            </p>
          </section>

          <section className={styles.block}>
            <h2>4. Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus du site (textes, visuels, logos, éléments graphiques) est
              protégé par le droit de la propriété intellectuelle. Toute reproduction ou
              représentation, totale ou partielle, sans autorisation préalable est interdite. Les
              marques et logos des partenaires cités restent la propriété de leurs titulaires
              respectifs.
            </p>
          </section>

          <section className={styles.block}>
            <h2>5. Données personnelles (RGPD)</h2>
            <p>
              <strong>Responsable de traitement :</strong> S Capital Gestion (voir coordonnées au
              point 1).
            </p>
            <p>
              <strong>Données collectées :</strong> via le formulaire de contact — nom, prénom,
              adresse e-mail, numéro de téléphone et contenu du message. Aucune donnée n'est
              collectée à votre insu ni cédée à des tiers à des fins commerciales.
            </p>
            <p>
              <strong>Finalité :</strong> répondre à votre demande de contact et, le cas échéant,
              assurer le suivi de la relation qui en découle.
            </p>
            <p>
              <strong>Base légale :</strong> votre consentement, recueilli lors de l'envoi du
              formulaire.
            </p>
            <p>
              <strong>Sous-traitant :</strong> l'acheminement des messages du formulaire est assuré
              par le service Web3Forms (Web3Forms, hébergé dans l'Union européenne). Les e-mails sont
              ensuite reçus sur la messagerie professionnelle de l'éditeur (Google Workspace).
            </p>
            <p>
              <strong>Durée de conservation :</strong> les demandes de contact sont conservées
              [À COMPLÉTER — recommandé : 3 ans à compter du dernier contact], puis supprimées ou
              archivées.
            </p>
            <p>
              <strong>Vos droits :</strong> vous disposez d'un droit d'accès, de rectification,
              d'effacement, de limitation, d'opposition et de portabilité de vos données. Vous
              pouvez les exercer en écrivant à{" "}
              <a href={`mailto:${EDITOR_EMAIL}`}>{EDITOR_EMAIL}</a>. Vous pouvez également introduire
              une réclamation auprès de la CNIL (
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
                cnil.fr
              </a>
              ).
            </p>
          </section>

          <section className={styles.block}>
            <h2>6. Cookies</h2>
            <p>
              Ce site ne dépose aucun cookie publicitaire ni traceur de mesure d'audience. Seuls des
              cookies strictement nécessaires à son fonctionnement peuvent être utilisés ; ils ne
              requièrent pas de consentement préalable. [À COMPLÉTER si un outil de statistiques est
              ajouté ultérieurement.]
            </p>
          </section>

          <section className={styles.block}>
            <h2>7. Responsabilité</h2>
            <p>
              Les informations diffusées sur ce site ont un caractère général et ne constituent pas
              un conseil personnalisé en investissement, en gestion de patrimoine ou en fiscalité.
              Tout investissement comporte des risques, notamment de perte en capital. L'éditeur
              s'efforce d'assurer l'exactitude des informations publiées mais ne saurait être tenu
              responsable d'éventuelles erreurs ou omissions.
            </p>
          </section>

          <section className={styles.block}>
            <h2>8. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont soumises au droit français. Tout litige relatif à
              leur interprétation ou à leur exécution relève de la compétence des tribunaux
              français.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}

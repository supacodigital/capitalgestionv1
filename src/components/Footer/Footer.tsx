import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import logoMonogramLg from "../../assets/logo-monogram-lg.webp";
import logoAmf from "../../assets/logo_amf.webp";
import logoCncef from "../../assets/logo_cncef.webp";
import logoOrias from "../../assets/logo_orias.webp";
import styles from "./Footer.module.css";

const CERTIFICATIONS = [
  { src: logoAmf, label: "Autorité des marchés financiers (AMF)" },
  { src: logoCncef, label: "CNCEF" },
  { src: logoOrias, label: "ORIAS — Registre unique des intermédiaires" },
];

const NAV_LINKS = [
  { label: "Accueil", href: "/#accueil" },
  { label: "Services", href: "/#services" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <img src={logoMonogramLg} alt="" className={styles.watermark} aria-hidden="true" />

      <div className={styles.ctaBand}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Prêt à planifier votre avenir ?</h2>
          <Link to="/#contact" className={styles.ctaButton}>
            Prendre rendez-vous
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.brandCol}>
          <span className={styles.brand}>
            <span className={styles.brandCapital}>Capital</span>
            <span className={styles.brandGestion}>Gestion</span>
          </span>
          <p className={styles.tagline}>
            Conseil en gestion de patrimoine indépendant — confiance, discrétion, sur-mesure.
          </p>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Navigation</h3>
          <ul className={styles.linkList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Contact</h3>
          <ul className={styles.linkList}>
            <li>
              <a href="tel:+33743669193" className={styles.contactLink}>
                <Phone size={15} />
                <span>07 43 66 91 93</span>
              </a>
            </li>
            <li>
              <a href="mailto:contact@sbc-capitalgestion.com" className={styles.contactLink}>
                <Mail size={15} />
                <span>contact@sbc-capitalgestion.com</span>
              </a>
            </li>
            <li>
              <span className={styles.contactLink}>
                <MapPin size={15} />
                <span>Pays de Gex · Lyon · Genève</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.certifications}>
        <span className={styles.certLabel}>Agréments &amp; enregistrements</span>
        <ul className={styles.certList}>
          {CERTIFICATIONS.map(({ src, label }) => (
            <li key={label} className={styles.certItem}>
              <img src={src} alt={label} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.bottom}>
        <p>© {year} S Capital Gestion. Tous droits réservés.</p>
        <div className={styles.bottomRight}>
          <a
            href="https://supaco-digital.com/"
            className={styles.credit}
            target="_blank"
            rel="noopener noreferrer"
          >
            Site réalisé par SupacoDigital
          </a>
          <Link to="/mentions-legales" className={styles.legal}>
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}

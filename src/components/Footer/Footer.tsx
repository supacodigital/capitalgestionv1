import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import logoMonogram from "../../assets/logo-monogram.png";
import styles from "./Footer.module.css";

const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "À propos", href: "#a-propos" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="contact">
      <img src={logoMonogram} alt="" className={styles.watermark} aria-hidden="true" />

      <div className={styles.ctaBand}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Prêt à planifier votre avenir ?</h2>
          <a href="tel:+33695636096" className={styles.ctaButton}>
            Prendre rendez-vous
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.brandCol}>
          <div className={styles.brand}>
            <img src={logoMonogram} alt="" className={styles.logoMark} />
            <span className={styles.brandText}>
              <span className={styles.brandCapital}>Capital</span>
              <span className={styles.brandGestion}>Gestion</span>
            </span>
          </div>
          <p className={styles.tagline}>
            Conseil en gestion de patrimoine indépendant — confiance, discrétion, sur-mesure.
          </p>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Navigation</h3>
          <ul className={styles.linkList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Contact</h3>
          <ul className={styles.linkList}>
            <li>
              <a href="tel:+33695636096" className={styles.contactLink}>
                <Phone size={15} />
                <span>06 95 63 60 96</span>
              </a>
            </li>
            <li>
              <a href="mailto:contact@sbc.capitalgestion.com" className={styles.contactLink}>
                <Mail size={15} />
                <span>contact@sbc.capitalgestion.com</span>
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

      <div className={styles.bottom}>
        <p>© {year} S Capital Gestion — Béatrice Sem. Tous droits réservés.</p>
        <p className={styles.legal}>Mentions légales</p>
      </div>
    </footer>
  );
}

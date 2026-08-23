import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logoMonogram from "../../assets/logo-monogram.png";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "À propos", href: "#a-propos" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${
        isMenuOpen ? styles.menuOpen : ""
      }`}
    >
      <div className={styles.inner}>
        <a href="#accueil" className={styles.brand} onClick={() => setIsMenuOpen(false)}>
          <img src={logoMonogram} alt="" className={styles.logoMark} />
          <span className={styles.brandText}>
            <span className={styles.brandCapital}>Capital</span>
            <span className={styles.brandGestion}>Gestion</span>
          </span>
        </a>

        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className={styles.cta}>
          Prendre rendez-vous
        </a>

        <button
          type="button"
          className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ""}`}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <img src={logoMonogram} alt="" className={styles.mobileWatermark} aria-hidden="true" />

            <nav className={styles.mobileNav}>
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, transform: "translateY(16px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1], delay: 0.08 + i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.a
              href="#contact"
              className={styles.mobileCta}
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0, transform: "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{
                duration: 0.45,
                ease: [0.23, 1, 0.32, 1],
                delay: 0.08 + NAV_LINKS.length * 0.05,
              }}
            >
              Prendre rendez-vous
            </motion.a>

            <motion.p
              className={styles.mobileContact}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              06 95 63 60 96 · Pays de Gex · Lyon · Genève
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

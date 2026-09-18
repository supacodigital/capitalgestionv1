import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logoFull from "../../assets/logo-full.webp";
import logoFullWhite from "../../assets/logo-full-white.webp";
import logoMonogramLg from "../../assets/logo-monogram-lg.webp";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { label: "Accueil", href: "/#accueil" },
  { label: "Services", href: "/#services" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Devenir conseiller", href: "/devenir-conseiller" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Sur la home, on intercepte les liens d'ancre pour un défilement doux
  function handleAnchorClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    setIsMenuOpen(false);
    if (pathname !== "/" || !href.includes("#")) return;
    const id = href.split("#")[1];
    const target = document.getElementById(id);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `/#${id}`);
    }
  }

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
        <a
          href="/#accueil"
          className={styles.brand}
          onClick={(e) => handleAnchorClick(e, "/#accueil")}
        >
          <img
            src={isMenuOpen ? logoFullWhite : logoFull}
            alt="Capital Gestion"
            className={styles.logoMark}
          />
        </a>

        <nav className={styles.nav}>
          {NAV_LINKS.map((link) =>
            link.href.includes("#") ? (
              <a
                key={link.href}
                href={link.href}
                className={styles.navLink}
                onClick={(e) => handleAnchorClick(e, link.href)}
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.href} to={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            )
          )}
        </nav>

        <a
          href="/#contact"
          className={styles.cta}
          onClick={(e) => handleAnchorClick(e, "/#contact")}
        >
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
            <img src={logoMonogramLg} alt="" className={styles.mobileWatermark} aria-hidden="true" />

            <nav className={styles.mobileNav}>
              {NAV_LINKS.map((link, i) => {
                const motionProps = {
                  initial: { opacity: 0, transform: "translateY(16px)" },
                  animate: { opacity: 1, transform: "translateY(0px)" },
                  transition: {
                    duration: 0.45,
                    ease: [0.23, 1, 0.32, 1] as const,
                    delay: 0.08 + i * 0.05,
                  },
                  className: styles.mobileNavLink,
                };

                // Les routes passent par Link (navigation SPA), les ancres par <a>
                return link.href.includes("#") ? (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    {...motionProps}
                  >
                    {link.label}
                  </motion.a>
                ) : (
                  <motion.div key={link.href} {...motionProps}>
                    <Link to={link.href} onClick={() => setIsMenuOpen(false)}>
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.a
              href="/#contact"
              className={styles.mobileCta}
              onClick={(e) => handleAnchorClick(e, "/#contact")}
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
              07 43 66 91 93 · Pays de Gex · Lyon · Genève
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

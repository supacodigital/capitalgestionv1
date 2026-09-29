import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logoFull from "../../assets/logo-full.webp";
import logoMonogramLg from "../../assets/logo-monogram-lg.webp";
import styles from "./Header.module.css";

// accent : le lien se détache du reste de la navigation (bordeaux)
const NAV_LINKS: { label: string; href: string; accent?: boolean }[] = [
  { label: "Services", href: "/#services" },
  { label: "Solutions", href: "/#solutions" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Méthode", href: "/#methode" },
  { label: "FAQ", href: "/#faq" },
  { label: "Devenir conseiller", href: "/devenir-conseiller", accent: true },
];

// Largeur sous laquelle les liens passent dans le menu (cf. Header.module.css)
const MENU_BREAKPOINT = 1120;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [observedId, setObservedId] = useState<string | null>(null);
  const { pathname } = useLocation();

  // Le repère de section ne vaut que sur la home
  const activeId = pathname === "/" ? observedId : null;

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

  // Repère de lecture : met en avant la section en cours sur une page longue
  useEffect(() => {
    if (pathname !== "/") return;

    const ids = NAV_LINKS.map((l) => l.href.split("#")[1]).filter(Boolean) as string[];

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // La section active est la dernière dont le haut est passé sous
        // la ligne de lecture, située juste sous le header
        const ligne = window.innerHeight * 0.4;
        let courante: string | null = null;

        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= ligne && bottom > ligne) {
            courante = id;
            break;
          }
        }

        setObservedId(courante);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  // Échap ferme le menu : attendu de tout overlay plein écran
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  // Menu ouvert : la page dessous ne défile plus et sort du parcours
  // clavier et des lecteurs d'écran, sinon Tab y part sous l'overlay
  useEffect(() => {
    if (!isMenuOpen) return;
    const background = [...document.querySelectorAll("main, footer, [data-mobile-cta]")];
    document.body.style.overflow = "hidden";
    background.forEach((el) => el.setAttribute("inert", ""));
    return () => {
      document.body.style.overflow = "";
      background.forEach((el) => el.removeAttribute("inert"));
    };
  }, [isMenuOpen]);

  // Fenêtre agrandie au-delà du point de bascule : l'overlay disparaît
  // en CSS, il faut aussi lever le verrou de défilement
  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${MENU_BREAKPOINT + 1}px)`);
    const onChange = () => {
      if (query.matches) setIsMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

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
          {/* Menu ouvert : le logo couleur a « CAPITAL » en noir, illisible sur
              le fond sombre. On reprend le lettrage du pied de page. */}
          {isMenuOpen ? (
            <span className={styles.brandText}>
              <span className={styles.brandCapital}>Capital</span>
              <span className={styles.brandGestion}>Gestion</span>
            </span>
          ) : (
            <img src={logoFull} alt="Capital Gestion" className={styles.logoMark} />
          )}
        </a>

        <nav className={styles.nav} aria-label="Navigation principale">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.split("#")[1];
            const isActive = sectionId
              ? activeId === sectionId
              : pathname === link.href;
            const className = `${styles.navLink} ${
              link.accent ? styles.navLinkAccent : ""
            } ${isActive ? styles.navLinkActive : ""}`;

            return link.href.includes("#") ? (
              <a
                key={link.href}
                href={link.href}
                className={className}
                aria-current={isActive ? "true" : undefined}
                onClick={(e) => handleAnchorClick(e, link.href)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={className}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
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
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.mobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <img src={logoMonogramLg} alt="" className={styles.mobileWatermark} aria-hidden="true" />

            <nav className={styles.mobileNav} aria-label="Menu">
              {NAV_LINKS.map((link, i) => {
                const motionProps = {
                  initial: { opacity: 0, transform: "translateY(16px)" },
                  animate: { opacity: 1, transform: "translateY(0px)" },
                  transition: {
                    duration: 0.45,
                    ease: [0.23, 1, 0.32, 1] as const,
                    delay: 0.08 + i * 0.05,
                  },
                  className: `${styles.mobileNavLink} ${
                    link.accent ? styles.mobileNavLinkAccent : ""
                  }`,
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
              <a href="tel:+33743669193">07 43 66 91 93</a> · Pays de Gex · Lyon · Genève
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

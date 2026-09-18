import { useEffect, useRef, useState } from "react";
import logoMonogram from "../../assets/logo-monogram-lg.webp";
import styles from "./TrustBar.module.css";

const ITEMS = [
  { label: "10 ans d'expérience bancaire" },
  { label: "Conseil indépendant" },
  { label: "Accompagnement dans la durée" },
  { label: "Approche globale du patrimoine" },
  { label: "Solutions adaptées à chaque profil" },
  { label: "Pays de Gex · Lyon · Genève" },
  { label: "Expertise frontalière" },
];

export default function TrustBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      rootMargin: "200px 0px",
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Mesure la largeur d'un exemplaire pour que la boucle retombe au pixel :
  // une translation de -50% dérive d'un demi-pixel sur une largeur impaire.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const first = track.firstElementChild as HTMLElement | null;
      if (!first) return;
      track.style.setProperty("--loop-width", `${first.getBoundingClientRect().width}px`);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    // Les polices changent la largeur des libellés une fois chargées
    document.fonts?.ready.then(measure).catch(() => {});

    return () => observer.disconnect();
  }, []);

  return (
    // Pas de role="marquee" : il déclare une région live que les lecteurs
    // d'écran peuvent réannoncer en boucle. Le contenu est une simple liste.
    <div className={styles.trustBar} ref={containerRef}>
      <img src={logoMonogram} alt="" className={styles.watermark} aria-hidden="true" />

      <div
        className={`${styles.track} ${isVisible ? styles.trackRunning : ""}`}
        ref={trackRef}
      >
        {[0, 1].map((rep) => (
          <ul
            className={styles.list}
            key={rep}
            aria-label={rep === 0 ? "Repères clés" : undefined}
            // Le second exemplaire n'existe que pour boucler visuellement
            aria-hidden={rep === 1 || undefined}
          >
            {ITEMS.map(({ label }) => (
              <li className={styles.item} key={label}>
                <span className={styles.plainLabel}>{label}</span>
                <span className={styles.dot} aria-hidden="true" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

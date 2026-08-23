import { useEffect, useRef, useState } from "react";
import logoMonogram from "../../assets/logo-monogram.png";
import styles from "./TrustBar.module.css";

const ITEMS = [
  { value: "10 ans", label: "d'expérience" },
  { value: "5 000", label: "clients accompagnés" },
  { value: "3 M€", label: "de patrimoine accompagné" },
  { label: "Conseil personnalisé" },
  { label: "Accompagnement dans la durée" },
  { label: "Approche globale" },
  { label: "Solutions adaptées à chaque profil" },
];

export default function TrustBar() {
  const containerRef = useRef<HTMLDivElement>(null);
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

  return (
    <div className={styles.trustBar} role="marquee" aria-label="Repères clés" ref={containerRef}>
      <img src={logoMonogram} alt="" className={styles.watermark} aria-hidden="true" />

      <div className={`${styles.track} ${isVisible ? styles.trackRunning : ""}`}>
        {[0, 1].map((rep) => (
          <ul className={styles.list} key={rep} aria-hidden={rep === 1}>
            {ITEMS.map(({ value, label }, i) => (
              <li className={styles.item} key={i}>
                {value && <span className={styles.value}>{value}</span>}
                <span className={value ? styles.label : styles.plainLabel}>{label}</span>
                <span className={styles.dot} aria-hidden="true" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

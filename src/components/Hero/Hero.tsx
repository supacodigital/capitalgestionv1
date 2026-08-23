import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, MapPin } from "lucide-react";
import logoMonogram from "../../assets/logo-monogram.png";
import styles from "./Hero.module.css";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(`.${styles.watermark}`, { opacity: 0, scale: 0.95, duration: 1 })
        .from(`.${styles.eyebrow}`, { opacity: 0, y: 14, duration: 0.6 }, "-=0.7")
        .from(`.${styles.titleLine}`, { opacity: 0, y: 24, duration: 0.7, stagger: 0.08 }, "-=0.35")
        .from(`.${styles.subtitle}`, { opacity: 0, y: 16, duration: 0.6 }, "-=0.3")
        .from(`.${styles.actions} > *`, { opacity: 0, y: 12, duration: 0.5, stagger: 0.06 }, "-=0.3")
        .from(`.${styles.locations}`, { opacity: 0, y: 10, duration: 0.5 }, "-=0.25");
    },
    { scope: containerRef }
  );

  return (
    <section id="accueil" className={styles.hero} ref={containerRef}>
      <img src={logoMonogram} alt="" className={styles.watermark} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowLine} aria-hidden="true" />
          Conseil en gestion de patrimoine indépendant
        </p>

        <h1 className={styles.title}>
          <span className={styles.titleLine}>Votre patrimoine mérite</span>
          <span className={styles.titleLine}>
            un conseil <em>sur-mesure</em>
          </span>
        </h1>

        <p className={styles.subtitle}>
          Béatrice Sem vous accompagne avec confiance et discrétion pour construire, protéger et
          transmettre votre patrimoine — investissement, retraite, prévoyance et fiscalité.
        </p>

        <div className={styles.actions}>
          <a href="#contact" className={styles.primaryCta}>
            Prendre rendez-vous
            <ArrowRight size={18} />
          </a>
          <a href="#services" className={styles.secondaryCta}>
            <span className={styles.secondaryCtaLabel}>Découvrir nos services</span>
          </a>
        </div>

        <div className={styles.locations}>
          <MapPin size={16} />
          <span>Pays de Gex · Lyon · Genève</span>
        </div>
      </div>
    </section>
  );
}

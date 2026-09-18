import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import logoMonogram from "../../assets/logo-monogram-lg.webp";
import styles from "./Hero.module.css";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Mouvement réduit : on affiche sans déplacer, un simple fondu suffit
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.from(`.${styles.content} > *`, { opacity: 0, duration: 0.3, stagger: 0.04 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Séquence resserrée : le premier écran doit être lisible vite.
      // Le filigrane monte en parallèle du texte plutôt qu'avant lui.
      tl.from(`.${styles.watermark}`, { opacity: 0, scale: 0.97, duration: 1.1 }, 0)
        .from(`.${styles.eyebrow}`, { opacity: 0, y: 12, duration: 0.5 }, 0.05)
        .from(
          `.${styles.titleLine}`,
          { opacity: 0, y: 20, duration: 0.65, stagger: 0.07 },
          0.14
        )
        .from(`.${styles.subtitle}`, { opacity: 0, y: 14, duration: 0.55 }, 0.36)
        // Les actions arrivent ensemble : décaler l'accès au CTA n'apporte rien
        .from(`.${styles.actions}`, { opacity: 0, y: 12, duration: 0.5 }, 0.48)
        .from(`.${styles.scrollHint}`, { opacity: 0, duration: 0.5 }, 0.7);
    },
    { scope: containerRef }
  );

  return (
    <section id="accueil" className={styles.hero} ref={containerRef}>
      <img src={logoMonogram} alt="" className={styles.watermark} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowLine} aria-hidden="true" />
          Gestion de patrimoine indépendante — Pays de Gex, Lyon, Genève
        </p>

        <h1 className={styles.title}>
          <span className={styles.titleLine}>Faites de votre patrimoine</span>
          <span className={styles.titleLine}>
            une <em>stratégie</em>, pas un hasard
          </span>
        </h1>

        <p className={styles.subtitle}>
          Capital Gestion met son indépendance au service de vos décisions : un accompagnement
          clair et discret pour investir, préparer votre retraite, protéger vos proches et alléger
          votre fiscalité.
        </p>

        <div className={styles.actions}>
          <a href="#contact" className={styles.primaryCta}>
            Prendre rendez-vous
            <ArrowRight size={18} />
          </a>
          <a href="#services" className={styles.secondaryCta}>
            <span className={styles.secondaryCtaLabel}>Découvrir les expertises</span>
          </a>
        </div>
      </div>

      {/* Indice de défilement : le hero occupe presque toute la hauteur d'écran */}
      <span className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollHintLine} />
      </span>
    </section>
  );
}

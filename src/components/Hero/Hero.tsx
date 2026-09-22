import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, LineChart, PiggyBank, ShieldCheck, Landmark } from "lucide-react";
import logoMonogram from "../../assets/logo-monogram-lg.webp";
import styles from "./Hero.module.css";

// Les quatre métiers, annoncés dès le premier écran : le visiteur doit
// savoir ce qui lui est proposé sans avoir à faire défiler la page.
const PILLARS = [
  { icon: LineChart, label: "Investissement", href: "#services" },
  { icon: PiggyBank, label: "Retraite", href: "#services" },
  { icon: ShieldCheck, label: "Prévoyance", href: "#services" },
  { icon: Landmark, label: "Fiscalité", href: "#services" },
];

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
        .from(`.${styles.pillar}`, { opacity: 0, y: 10, duration: 0.45, stagger: 0.05 }, 0.58);
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
          Béatrice Sem, conseillère indépendante, vous accompagne sur quatre domaines :
          investir, préparer votre retraite, protéger vos proches, alléger votre fiscalité.
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

        <ul className={styles.pillars} aria-label="Domaines d'expertise">
          {PILLARS.map(({ icon: Icon, label, href }) => (
            <li className={styles.pillar} key={label}>
              <a href={href} className={styles.pillarLink}>
                <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
                <span className={styles.pillarLabel}>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}

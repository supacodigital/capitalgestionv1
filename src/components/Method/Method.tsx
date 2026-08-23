import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Method.module.css";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "Échange",
    description: "Comprendre votre situation, vos objectifs et vos projets.",
  },
  {
    number: "02",
    title: "Analyse",
    description: "Analyser votre patrimoine et identifier les opportunités.",
  },
  {
    number: "03",
    title: "Stratégie",
    description: "Construire une stratégie personnalisée.",
  },
  {
    number: "04",
    title: "Suivi",
    description: "Faire évoluer votre stratégie dans le temps.",
  },
];

export default function Method() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(`.${styles.header}`, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.grid}`,
          start: "top 82%",
        },
      });

      tl.from(`.${styles.step}`, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.16,
      }).to(
        `.${styles.connector}`,
        {
          scaleY: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.16,
        },
        0.3
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="methode" className={styles.method} ref={containerRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            Méthode d'accompagnement
          </p>
          <h2 className={styles.title}>Une approche en 4 étapes</h2>
        </div>

        <div className={styles.grid}>
          {STEPS.map(({ number, title, description }, i) => (
            <div className={styles.step} key={number}>
              <span className={styles.connector} aria-hidden="true" />
              <span className={styles.number}>{number}</span>
              <h3 className={styles.stepTitle}>{title}</h3>
              <p className={styles.stepText}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

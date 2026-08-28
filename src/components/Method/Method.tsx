import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import stepEchange from "../../assets/method/echange.webp";
import stepAnalyse from "../../assets/method/analyse.webp";
import stepStrategie from "../../assets/method/strategie.webp";
import stepSuivi from "../../assets/method/suivi.webp";
import styles from "./Method.module.css";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "Échange",
    description:
      "Comprendre votre situation, vos objectifs et vos projets, lors d'un premier rendez-vous sans engagement.",
    image: stepEchange,
  },
  {
    number: "02",
    title: "Analyse",
    description:
      "Étudier votre patrimoine dans son ensemble — actifs, fiscalité, protection — et identifier les leviers d'optimisation.",
    image: stepAnalyse,
  },
  {
    number: "03",
    title: "Stratégie",
    description:
      "Construire une feuille de route personnalisée, claire et hiérarchisée, avec des recommandations concrètes.",
    image: stepStrategie,
  },
  {
    number: "04",
    title: "Suivi",
    description:
      "Accompagner la mise en œuvre et faire évoluer la stratégie dans le temps, au rythme de votre vie.",
    image: stepSuivi,
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
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      });

      gsap.from(`.${styles.step}`, {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: `.${styles.steps}`, start: "top 78%" },
      });
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
          <h2 className={styles.title}>Une approche en quatre temps</h2>
        </div>

        <ol className={styles.steps}>
          {STEPS.map(({ number, title, description, image }) => (
            <li className={styles.step} key={number}>
              <div className={styles.figure}>
                <img src={image} alt="" loading="lazy" />
              </div>
              <div className={styles.body}>
                <span className={styles.number} aria-hidden="true">
                  {number}
                </span>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepText}>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Search, Compass, LineChart, ArrowRight } from "lucide-react";
import logoMonogram from "../../assets/logo-monogram-lg.webp";
import styles from "./Method.module.css";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Échange",
    description:
      "Comprendre votre situation, vos objectifs et vos projets, lors d'un premier rendez-vous sans engagement.",
  },
  {
    number: "02",
    icon: Search,
    title: "Analyse",
    description:
      "Étudier votre patrimoine dans son ensemble — actifs, fiscalité, protection — et identifier les leviers d'optimisation.",
  },
  {
    number: "03",
    icon: Compass,
    title: "Stratégie",
    description:
      "Construire une feuille de route personnalisée, claire et hiérarchisée, avec des recommandations concrètes.",
  },
  {
    number: "04",
    icon: LineChart,
    title: "Suivi",
    description:
      "Accompagner la mise en œuvre et faire évoluer la stratégie dans le temps, au rythme de votre vie.",
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

        <div className={styles.layout}>
          {/* Colonne graphique : monogramme et filets, sans photographie */}
          <aside className={styles.visual} aria-hidden="true">
            <div className={styles.visualInner}>
              <img src={logoMonogram} alt="" className={styles.visualMark} />
              <span className={styles.visualRule} />
              <p className={styles.visualQuote}>
                Une méthode, quatre temps,
                <br />
                et le temps qu'il faut.
              </p>
            </div>
          </aside>

          <ol className={styles.steps}>
            {STEPS.map(({ number, icon: Icon, title, description }) => (
              <li className={styles.step} key={number}>
                <div className={styles.marker} aria-hidden="true">
                  <span className={styles.dot}>
                    <Icon size={17} strokeWidth={1.7} />
                  </span>
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

        <a href="#contact" className={styles.cta}>
          Prendre rendez-vous
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

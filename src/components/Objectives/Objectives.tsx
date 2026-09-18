import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Coins,
  Building2,
  Receipt,
  GraduationCap,
  Hourglass,
  Scroll,
  Layers,
  Leaf,
  ArrowRight,
} from "lucide-react";
import styles from "./Objectives.module.css";

gsap.registerPlugin(ScrollTrigger);

const OBJECTIVES = [
  {
    icon: Coins,
    title: "Générer des revenus complémentaires",
    text: "Mettre votre épargne au travail pour compléter vos revenus, aujourd'hui ou à terme.",
  },
  {
    icon: Building2,
    title: "Investir dans l'immobilier",
    text: "Locatif, meublé, nue-propriété ou pierre-papier : choisir le support qui sert vraiment votre projet.",
  },
  {
    icon: Receipt,
    title: "Réduire sa pression fiscale",
    text: "Utiliser les dispositifs adaptés à votre tranche d'imposition, sans jamais subordonner le placement à l'avantage fiscal.",
  },
  {
    icon: GraduationCap,
    title: "Anticiper les études des enfants",
    text: "Constituer un capital disponible au bon moment, avec le bon niveau de risque selon l'échéance.",
  },
  {
    icon: Hourglass,
    title: "Préparer sa retraite",
    text: "Mesurer la baisse de revenus à venir et la compenser progressivement, en tenant compte des carrières transfrontalières.",
  },
  {
    icon: Scroll,
    title: "Organiser sa transmission",
    text: "Protéger votre conjoint, préparer la succession et transmettre dans un cadre fiscal maîtrisé.",
  },
  {
    icon: Layers,
    title: "Diversifier son patrimoine",
    text: "Répartir vos actifs entre classes, supports et horizons pour ne pas dépendre d'un seul marché.",
  },
  {
    icon: Leaf,
    title: "Donner du sens à son épargne",
    text: "Orienter vos investissements vers des supports durables, sans renoncer à la performance.",
  },
];

const FRAMING = [
  { number: "01", title: "Nommer l'objectif", text: "Définir précisément ce que vous cherchez à accomplir." },
  { number: "02", title: "Fixer une échéance", text: "Poser un horizon de temps réaliste, qui déterminera le niveau de risque." },
  { number: "03", title: "Définir un budget", text: "Identifier la capacité d'épargne et le capital mobilisable, sans fragiliser votre équilibre." },
];

export default function Objectives() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(`.${styles.header}`, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
      });

      gsap.from(`.${styles.card}`, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: `.${styles.grid}`, start: "top 84%" },
      });

      gsap.from(`.${styles.step}`, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: `.${styles.framing}`, start: "top 85%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="objectifs" className={styles.objectives} ref={containerRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            Vos objectifs
          </p>
          <h2 className={styles.title}>Quels sont vos projets ?</h2>
          <p className={styles.intro}>
            Chaque situation a son histoire, ses contraintes et ses échéances. La stratégie se
            construit à partir de vos objectifs — jamais l'inverse.
          </p>
        </div>

        <ul className={styles.grid}>
          {OBJECTIVES.map(({ icon: Icon, title, text }) => (
            <li className={styles.card} key={title}>
              <div className={styles.iconWrap}>
                <Icon size={20} strokeWidth={1.6} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardText}>{text}</p>
            </li>
          ))}
        </ul>

        <div className={styles.framing}>
          <div className={styles.framingHeader}>
            <h3 className={styles.framingTitle}>Cadrer avant d'investir</h3>
            <p className={styles.framingIntro}>
              Avant toute recommandation, trois questions structurent l'échange. Elles déterminent
              tout le reste.
            </p>
          </div>

          <ol className={styles.steps}>
            {FRAMING.map(({ number, title, text }) => (
              <li className={styles.step} key={number}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {number}
                </span>
                <h4 className={styles.stepTitle}>{title}</h4>
                <p className={styles.stepText}>{text}</p>
              </li>
            ))}
          </ol>

          <a href="#contact" className={styles.cta}>
            Définir votre stratégie patrimoniale
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

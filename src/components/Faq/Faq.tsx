import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import faqImage from "../../assets/faq.webp";
import styles from "./Faq.module.css";

gsap.registerPlugin(ScrollTrigger);

const QUESTIONS = [
  {
    question: "Qu'est-ce qu'un conseiller en gestion de patrimoine indépendant ?",
    answer:
      "C'est un professionnel qui vous accompagne dans l'ensemble de vos décisions patrimoniales — placements, immobilier, retraite, prévoyance, fiscalité et transmission — sans être lié à un réseau bancaire. Les recommandations reposent uniquement sur votre intérêt, avec un large choix de solutions du marché.",
  },
  {
    question: "En quoi votre conseil diffère-t-il de celui de ma banque ?",
    answer:
      "Une banque distribue avant tout ses propres produits. En tant qu'indépendante, je compare les offres de nombreux partenaires (assureurs, sociétés de gestion, promoteurs) pour retenir celles qui correspondent le mieux à votre profil, votre horizon et votre fiscalité.",
  },
  {
    question: "Comment êtes-vous rémunérée ?",
    answer:
      "La rémunération peut prendre la forme d'honoraires de conseil, de commissions versées par les partenaires sur les solutions souscrites, ou d'une combinaison des deux. Le mode de rémunération vous est présenté en toute transparence avant tout engagement.",
  },
  {
    question: "Accompagnez-vous les frontaliers et les résidents suisses ?",
    answer:
      "Oui. J'interviens dans tout le bassin franco-genevois — Pays de Gex, Lyon, Genève — et je connais les problématiques propres aux frontaliers : fiscalité transfrontalière, prévoyance, épargne dans les deux pays et préparation de la retraite.",
  },
  {
    question: "Comment se déroule un premier rendez-vous ?",
    answer:
      "Le premier échange est sans engagement. Il sert à comprendre votre situation, vos objectifs et vos projets. Je vous présente ensuite ma méthode et, si vous le souhaitez, nous engageons une analyse complète de votre patrimoine.",
  },
  {
    question: "Faut-il disposer d'un patrimoine important pour vous consulter ?",
    answer:
      "Non. L'accompagnement s'adresse aussi bien aux personnes qui commencent à structurer leur épargne qu'à celles disposant déjà d'un patrimoine constitué. L'essentiel est d'avoir un projet et l'envie d'être conseillé.",
  },
  {
    question: "Mes informations restent-elles confidentielles ?",
    answer:
      "Absolument. La discrétion est au cœur de la relation. Vos données personnelles et patrimoniales sont traitées de manière strictement confidentielle et ne sont jamais transmises à des tiers sans votre accord.",
  },
];

export default function Faq() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

      gsap.from(`.${styles.item}`, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: `.${styles.list}`,
          start: "top 82%",
        },
      });

      gsap.from(`.${styles.figure}`, {
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.layout}`,
          start: "top 78%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="faq" className={styles.faq} ref={containerRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            Questions fréquentes
          </p>
          <h2 className={styles.title}>Ce que vous vous demandez peut-être</h2>
        </div>

        <div className={styles.layout}>
          <div className={styles.list}>
            {QUESTIONS.map(({ question, answer }, index) => {
              const isOpen = openIndex === index;
              return (
                <div className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`} key={question}>
                  <h3 className={styles.questionHeading}>
                    <button
                      type="button"
                      className={styles.question}
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span>{question}</span>
                      <span className={styles.iconWrap} aria-hidden="true">
                        <Plus size={18} strokeWidth={1.8} />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className={styles.answerWrap}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                      >
                        <p className={styles.answer}>{answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className={styles.figure} aria-hidden="true">
            <img src={faqImage} alt="" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

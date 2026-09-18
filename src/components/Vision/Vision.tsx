import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import logoMonogram from "../../assets/logo-monogram-lg.webp";
import styles from "./Vision.module.css";

gsap.registerPlugin(ScrollTrigger);

const CONVICTIONS = [
  {
    title: "L'indépendance avant tout",
    text: "Aucune obligation de placer les produits d'un groupe. Le conseil part de votre situation, jamais d'un catalogue à écouler.",
  },
  {
    title: "La pédagogie comme méthode",
    text: "Vous ne signez rien que vous ne compreniez. Chaque recommandation est expliquée : son intérêt, son coût, ses risques.",
  },
  {
    title: "La durée plutôt que l'opération",
    text: "Un patrimoine se construit sur des années. L'accompagnement se poursuit bien après la mise en place des solutions.",
  },
];

export default function Vision() {
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

      gsap.from(`.${styles.quote}`, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: `.${styles.quote}`, start: "top 85%" },
      });

      gsap.from(`.${styles.conviction}`, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: `.${styles.convictions}`, start: "top 82%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="vision" className={styles.vision} ref={containerRef}>
      <img src={logoMonogram} alt="" className={styles.watermark} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            Ma vision du métier
          </p>
          <h2 className={styles.title}>
            Personne ne nous apprend à gérer son patrimoine
          </h2>
          <p className={styles.intro}>
            On nous enseigne un métier, rarement ce qu'il faut faire de ce qu'il rapporte. Épargne,
            fiscalité, retraite, transmission : autant de décisions lourdes de conséquences, prises
            le plus souvent sans repères, dans un contexte économique qui laisse peu de place à
            l'improvisation.
          </p>
        </div>

        <blockquote className={styles.quote}>
          <p className={styles.quoteText}>
            Mon rôle n'est pas de vendre un produit, mais de vous rendre capable de décider en
            connaissance de cause.
          </p>
          <cite className={styles.quoteAuthor}>Béatrice Sem, Capital Gestion</cite>
        </blockquote>

        <div className={styles.convictions}>
          {CONVICTIONS.map(({ title, text }) => (
            <article className={styles.conviction} key={title}>
              <h3 className={styles.convictionTitle}>{title}</h3>
              <p className={styles.convictionText}>{text}</p>
            </article>
          ))}
        </div>

        <a href="#contact" className={styles.cta}>
          Échanger sur votre situation
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

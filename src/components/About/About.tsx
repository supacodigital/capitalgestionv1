import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import portrait from "../../assets/beatrice-portrait.webp";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { label: "Expérience", value: "10 ans en banque" },
  { label: "Clientèle", value: "Particuliers et professionnels" },
  { label: "Formation", value: "Master en finance" },
];

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

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(`.${styles.figure}`, {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
      });

      gsap.from(`.${styles.body} > *`, {
        opacity: 0,
        y: 22,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: containerRef.current, start: "top 76%" },
      });

      gsap.from(`.${styles.conviction}`, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: `.${styles.convictions}`, start: "top 86%" },
      });
    },
    { scope: containerRef },
  );

  return (
    <section id="a-propos" className={styles.about} ref={containerRef}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.figure}>
            <img
              src={portrait}
              alt="Béatrice Sem, conseillère en gestion de patrimoine"
              className={styles.portrait}
              loading="lazy"
              width={1254}
              height={1254}
            />
            <ul className={styles.milestones}>
              {MILESTONES.map(({ label, value }) => (
                <li className={styles.milestone} key={label}>
                  <span className={styles.milestoneLabel}>{label}</span>
                  <span className={styles.milestoneValue}>{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.body}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              Qui vous accompagne
            </p>

            <h2 className={styles.title}>
              Personne ne nous apprend à gérer son patrimoine
            </h2>

            <p className={styles.text}>
              On nous enseigne un métier, rarement ce qu'il faut faire de ce
              qu'il rapporte. Épargne, fiscalité, retraite, transmission :
              autant de décisions lourdes de conséquences, prises le plus
              souvent sans repères.
            </p>

            <p className={styles.text}>
              Dix années en banque m'ont fait voir passer des centaines de
              situations patrimoniales — celles de particuliers d'abord, de
              chefs d'entreprise et d'indépendants ensuite. On y apprend à lire
              un bilan autant qu'une histoire de famille, à repérer ce qui
              coince dans un montage, et à distinguer un placement réellement
              adapté d'un produit simplement disponible.
            </p>

            <p className={styles.text}>
              J'ai choisi l'indépendance pour retrouver ma liberté de
              recommandation. Au sein du réseau Inovea, je m'appuie sur une
              architecture ouverte et sur un collectif de conseillers, tout en
              gardant la maîtrise complète de la relation avec mes clients.
            </p>

            <blockquote className={styles.quote}>
              <p className={styles.quoteText}>
                Dix ans passés de l'autre côté du guichet m'ont convaincue d'une
                chose : le bon conseil commence par écouter, pas par proposer.
              </p>
              <cite className={styles.quoteAuthor}>Béatrice Sem</cite>
            </blockquote>

            <a href="#contact" className={styles.cta}>
              Faire connaissance
              <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <div className={styles.convictions}>
          {CONVICTIONS.map(({ title, text }) => (
            <article className={styles.conviction} key={title}>
              <h3 className={styles.convictionTitle}>{title}</h3>
              <p className={styles.convictionText}>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

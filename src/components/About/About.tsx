import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import portrait from "../../assets/serviceportrait.jpg";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    label: "Formation",
    value: "Master en finance",
  },
  {
    label: "Expérience",
    value: "15 ans en banque",
  },
  {
    label: "Clientèle",
    value: "Particuliers et professionnels",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(`.${styles.figure}`, {
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
      });

      gsap.from(`.${styles.body} > *`, {
        opacity: 0,
        y: 22,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: containerRef.current, start: "top 76%" },
      });

      gsap.from(`.${styles.milestone}`, {
        opacity: 0,
        y: 18,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: `.${styles.milestones}`, start: "top 88%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="a-propos" className={styles.about} ref={containerRef}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          {/* TODO cliente : remplacer par un vrai portrait de Béatrice Sem.
              L'image actuelle est une illustration patrimoniale générique,
              également utilisée dans la section Services. */}
          <div className={styles.figure}>
            <img
              src={portrait}
              alt=""
              className={styles.portrait}
              loading="lazy"
              aria-hidden="true"
            />
          </div>

          <div className={styles.body}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              À propos
            </p>

            <h2 className={styles.title}>Béatrice Sem</h2>
            <p className={styles.role}>Conseillère en gestion de patrimoine</p>

            <p className={styles.text}>
              Titulaire d'un Master en finance, j'ai exercé quinze années en banque, d'abord auprès
              d'une clientèle de particuliers puis de professionnels. Ce parcours m'a appris à lire
              une situation patrimoniale dans son ensemble — les revenus, la fiscalité, les
              contraintes d'une activité indépendante, les projets de famille — et à mesurer ce qui
              distingue un placement adapté d'un produit simplement disponible.
            </p>

            <p className={styles.text}>
              J'ai choisi d'exercer en indépendante pour retrouver cette liberté de recommandation.
              Au sein du réseau Inovea, je m'appuie sur une architecture ouverte et sur un collectif
              de conseillers, tout en gardant la maîtrise complète de la relation avec mes clients.
            </p>

            <blockquote className={styles.quote}>
              Quinze ans passés de l'autre côté du guichet m'ont convaincue d'une chose : le bon
              conseil commence par écouter, pas par proposer.
            </blockquote>

            <ul className={styles.milestones}>
              {MILESTONES.map(({ label, value }) => (
                <li className={styles.milestone} key={label}>
                  <span className={styles.milestoneLabel}>{label}</span>
                  <span className={styles.milestoneValue}>{value}</span>
                </li>
              ))}
            </ul>

            <a href="#contact" className={styles.cta}>
              Faire connaissance
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

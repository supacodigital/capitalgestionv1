import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { LineChart, PiggyBank, ShieldCheck, Landmark } from "lucide-react";
import investmentImage from "../../assets/services/investissement.webp";
import retirementImage from "../../assets/services/retraite.webp";
import protectionImage from "../../assets/services/prevoyance.webp";
import taxImage from "../../assets/services/fiscalite.webp";
import { reveal } from "../../lib/reveal";
import styles from "./Services.module.css";

// slug : sert de repère CSS pour recadrer une image dont le sujet
// n'est pas centré (voir .card[data-pillar] dans le module)
const PILLARS = [
  {
    slug: "investissement",
    icon: LineChart,
    image: investmentImage,
    title: "Investissement",
    description:
      "Une stratégie d'allocation pensée selon votre profil de risque et vos objectifs, pour faire fructifier votre capital dans la durée.",
  },
  {
    slug: "retraite",
    icon: PiggyBank,
    image: retirementImage,
    title: "Retraite",
    description:
      "Anticiper et optimiser vos revenus futurs grâce à des solutions d'épargne retraite adaptées à votre situation professionnelle.",
  },
  {
    slug: "prevoyance",
    icon: ShieldCheck,
    image: protectionImage,
    title: "Prévoyance",
    description:
      "Protéger votre famille et votre patrimoine face aux aléas de la vie, avec des garanties sur-mesure et bien dimensionnées.",
  },
  {
    slug: "fiscalite",
    icon: Landmark,
    image: taxImage,
    title: "Fiscalité",
    description:
      "Structurer votre patrimoine pour maîtriser votre fiscalité, en toute conformité, et optimiser chaque décision patrimoniale.",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      reveal(`.${styles.header}`, {
        y: 20,
        duration: 0.7,
        scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
      });

      reveal(`.${styles.card}`, {
        y: 28,
        duration: 0.8,
        stagger: 0.08,
        scrollTrigger: { trigger: `.${styles.grid}`, start: "top 82%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="services" className={styles.services} ref={containerRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            Nos domaines d'expertise
          </p>
          <h2 className={styles.title}>Votre patrimoine, sous tous ses angles</h2>
        </div>

        <ul className={styles.grid}>
          {PILLARS.map(({ slug, icon: Icon, image, title, description }) => (
            <li className={styles.card} key={slug} data-pillar={slug}>
              {/* Image d'ambiance : le sens est porté par le titre et le texte */}
              <img
                src={image}
                alt=""
                className={styles.cardImage}
                width={1080}
                height={1447}
                loading="lazy"
                decoding="async"
              />
              <div className={styles.iconWrap} aria-hidden="true">
                <Icon size={20} strokeWidth={1.6} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardText}>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

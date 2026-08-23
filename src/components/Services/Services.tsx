import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LineChart, PiggyBank, ShieldCheck, Landmark } from "lucide-react";
import serviceImage from "../../assets/serviceportrait.jpg";
import styles from "./Services.module.css";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    icon: LineChart,
    title: "Investissement",
    description:
      "Une stratégie d'allocation pensée selon votre profil de risque et vos objectifs, pour faire fructifier votre capital dans la durée.",
  },
  {
    icon: PiggyBank,
    title: "Retraite",
    description:
      "Anticiper et optimiser vos revenus futurs grâce à des solutions d'épargne retraite adaptées à votre situation professionnelle.",
  },
  {
    icon: ShieldCheck,
    title: "Prévoyance",
    description:
      "Protéger votre famille et votre patrimoine face aux aléas de la vie, avec des garanties sur-mesure et bien dimensionnées.",
  },
  {
    icon: Landmark,
    title: "Fiscalité",
    description:
      "Structurer votre patrimoine pour maîtriser votre fiscalité, en toute conformité, et optimiser chaque décision patrimoniale.",
  },
];

export default function Services() {
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

      gsap.from(`.${styles.image}`, {
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.layout}`,
          start: "top 78%",
        },
      });

      gsap.from(`.${styles.card}`, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: `.${styles.grid}`,
          start: "top 82%",
        },
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
          <h2 className={styles.title}>Un accompagnement patrimonial complet</h2>
        </div>

        <div className={styles.layout}>
          <div className={styles.image}>
            <img
              src={serviceImage}
              alt="Investissement, retraite, prévoyance, fiscalité : les piliers de l'accompagnement patrimonial"
              className={styles.imagePhoto}
            />
          </div>

          <div className={styles.grid}>
            {PILLARS.map(({ icon: Icon, title, description }) => (
              <div className={styles.card} key={title}>
                <div className={styles.iconWrap}>
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardText}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

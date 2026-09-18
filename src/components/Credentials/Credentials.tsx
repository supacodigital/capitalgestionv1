import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, FileCheck, Scale, Lock } from "lucide-react";
import logoAmf from "../../assets/logo_amf.webp";
import logoCncef from "../../assets/logo_cncef.webp";
import logoOrias from "../../assets/logo_orias.webp";
import styles from "./Credentials.module.css";

gsap.registerPlugin(ScrollTrigger);

const CREDENTIALS = [
  {
    logo: logoOrias,
    name: "ORIAS",
    title: "Immatriculation au registre unique",
    text: "L'inscription à l'ORIAS est obligatoire et vérifiable publiquement. Elle est contrôlée et renouvelée chaque année.",
    // Numéro à renseigner une fois communiqué par la cliente
    reference: "N° [À COMPLÉTER]",
  },
  {
    logo: logoAmf,
    name: "AMF",
    title: "Conseil en investissements financiers",
    text: "L'activité de CIF est encadrée par le règlement général de l'Autorité des marchés financiers, qui fixe les règles de bonne conduite et d'information du client.",
    reference: null,
  },
  {
    logo: logoCncef,
    name: "CNCEF Patrimoine",
    title: "Association agréée par l'AMF",
    text: "L'adhésion à une association professionnelle agréée est obligatoire. Elle vérifie la compétence, l'honorabilité et les pratiques de ses membres.",
    reference: null,
  },
];

const GUARANTEES = [
  {
    icon: FileCheck,
    title: "Information précontractuelle",
    text: "Avant toute souscription, vous recevez un document détaillant la mission, les modes de rémunération et les risques.",
  },
  {
    icon: Scale,
    title: "Conseil adapté",
    text: "Toute recommandation doit être justifiée au regard de votre situation, de vos objectifs et de votre expérience financière.",
  },
  {
    icon: ShieldCheck,
    title: "Assurance responsabilité civile",
    text: "L'activité est couverte par une assurance de responsabilité civile professionnelle, condition de l'immatriculation.",
  },
  {
    icon: Lock,
    title: "Confidentialité des données",
    text: "Vos informations patrimoniales sont traitées de manière strictement confidentielle, conformément au RGPD.",
  },
];

export default function Credentials() {
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
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: `.${styles.grid}`, start: "top 84%" },
      });

      gsap.from(`.${styles.guarantee}`, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: `.${styles.guarantees}`, start: "top 85%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="reassurance" className={styles.credentials} ref={containerRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            Agréments et garanties
          </p>
          <h2 className={styles.title}>Un cadre qui vous protège</h2>
          <p className={styles.intro}>
            Le conseil en gestion de patrimoine est une profession réglementée. Les agréments ne
            sont pas des labels commerciaux : ce sont des obligations contrôlées, que vous pouvez
            vérifier par vous-même.
          </p>
        </div>

        <div className={styles.grid}>
          {CREDENTIALS.map(({ logo, name, title, text, reference }) => (
            <article className={styles.card} key={name}>
              <div className={styles.logoWrap}>
                <img src={logo} alt={name} loading="lazy" />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardText}>{text}</p>
              {reference && <p className={styles.reference}>{reference}</p>}
            </article>
          ))}
        </div>

        <div className={styles.guarantees}>
          {GUARANTEES.map(({ icon: Icon, title, text }) => (
            <div className={styles.guarantee} key={title}>
              <span className={styles.guaranteeIcon} aria-hidden="true">
                <Icon size={18} strokeWidth={1.6} />
              </span>
              <div>
                <h3 className={styles.guaranteeTitle}>{title}</h3>
                <p className={styles.guaranteeText}>{text}</p>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.verify}>
          Vous pouvez vérifier l'immatriculation de tout intermédiaire sur{" "}
          <a href="https://www.orias.fr/" target="_blank" rel="noopener noreferrer">
            orias.fr
          </a>
          .
        </p>
      </div>
    </section>
  );
}

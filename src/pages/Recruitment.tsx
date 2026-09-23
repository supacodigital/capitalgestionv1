import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  GraduationCap,
  Wrench,
  Users,
  CalendarClock,
  ArrowRight,
  Check,
} from "lucide-react";
import logoMonogram from "../assets/logo-monogram-lg.webp";
import styles from "./Recruitment.module.css";

gsap.registerPlugin(ScrollTrigger);

const MOTIVATIONS = [
  "Exercer une activité utile, au contact direct des personnes que vous conseillez",
  "Construire une rémunération liée à votre engagement et à votre portefeuille",
  "Organiser votre temps et votre rythme de travail en autonomie",
  "Entreprendre sans repartir de zéro, en vous appuyant sur une structure existante",
  "Apprendre un métier de fond, à la croisée de la finance, du droit et de la fiscalité",
];

const SUPPORT = [
  {
    icon: GraduationCap,
    title: "Formation initiale et continue",
    text: "Un parcours structuré pour acquérir les compétences techniques du métier, puis les maintenir à jour au fil des évolutions fiscales et réglementaires.",
  },
  {
    icon: Wrench,
    title: "Outils et back-office",
    text: "Logiciels d'agrégation et de bilan patrimonial, supports clients, conformité : l'infrastructure est fournie, vous vous concentrez sur le conseil.",
  },
  {
    icon: Users,
    title: "Accompagnement terrain",
    text: "Un suivi individuel au démarrage, des rendez-vous accompagnés et l'appui d'un collectif de conseillers pour les dossiers complexes.",
  },
  {
    icon: Compass,
    title: "Accès aux partenaires",
    text: "L'accès à une gamme large de solutions négociées auprès d'assureurs, de sociétés de gestion et de promoteurs, difficile à obtenir seul.",
  },
];

const REQUIREMENTS = [
  {
    title: "Capacité professionnelle",
    text: "L'activité de conseil en investissements financiers exige un niveau de qualification défini par le règlement général de l'AMF : diplôme, formation professionnelle ou expérience reconnue. Le parcours de formation permet, selon les profils, de satisfaire cette condition.",
  },
  {
    title: "Honorabilité",
    text: "L'accès à la profession est conditionné à l'absence de condamnation incompatible avec l'exercice, vérifiée lors de l'inscription.",
  },
  {
    title: "Adhésion à une association agréée",
    text: "Tout conseiller en investissements financiers doit adhérer à une association professionnelle agréée par l'AMF, qui contrôle ses pratiques.",
  },
  {
    title: "Immatriculation à l'ORIAS",
    text: "L'inscription au registre unique des intermédiaires est obligatoire et doit être renouvelée chaque année. Elle est publique et vérifiable par vos clients.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Premier échange",
    text: "Un temps d'environ une heure trente, en visioconférence ou par téléphone, pour présenter le métier tel qu'il se pratique et comprendre votre projet. Sans engagement.",
  },
  {
    number: "02",
    title: "Validation du projet",
    text: "Nous examinons ensemble votre situation, vos prérequis réglementaires et le modèle d'activité qui vous correspond — à temps plein ou en complément.",
  },
  {
    number: "03",
    title: "Formation et immatriculation",
    text: "Vous suivez le parcours de formation, constituez votre dossier d'immatriculation et mettez en place votre structure.",
  },
  {
    number: "04",
    title: "Lancement accompagné",
    text: "Vos premiers rendez-vous clients sont accompagnés. Le suivi se poursuit ensuite dans la durée, au rythme du développement de votre activité.",
  },
];

export default function Recruitment() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Titre et canonical propres à la page (restaurés au démontage)
  useEffect(() => {
    const DEFAULT_TITLE =
      "Capital Gestion — Conseil en gestion de patrimoine indépendant | Pays de Gex, Lyon, Genève";
    document.title =
      "Devenir conseiller en gestion de patrimoine — Capital Gestion";

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousHref = canonical?.href;
    if (canonical) canonical.href = "https://sbc-capitalgestion.com/devenir-conseiller";

    return () => {
      document.title = DEFAULT_TITLE;
      if (canonical && previousHref) canonical.href = previousHref;
    };
  }, []);

  useGSAP(
    () => {
      gsap.from(`.${styles.heroContent} > *`, {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
      });

      gsap.utils.toArray<HTMLElement>(`.${styles.reveal}`).forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div className={styles.page} ref={containerRef}>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <img src={logoMonogram} alt="" className={styles.watermark} aria-hidden="true" />

        <div className={styles.inner}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              Devenir conseiller
            </p>
            <h1 className={styles.heroTitle}>
              Exercer un métier de conseil,
              <br />
              en toute indépendance
            </h1>
            <p className={styles.heroText}>
              La gestion de patrimoine est un métier exigeant, qui demande de la technique, de la
              rigueur et le goût de la relation. Si ce cadre vous correspond, échangeons sur votre
              projet.
            </p>
            <a href="#echange" className={styles.heroCta}>
              En discuter ensemble
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Motivations ─────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={`${styles.header} ${styles.reveal}`}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              Votre projet
            </p>
            <h2 className={styles.title}>Ce qui amène à ce métier</h2>
            <p className={styles.intro}>
              Les parcours sont variés — reconversion, évolution depuis la banque ou l'assurance,
              recherche d'une activité complémentaire. Les motivations, elles, se recoupent souvent.
            </p>
          </div>

          <ul className={`${styles.motivations} ${styles.reveal}`}>
            {MOTIVATIONS.map((item) => (
              <li className={styles.motivation} key={item}>
                <span className={styles.motivationIcon} aria-hidden="true">
                  <Check size={15} strokeWidth={2.4} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Marché ──────────────────────────────────────────── */}
      <section className={styles.marketSection}>
        <div className={styles.inner}>
          <div className={`${styles.marketInner} ${styles.reveal}`}>
            <h2 className={styles.marketTitle}>Un besoin de conseil qui ne faiblit pas</h2>
            <p className={styles.marketText}>
              La fiscalité se complexifie, les réformes des retraites se succèdent et l'offre de
              placements s'élargit sans cesse. Face à cela, peu de particuliers disposent des
              repères nécessaires pour arbitrer seuls — et les réseaux bancaires traditionnels
              répondent mal à cette demande d'accompagnement personnalisé.
            </p>
            <p className={styles.marketText}>
              Le conseil indépendant occupe précisément cet espace. C'est un métier de long terme,
              où la valeur se construit progressivement, par la qualité du suivi et la confiance
              installée avec chaque client.
            </p>
          </div>
        </div>
      </section>

      {/* ── Accompagnement ──────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={`${styles.header} ${styles.reveal}`}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              L'accompagnement
            </p>
            <h2 className={styles.title}>Ne pas démarrer seul</h2>
            <p className={styles.intro}>
              S'installer comme conseiller indépendant ne signifie pas tout construire soi-même.
              L'adossement au réseau Inovea apporte le cadre, les outils et l'accès aux partenaires —
              vous gardez la maîtrise de votre activité et de votre organisation.
            </p>
          </div>

          <div className={`${styles.supportGrid} ${styles.reveal}`}>
            {SUPPORT.map(({ icon: Icon, title, text }) => (
              <article className={styles.supportCard} key={title}>
                <div className={styles.supportIcon}>
                  <Icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className={styles.supportTitle}>{title}</h3>
                <p className={styles.supportText}>{text}</p>
              </article>
            ))}
          </div>

          <p className={`${styles.networkNote} ${styles.reveal}`}>
            Capital Gestion est affilié au réseau <strong>Inovea</strong>, collectif de conseillers
            en gestion de patrimoine indépendants.
          </p>
        </div>
      </section>

      {/* ── Prérequis réglementaires ────────────────────────── */}
      <section className={styles.requirementsSection}>
        <div className={styles.inner}>
          <div className={`${styles.header} ${styles.reveal}`}>
            <p className={styles.eyebrowLight}>
              <span className={styles.eyebrowLineLight} aria-hidden="true" />
              Cadre réglementaire
            </p>
            <h2 className={styles.titleLight}>Une profession encadrée</h2>
            <p className={styles.introLight}>
              Le conseil en investissements financiers est une activité réglementée, contrôlée par
              l'Autorité des marchés financiers. Cet encadrement protège les clients — et constitue
              la contrepartie de la confiance qui vous sera accordée.
            </p>
          </div>

          <ol className={`${styles.requirements} ${styles.reveal}`}>
            {REQUIREMENTS.map(({ title, text }) => (
              <li className={styles.requirement} key={title}>
                <h3 className={styles.requirementTitle}>{title}</h3>
                <p className={styles.requirementText}>{text}</p>
              </li>
            ))}
          </ol>

          <p className={`${styles.disclaimer} ${styles.reveal}`}>
            Ces conditions sont examinées individuellement lors du premier échange. Aucune activité
            de conseil ne peut être exercée avant l'immatriculation effective au registre de
            l'ORIAS.
          </p>
        </div>
      </section>

      {/* ── Parcours ────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={`${styles.header} ${styles.reveal}`}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              Le parcours
            </p>
            <h2 className={styles.title}>Du premier échange à votre installation</h2>
          </div>

          <ol className={`${styles.steps} ${styles.reveal}`}>
            {STEPS.map(({ number, title, text }) => (
              <li className={styles.step} key={number}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {number}
                </span>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepText}>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Échange ─────────────────────────────────────────── */}
      <section id="echange" className={styles.ctaSection}>
        <div className={styles.inner}>
          <div className={`${styles.ctaInner} ${styles.reveal}`}>
            <div className={styles.ctaIcon} aria-hidden="true">
              <CalendarClock size={22} strokeWidth={1.6} />
            </div>
            <h2 className={styles.ctaTitle}>Un premier échange, sans engagement</h2>
            <p className={styles.ctaText}>
              Environ une heure trente, en visioconférence ou par téléphone, pour présenter le
              métier sans le survendre : ce qu'il demande, comment se construit une clientèle et ce
              que suppose le passage à l'indépendance.
            </p>

            <ul className={styles.ctaList}>
              <li>Présentation concrète du métier et de son quotidien</li>
              <li>Point sur vos prérequis réglementaires</li>
              <li>Réponses à vos questions sur le modèle et la rémunération</li>
            </ul>

            <div className={styles.ctaActions}>
              <a href="/#contact" className={styles.ctaPrimary}>
                Demander un échange
                <ArrowRight size={18} />
              </a>
              <a href="tel:+33743669193" className={styles.ctaSecondary}>
                07 43 66 91 93
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

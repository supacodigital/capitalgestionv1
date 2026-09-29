import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { TrendingUp, Building2, ShieldCheck, ArrowRight } from "lucide-react";
import { reveal } from "../../lib/reveal";
import styles from "./Solutions.module.css";

const FAMILIES = [
  {
    icon: TrendingUp,
    title: "Placements financiers",
    items: [
      "Assurance-vie",
      "Plan d'Épargne Retraite (PER)",
      "Épargne salariale",
      "Réduction d'impôts",
      "SCPI",
      "ETF, Private Equity",
      "GFI",
    ],
  },
  {
    icon: Building2,
    title: "Investissement immobilier",
    items: [
      "LMNP (Location Meublée)",
      "Loi Malraux",
      "Loi Denormandie",
      "Monuments historiques",
      "Immobilier géré (résidences services)",
      "Déficit foncier",
      "Nue-propriété, Colocation",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Prévoyance & protection",
    items: [
      "Assurance décès",
      "Garantie invalidité",
      "Prévoyance TNS",
      "Mutuelle santé",
      "Protection du conjoint",
      "Transmission & succession",
    ],
  },
];

export default function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Suivi de la carte visible sur le slider mobile : celle dont le bord
  // gauche est le plus proche de la zone d'accroche (les cartes s'y alignent)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = [...track.children] as HTMLElement[];
        const origin = track.scrollLeft + cards[0].offsetLeft;
        let nearest = 0;
        cards.forEach((card, index) => {
          if (Math.abs(card.offsetLeft - origin) < Math.abs(cards[nearest].offsetLeft - origin)) {
            nearest = index;
          }
        });
        // En fin de course, la dernière carte ne peut pas s'aligner à gauche
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
        setActiveIndex(atEnd ? cards.length - 1 : nearest);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  function goToCard(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const cards = [...track.children] as HTMLElement[];
    track.scrollTo({ left: cards[index].offsetLeft - cards[0].offsetLeft, behavior: "smooth" });
  }

  useGSAP(
    () => {
      reveal(`.${styles.header}`, {
        y: 20,
        duration: 0.7,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
        },
      });

      reveal(`.${styles.card}`, {
        y: 28,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: `.${styles.grid}`,
          start: "top 82%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="solutions" className={styles.solutions} ref={containerRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            Nos solutions
          </p>
          <h2 className={styles.title}>Des solutions adaptées à chaque objectif</h2>
          <p className={styles.intro}>
            Qu'il s'agisse de faire fructifier votre épargne, d'investir dans l'immobilier ou de
            vous protéger, je vous propose les meilleures solutions du marché.
          </p>
        </div>

        <div className={styles.grid} ref={trackRef}>
          {FAMILIES.map(({ icon: Icon, title, items }) => (
            <article className={styles.card} key={title}>
              <div className={styles.iconWrap}>
                <Icon size={22} strokeWidth={1.6} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <ul className={styles.list}>
                {items.map((item) => (
                  <li key={item} className={styles.listItem}>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={styles.cardLink}>
                Être conseillé sur ce point
                <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>

        {/* Indicateurs de position, visibles uniquement sur le slider mobile.
            De simples boutons : aucun panneau d'onglet ne leur correspond. */}
        <div className={styles.dots} role="group" aria-label="Familles de solutions">
          {FAMILIES.map(({ title }, index) => (
            <button
              key={title}
              type="button"
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
              aria-label={`Aller à « ${title} »`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goToCard(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

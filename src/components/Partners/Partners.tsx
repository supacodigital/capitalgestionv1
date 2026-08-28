import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import styles from "./Partners.module.css";

gsap.registerPlugin(ScrollTrigger);

// Import automatique de tous les logos partenaires
const LOGO_MODULES = import.meta.glob("../../assets/partners/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

// Nom lisible à partir du nom de fichier (pour l'attribut alt)
function labelFromPath(path: string): string {
  const file = path.split("/").pop()?.replace(".webp", "") ?? "";
  return file
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const PARTNERS = Object.entries(LOGO_MODULES)
  .map(([path, src]) => ({ src, label: labelFromPath(path) }))
  .sort((a, b) => a.label.localeCompare(b.label, "fr"));

// Répartition en deux rangées pour le bandeau défilant (mobile)
const MID = Math.ceil(PARTNERS.length / 2);
const ROW_ONE = PARTNERS.slice(0, MID);
const ROW_TWO = PARTNERS.slice(MID);

type Partner = { src: string; label: string };

function MarqueeRow({ items, reverse }: { items: Partner[]; reverse?: boolean }) {
  return (
    <div className={styles.marqueeRow}>
      <div className={`${styles.marqueeTrack} ${reverse ? styles.marqueeReverse : ""}`}>
        {[...items, ...items].map(({ src, label }, index) => (
          <div
            className={styles.marqueeLogo}
            key={`${label}-${index}`}
            aria-hidden={index >= items.length}
          >
            <img src={src} alt={index < items.length ? label : ""} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Partners() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useGSAP(
    () => {
      gsap.from(`.${styles.header}`, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
      });

      gsap.from(`.${styles.logo}`, {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.04,
        scrollTrigger: { trigger: `.${styles.grid}`, start: "top 85%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="partenaires" className={styles.partners} ref={containerRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            Nos partenaires
          </p>
          <h2 className={styles.title}>Les meilleures maisons du marché à vos côtés</h2>
          <p className={styles.intro}>
            Mon indépendance me permet de sélectionner, parmi les acteurs les plus reconnus, les
            solutions les mieux adaptées à votre situation.
          </p>
        </div>

        {/* Desktop / tablette : grille repliable */}
        <div className={styles.gridWrap}>
          <ul
            id="partners-grid"
            className={`${styles.grid} ${expanded ? styles.gridExpanded : ""}`}
          >
            {PARTNERS.map(({ src, label }) => (
              <li className={styles.logo} key={label}>
                <img src={src} alt={label} loading="lazy" />
              </li>
            ))}
          </ul>
          {!expanded && <div className={styles.gridFade} aria-hidden="true" />}
        </div>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={expanded}
          aria-controls="partners-grid"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Réduire" : `Voir les ${PARTNERS.length} partenaires`}
          <ChevronDown
            size={18}
            className={`${styles.toggleIcon} ${expanded ? styles.toggleIconOpen : ""}`}
            aria-hidden="true"
          />
        </button>

        {/* Mobile : bandeau défilant sur deux rangées */}
        <div className={styles.marquee} aria-label="Nos partenaires">
          <MarqueeRow items={ROW_ONE} />
          <MarqueeRow items={ROW_TWO} reverse />
        </div>
      </div>
    </section>
  );
}

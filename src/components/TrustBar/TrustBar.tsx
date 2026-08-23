import logoMonogram from "../../assets/logo-monogram.png";
import styles from "./TrustBar.module.css";

const ITEMS = [
  { value: "10 ans", label: "d'expérience" },
  { value: "5 000", label: "clients accompagnés" },
  { value: "3 M€", label: "de patrimoine accompagné" },
  { label: "Conseil personnalisé" },
  { label: "Accompagnement dans la durée" },
  { label: "Approche globale" },
  { label: "Solutions adaptées à chaque profil" },
];

export default function TrustBar() {
  return (
    <div className={styles.trustBar} role="marquee" aria-label="Repères clés">
      <img src={logoMonogram} alt="" className={styles.watermark} aria-hidden="true" />

      <div className={styles.track}>
        {[0, 1].map((rep) => (
          <ul className={styles.list} key={rep} aria-hidden={rep === 1}>
            {ITEMS.map(({ value, label }, i) => (
              <li className={styles.item} key={i}>
                {value && <span className={styles.value}>{value}</span>}
                <span className={value ? styles.label : styles.plainLabel}>{label}</span>
                <span className={styles.dot} aria-hidden="true" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Phone, CalendarCheck } from "lucide-react";
import styles from "./MobileCta.module.css";

/**
 * Barre d'action persistante sur mobile : le CTA du header y est masqué,
 * or le formulaire se trouve en bas d'une page longue.
 * Apparaît une fois le hero dépassé, se retire au niveau du formulaire.
 */
export default function MobileCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolledPastHero = window.scrollY > window.innerHeight * 0.8;

      // Inutile de la superposer au formulaire lui-même
      const contact = document.getElementById("contact");
      const contactReached = contact
        ? contact.getBoundingClientRect().top < window.innerHeight * 0.75
        : false;

      setIsVisible(scrolledPastHero && !contactReached);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`${styles.bar} ${isVisible ? styles.barVisible : ""}`}
      aria-hidden={!isVisible}
    >
      <a
        href="tel:+33743669193"
        className={styles.call}
        tabIndex={isVisible ? undefined : -1}
      >
        <Phone size={17} strokeWidth={1.8} />
        Appeler
      </a>
      <a
        href="#contact"
        className={styles.book}
        tabIndex={isVisible ? undefined : -1}
      >
        <CalendarCheck size={17} strokeWidth={1.8} />
        Prendre rendez-vous
      </a>
    </div>
  );
}

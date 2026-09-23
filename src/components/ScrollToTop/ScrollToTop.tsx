import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Gère le défilement au changement de route : remonte en haut par défaut,
 * ou rejoint l'ancre visée quand l'URL en contient une.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // Laisse la page se monter avant de chercher la cible
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

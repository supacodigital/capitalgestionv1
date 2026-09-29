import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Apparition d'éléments (au défilement ou au montage), partagée par toutes
 * les sections.
 *
 * Mouvement réduit : le fondu est conservé, car il signale l'arrivée du
 * contenu, mais le déplacement (y, scale) et la cascade sont retirés.
 */
export function reveal(targets: gsap.TweenTarget, vars: gsap.TweenVars) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    // on écarte ce qui déplace l'élément ou étale son apparition
    const { y: _y, scale: _scale, stagger: _stagger, ...rest } = vars;
    return gsap.from(targets, { ...rest, opacity: 0, duration: 0.3, ease: "none" });
  }

  return gsap.from(targets, { opacity: 0, ease: "power3.out", ...vars });
}

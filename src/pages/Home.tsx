import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import Solutions from "../components/Solutions/Solutions";
import Partners from "../components/Partners/Partners";
import Method from "../components/Method/Method";
import Faq from "../components/Faq/Faq";
import Contact from "../components/Contact/Contact";

export default function Home() {
  const { hash } = useLocation();

  // Défilement vers l'ancre quand on arrive sur la home depuis une autre page
  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (target) {
      // léger délai pour laisser les sections se monter
      requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth" }));
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <Services />
      <Solutions />
      <Partners />
      <Method />
      <Faq />
      <Contact />
    </>
  );
}

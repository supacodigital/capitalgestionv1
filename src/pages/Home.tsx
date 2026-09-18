import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import TrustBar from "../components/TrustBar/TrustBar";
import Vision from "../components/Vision/Vision";
import Objectives from "../components/Objectives/Objectives";
import About from "../components/About/About";
import Services from "../components/Services/Services";
import Solutions from "../components/Solutions/Solutions";
import Partners from "../components/Partners/Partners";
import Method from "../components/Method/Method";
import Credentials from "../components/Credentials/Credentials";
import Faq from "../components/Faq/Faq";
import Contact from "../components/Contact/Contact";
import StructuredData from "../components/StructuredData/StructuredData";
import { FAQ_ENTRIES } from "../data/faq";

// Données structurées FAQ — générées depuis la même source que la section
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ENTRIES.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

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
      <StructuredData id="faq-schema" data={FAQ_SCHEMA} />
      <Hero />
      <TrustBar />
      <Vision />
      <About />
      <Services />
      <Objectives />
      <Solutions />
      <Partners />
      <Method />
      <Credentials />
      <Faq />
      <Contact />
    </>
  );
}

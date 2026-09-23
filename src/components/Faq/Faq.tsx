import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Phone, Mail, ArrowRight } from "lucide-react";
import { FAQ_ENTRIES } from "../../data/faq";
import styles from "./Faq.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Faq() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(
    () => {
      gsap.from(`.${styles.header}`, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
        },
      });

      gsap.from(`.${styles.item}`, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: `.${styles.list}`,
          start: "top 82%",
        },
      });

      gsap.from(`.${styles.aside}`, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.layout}`,
          start: "top 78%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="faq" className={styles.faq} ref={containerRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            Questions fréquentes
          </p>
          <h2 className={styles.title}>Ce que vous vous demandez peut-être</h2>
        </div>

        <div className={styles.layout}>
          <div className={styles.list}>
            {FAQ_ENTRIES.map(({ question, answer }, index) => {
              const isOpen = openIndex === index;
              return (
                <div className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`} key={question}>
                  <h3 className={styles.questionHeading}>
                    <button
                      type="button"
                      className={styles.question}
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span>{question}</span>
                      <span className={styles.iconWrap} aria-hidden="true">
                        <Plus size={18} strokeWidth={1.8} />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className={styles.answerWrap}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                      >
                        <p className={styles.answer}>{answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Une question hors liste trouve ici sa réponse directe */}
          <aside className={styles.aside}>
            <span className={styles.asideRule} aria-hidden="true" />
            <h3 className={styles.asideTitle}>Une autre question ?</h3>
            <p className={styles.asideText}>
              Toutes les situations ne se ressemblent pas. Le plus simple reste d'en parler
              quelques minutes.
            </p>

            <ul className={styles.asideList}>
              <li>
                <a href="tel:+33743669193" className={styles.asideLink}>
                  <Phone size={16} strokeWidth={1.7} aria-hidden="true" />
                  07 43 66 91 93
                </a>
              </li>
              <li>
                <a href="mailto:contact@sbc-capitalgestion.com" className={styles.asideLink}>
                  <Mail size={16} strokeWidth={1.7} aria-hidden="true" />
                  contact@sbc-capitalgestion.com
                </a>
              </li>
            </ul>

            <a href="#contact" className={styles.asideCta}>
              Prendre rendez-vous
              <ArrowRight size={17} />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

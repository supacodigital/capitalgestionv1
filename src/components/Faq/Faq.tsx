import { useId, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Phone, Mail, ArrowRight } from "lucide-react";
import { FAQ_ENTRIES } from "../../data/faq";
import { reveal } from "../../lib/reveal";
import styles from "./Faq.module.css";

export default function Faq() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const uid = useId();

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

      reveal(`.${styles.item}`, {
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        scrollTrigger: {
          trigger: `.${styles.list}`,
          start: "top 82%",
        },
      });

      reveal(`.${styles.aside}`, {
        y: 24,
        duration: 0.8,
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
              const questionId = `${uid}-q${index}`;
              const answerId = `${uid}-a${index}`;
              return (
                <div className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`} key={question}>
                  <h3 className={styles.questionHeading}>
                    <button
                      type="button"
                      id={questionId}
                      className={styles.question}
                      aria-expanded={isOpen}
                      aria-controls={isOpen ? answerId : undefined}
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
                        id={answerId}
                        role="region"
                        aria-labelledby={questionId}
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

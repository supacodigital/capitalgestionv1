import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import faqImage from "../../assets/faq.webp";
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

      gsap.from(`.${styles.figure}`, {
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
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

          <div className={styles.figure} aria-hidden="true">
            <img src={faqImage} alt="" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

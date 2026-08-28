import { useId, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin, ArrowRight, Check } from "lucide-react";
import styles from "./Contact.module.css";

// Logos de marque (non fournis par cette version de lucide-react)
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

// Clé publique Web3Forms — l'envoi arrive sur contact@sbc-capitalgestion.com
const WEB3FORMS_KEY = "b62d561b-906c-4f35-8bbf-e495c429ce72";
const CONTACT_EMAIL = "contact@sbc-capitalgestion.com";

type Status = "idle" | "sending" | "success" | "error";
type FieldName = "name" | "email" | "phone" | "message" | "consent";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<FieldName, string>, consent: boolean): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = "Veuillez indiquer votre nom et prénom.";
  }

  if (!values.email.trim()) {
    errors.email = "Veuillez indiquer votre adresse e-mail.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Cette adresse e-mail ne semble pas valide.";
  }

  if (values.phone.trim() && !/^[+\d][\d\s.\-()]{5,}$/.test(values.phone.trim())) {
    errors.phone = "Ce numéro de téléphone ne semble pas valide.";
  }

  if (!values.message.trim()) {
    errors.message = "Veuillez saisir votre message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Votre message est un peu court (10 caractères minimum).";
  }

  if (!consent) {
    errors.consent = "Vous devez accepter l'utilisation de vos données pour être recontacté(e).";
  }

  return errors;
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLElement | null>>>({});

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Identifiants uniques et stables pour lier labels / messages d'erreur
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const errId = (name: FieldName) => `${uid}-${name}-error`;

  useGSAP(
    () => {
      gsap.from(`.${styles.header}`, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
      });

      gsap.from(`.${styles.panel}`, {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: `.${styles.layout}`, start: "top 80%" },
      });
    },
    { scope: containerRef }
  );

  function readValues(form: HTMLFormElement) {
    const fd = new FormData(form);
    return {
      values: {
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        message: String(fd.get("message") ?? ""),
        consent: fd.get("consent") ? "on" : "",
      } as Record<FieldName, string>,
      consent: Boolean(fd.get("consent")),
    };
  }

  // Revalide un champ après une première tentative d'envoi (feedback progressif)
  function revalidateField(name: FieldName) {
    if (!submitAttempted || !formRef.current) return;
    const { values, consent } = readValues(formRef.current);
    const next = validate(values, consent);
    setErrors((prev) => ({ ...prev, [name]: next[name] }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    setSubmitAttempted(true);

    const { values, consent } = readValues(form);
    const nextErrors = validate(values, consent);
    setErrors(nextErrors);

    // S'il y a des erreurs : focus sur le premier champ fautif
    const order: FieldName[] = ["name", "email", "phone", "message", "consent"];
    const firstError = order.find((f) => nextErrors[f]);
    if (firstError) {
      fieldRefs.current[firstError]?.focus();
      return;
    }

    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", "Nouvelle demande — sbc-capitalgestion.com");
    data.append("from_name", "Site S Capital Gestion");

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
        setErrors({});
        setSubmitAttempted(false);
        // Déplace le focus sur la confirmation pour les lecteurs d'écran
        requestAnimationFrame(() => statusRef.current?.focus());
      } else {
        setStatus("error");
        requestAnimationFrame(() => statusRef.current?.focus());
      }
    } catch {
      setStatus("error");
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  const describedBy = (name: FieldName, ...extra: string[]) => {
    const ids = [...extra];
    if (errors[name]) ids.push(errId(name));
    return ids.length ? ids.join(" ") : undefined;
  };

  return (
    <section id="contact" className={styles.contact} ref={containerRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            Contact
          </p>
          <h2 className={styles.title} id={id("heading")}>
            Parlons de votre projet
          </h2>
          <p className={styles.intro}>
            Un premier échange sans engagement pour faire le point sur votre situation et vos
            objectifs. Je vous réponds sous 48 heures.
          </p>
        </div>

        <div className={styles.layout}>
          <aside className={`${styles.panel} ${styles.infoPanel}`} aria-label="Coordonnées">
            <p className={styles.infoIntro}>
              Votre patrimoine mérite un regard indépendant — et une écoute attentive.
            </p>

            <ul className={styles.infoList}>
              <li className={styles.infoItem}>
                <span className={styles.infoIcon} aria-hidden="true">
                  <Phone size={18} strokeWidth={1.6} />
                </span>
                <div>
                  <span className={styles.infoLabel}>Téléphone</span>
                  <a href="tel:+33743669193" className={styles.infoValue}>
                    07 43 66 91 93
                  </a>
                </div>
              </li>
              <li className={styles.infoItem}>
                <span className={styles.infoIcon} aria-hidden="true">
                  <Mail size={18} strokeWidth={1.6} />
                </span>
                <div>
                  <span className={styles.infoLabel}>Email</span>
                  <a href={`mailto:${CONTACT_EMAIL}`} className={styles.infoValue}>
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </li>
              <li className={styles.infoItem}>
                <span className={styles.infoIcon} aria-hidden="true">
                  <MapPin size={18} strokeWidth={1.6} />
                </span>
                <div>
                  <span className={styles.infoLabel}>Zones d'intervention</span>
                  <span className={styles.infoValue}>Pays de Gex · Lyon · Genève</span>
                </div>
              </li>
            </ul>

            <div className={styles.social}>
              <span className={styles.infoLabel} id={id("social")}>
                Suivez-nous
              </span>
              <div className={styles.socialLinks} role="group" aria-labelledby={id("social")}>
                <a
                  href="https://www.instagram.com/capital_gestion/"
                  className={styles.socialLink}
                  aria-label="Instagram (nouvel onglet)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/sbc-capital-gestion/"
                  className={styles.socialLink}
                  aria-label="LinkedIn (nouvel onglet)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinIcon />
                </a>
              </div>
            </div>
          </aside>

          <div className={`${styles.panel} ${styles.formPanel}`}>
            {/* Région live : annonce l'état d'envoi et les erreurs globales */}
            <div
              ref={statusRef}
              className={styles.statusRegion}
              tabIndex={-1}
              role="status"
              aria-live="polite"
            >
              {status === "sending" && <p className={styles.statusSending}>Envoi en cours…</p>}
              {status === "success" && (
                <div className={styles.successBox}>
                  <span className={styles.successIcon} aria-hidden="true">
                    <Check size={26} strokeWidth={2} />
                  </span>
                  <h3 className={styles.successTitle}>Message envoyé</h3>
                  <p className={styles.successText}>
                    Merci pour votre message. Je reviens vers vous dans les meilleurs délais.
                  </p>
                </div>
              )}
            </div>

            {status !== "success" && (
              <form
                ref={formRef}
                className={styles.form}
                onSubmit={handleSubmit}
                aria-labelledby={id("heading")}
                noValidate
              >
                <p className={styles.requiredHint} id={id("required-hint")}>
                  Les champs suivis d'un <span aria-hidden="true">*</span> sont obligatoires.
                </p>

                {status === "error" && (
                  <p className={styles.errorBanner} role="alert">
                    L'envoi a échoué. Merci de réessayer, ou d'écrire directement à{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                  </p>
                )}

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor={id("name")} className={styles.label}>
                      Nom et prénom{" "}
                      <span className={styles.requiredMark} aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      ref={(el) => {
                        fieldRefs.current.name = el;
                      }}
                      id={id("name")}
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={styles.input}
                      required
                      aria-required="true"
                      aria-invalid={errors.name ? "true" : undefined}
                      aria-describedby={describedBy("name")}
                      onBlur={() => revalidateField("name")}
                    />
                    {errors.name && (
                      <p id={errId("name")} className={styles.fieldError}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor={id("phone")} className={styles.label}>
                      Téléphone
                    </label>
                    <input
                      ref={(el) => {
                        fieldRefs.current.phone = el;
                      }}
                      id={id("phone")}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      className={styles.input}
                      aria-invalid={errors.phone ? "true" : undefined}
                      aria-describedby={describedBy("phone")}
                      onBlur={() => revalidateField("phone")}
                    />
                    {errors.phone && (
                      <p id={errId("phone")} className={styles.fieldError}>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor={id("email")} className={styles.label}>
                    Email{" "}
                    <span className={styles.requiredMark} aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    ref={(el) => {
                      fieldRefs.current.email = el;
                    }}
                    id={id("email")}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    className={styles.input}
                    required
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : undefined}
                    aria-describedby={describedBy("email")}
                    onBlur={() => revalidateField("email")}
                  />
                  {errors.email && (
                    <p id={errId("email")} className={styles.fieldError}>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor={id("message")} className={styles.label}>
                    Votre message{" "}
                    <span className={styles.requiredMark} aria-hidden="true">
                      *
                    </span>
                  </label>
                  <textarea
                    ref={(el) => {
                      fieldRefs.current.message = el;
                    }}
                    id={id("message")}
                    name="message"
                    rows={5}
                    className={styles.textarea}
                    required
                    aria-required="true"
                    aria-invalid={errors.message ? "true" : undefined}
                    aria-describedby={describedBy("message")}
                    onBlur={() => revalidateField("message")}
                  />
                  {errors.message && (
                    <p id={errId("message")} className={styles.fieldError}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Anti-spam : honeypot Web3Forms, retiré du parcours clavier et des AT */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className={styles.honeypot}
                  aria-hidden="true"
                />

                <div className={styles.field}>
                  <label className={styles.consent}>
                    <input
                      ref={(el) => {
                        fieldRefs.current.consent = el;
                      }}
                      id={id("consent")}
                      type="checkbox"
                      name="consent"
                      className={styles.consentBox}
                      required
                      aria-required="true"
                      aria-invalid={errors.consent ? "true" : undefined}
                      aria-describedby={describedBy("consent")}
                      onChange={() => revalidateField("consent")}
                    />
                    <span>
                      J'accepte que mes informations soient utilisées pour être recontacté(e). Elles
                      restent strictement confidentielles.{" "}
                      <span className={styles.requiredMark} aria-hidden="true">
                        *
                      </span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p id={errId("consent")} className={styles.fieldError}>
                      {errors.consent}
                    </p>
                  )}
                </div>

                <button type="submit" className={styles.submit} disabled={status === "sending"}>
                  {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
                  {status !== "sending" && (
                    <ArrowRight size={18} aria-hidden="true" focusable="false" />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useId, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Check,
  Clock,
  Video,
  BadgeEuro,
  AlertTriangle,
} from "lucide-react";
import { sendContact } from "../../lib/sendContact";
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

const CONTACT_EMAIL = "contact@sbc-capitalgestion.com";

type Status = "idle" | "sending" | "success" | "error";
type FieldName = "name" | "email" | "phone" | "subject" | "message" | "consent";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sujets proposés : évite au visiteur d'avoir à formuler sa demande de zéro
const SUBJECTS = [
  "Préparer ma retraite",
  "Investir mon épargne",
  "Investir dans l'immobilier",
  "Réduire mes impôts",
  "Protéger mes proches",
  "Organiser ma transmission",
  "Ma situation de frontalier",
  "Autre / je ne sais pas encore",
];

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

  if (!values.subject.trim()) {
    errors.subject = "Veuillez indiquer le sujet de votre demande.";
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
        subject: String(fd.get("subject") ?? ""),
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
    const order: FieldName[] = ["name", "email", "phone", "subject", "message", "consent"];
    const firstError = order.find((f) => nextErrors[f]);
    if (firstError) {
      fieldRefs.current[firstError]?.focus();
      return;
    }

    setStatus("sending");

    try {
      await sendContact({
        name: values.name,
        email: values.email,
        phone: values.phone,
        subject: values.subject,
        message: values.message,
      });

      setStatus("success");
      form.reset();
      setErrors({});
      setSubmitAttempted(false);
      // Déplace le focus sur la confirmation pour les lecteurs d'écran
      requestAnimationFrame(() => statusRef.current?.focus());
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

          {/* Lever les incertitudes sur le premier rendez-vous avant le formulaire */}
          <ul className={styles.expectations}>
            <li className={styles.expectation}>
              <span className={styles.expectationIcon} aria-hidden="true">
                <Clock size={16} strokeWidth={1.7} />
              </span>
              Environ 30 minutes
            </li>
            <li className={styles.expectation}>
              <span className={styles.expectationIcon} aria-hidden="true">
                <Video size={16} strokeWidth={1.7} />
              </span>
              En visioconférence, par téléphone ou sur rendez-vous
            </li>
            <li className={styles.expectation}>
              <span className={styles.expectationIcon} aria-hidden="true">
                <BadgeEuro size={16} strokeWidth={1.7} />
              </span>
              Gratuit et sans engagement
            </li>
          </ul>
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

            {/* Rappel du format, à l'endroit où la colonne restait vide */}
            <p className={styles.infoNote}>
              <strong>Le premier rendez-vous</strong>
              Environ 30 minutes, en visioconférence ou par téléphone. Gratuit et sans engagement :
              il sert à comprendre votre situation, pas à vous vendre quoi que ce soit.
            </p>

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
              {/* L'échec d'envoi n'affichait rien : le visiteur pouvait croire
                  sa demande partie alors qu'elle était perdue. */}
              {status === "error" && (
                <div className={styles.errorBox} role="alert">
                  <span className={styles.errorIcon} aria-hidden="true">
                    <AlertTriangle size={18} strokeWidth={1.9} />
                  </span>
                  <p className={styles.errorText}>
                    L'envoi n'a pas abouti. Vous pouvez réessayer, ou joindre directement
                    Béatrice Sem au{" "}
                    <a href="tel:+33743669193">07 43 66 91 93</a> ou à{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
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

                <fieldset className={styles.field}>
                  <legend className={styles.label}>
                    Votre demande porte sur{" "}
                    <span className={styles.requiredMark} aria-hidden="true">
                      *
                    </span>
                  </legend>
                  <div
                    className={styles.subjectGrid}
                    ref={(el) => {
                      fieldRefs.current.subject = el?.querySelector("input") ?? null;
                    }}
                    aria-describedby={describedBy("subject")}
                  >
                    {SUBJECTS.map((subject) => (
                      <label key={subject} className={styles.subjectOption}>
                        <input
                          type="radio"
                          name="subject"
                          value={subject}
                          className={styles.subjectInput}
                          onChange={() => revalidateField("subject")}
                        />
                        <span className={styles.subjectLabel}>{subject}</span>
                      </label>
                    ))}
                  </div>
                  {errors.subject && (
                    <p id={errId("subject")} className={styles.fieldError}>
                      {errors.subject}
                    </p>
                  )}
                </fieldset>

                <div className={styles.field}>
                  <label htmlFor={id("message")} className={styles.label}>
                    Précisions <span className={styles.optionalMark}>(facultatif)</span>
                  </label>
                  <textarea
                    ref={(el) => {
                      fieldRefs.current.message = el;
                    }}
                    id={id("message")}
                    name="message"
                    rows={4}
                    className={styles.textarea}
                    placeholder="Quelques mots sur votre situation, si vous le souhaitez."
                  />
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

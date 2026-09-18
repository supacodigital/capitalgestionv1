/**
 * Point d'entrée unique pour l'envoi du formulaire de contact.
 *
 * Aujourd'hui : Web3Forms, appelé directement depuis le navigateur.
 * À terme : un endpoint POST /api/contact servi par le backend Express du
 * VPS, qui relaiera vers Resend — la clé API ne pouvant pas vivre dans le
 * bundle. Seul ce fichier aura alors à changer.
 */

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const WEB3FORMS_KEY = "b62d561b-906c-4f35-8bbf-e495c429ce72";

export async function sendContact(payload: ContactPayload): Promise<void> {
  const body = new FormData();
  body.append("access_key", WEB3FORMS_KEY);
  body.append("from_name", "Site S Capital Gestion");
  body.append("subject", `Nouvelle demande — ${payload.subject}`);
  body.append("name", payload.name);
  body.append("email", payload.email);
  body.append("phone", payload.phone);
  body.append("message", payload.message);

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body,
  });

  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error("Envoi refusé par le service de messagerie");
  }
}

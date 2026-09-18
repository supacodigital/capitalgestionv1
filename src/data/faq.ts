// Source unique des questions fréquentes : alimente la section FAQ et le JSON-LD FAQPage
export type FaqEntry = { question: string; answer: string };

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    question: "Qu'est-ce qu'un conseiller en gestion de patrimoine indépendant ?",
    answer:
      "C'est un professionnel qui vous accompagne dans l'ensemble de vos décisions patrimoniales — placements, immobilier, retraite, prévoyance, fiscalité et transmission — sans être lié à un réseau bancaire. Les recommandations reposent uniquement sur votre intérêt, avec un large choix de solutions du marché.",
  },
  {
    question: "En quoi votre conseil diffère-t-il de celui de ma banque ?",
    answer:
      "Une banque distribue avant tout ses propres produits. En tant qu'indépendante, je compare les offres de nombreux partenaires (assureurs, sociétés de gestion, promoteurs) pour retenir celles qui correspondent le mieux à votre profil, votre horizon et votre fiscalité.",
  },
  {
    question: "Comment êtes-vous rémunérée ?",
    answer:
      "La rémunération peut prendre la forme d'honoraires de conseil, de commissions versées par les partenaires sur les solutions souscrites, ou d'une combinaison des deux. Le mode de rémunération vous est présenté en toute transparence avant tout engagement.",
  },
  {
    question: "Accompagnez-vous les frontaliers et les résidents suisses ?",
    answer:
      "Oui. J'interviens dans tout le bassin franco-genevois — Pays de Gex, Lyon, Genève — et je connais les problématiques propres aux frontaliers : fiscalité transfrontalière, prévoyance, épargne dans les deux pays et préparation de la retraite.",
  },
  {
    question: "Comment se déroule un premier rendez-vous ?",
    answer:
      "Le premier échange est sans engagement. Il sert à comprendre votre situation, vos objectifs et vos projets. Je vous présente ensuite ma méthode et, si vous le souhaitez, nous engageons une analyse complète de votre patrimoine.",
  },
  {
    question: "Faut-il disposer d'un patrimoine important pour vous consulter ?",
    answer:
      "Non. L'accompagnement s'adresse aussi bien aux personnes qui commencent à structurer leur épargne qu'à celles disposant déjà d'un patrimoine constitué. L'essentiel est d'avoir un projet et l'envie d'être conseillé.",
  },
  {
    question: "Mes informations restent-elles confidentielles ?",
    answer:
      "Absolument. La discrétion est au cœur de la relation. Vos données personnelles et patrimoniales sont traitées de manière strictement confidentielle et ne sont jamais transmises à des tiers sans votre accord.",
  },
];

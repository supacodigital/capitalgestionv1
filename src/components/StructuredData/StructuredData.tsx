import { useEffect } from "react";

type Props = {
  /** Identifiant du script, pour éviter les doublons au remontage */
  id: string;
  data: Record<string, unknown>;
};

/**
 * Injecte un bloc JSON-LD dans le <head> et le retire au démontage.
 * Les données sont sérialisées côté client : les robots qui exécutent le JS
 * (Google, Bing) les lisent normalement.
 */
export default function StructuredData({ id, data }: Props) {
  useEffect(() => {
    let script = document.getElementById(id) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, [id, data]);

  return null;
}

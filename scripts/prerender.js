// Prérendu statique des routes après le build.
// Objectif : livrer aux robots (moteurs de recherche et IA) un HTML complet
// plutôt qu'une coquille vide, sans dépendre de l'exécution du JavaScript.

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
import { build } from "vite";

const root = path.dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "node_modules/.prerender");

// Routes à prérendre — à compléter si de nouvelles pages sont ajoutées
const ROUTES = ["/", "/devenir-conseiller", "/mentions-legales"];

async function main() {
  // 1. Compiler l'entrée serveur dans un bundle Node isolé
  await build({
    root,
    logLevel: "warn",
    build: {
      ssr: path.join(root, "src/entry-server.tsx"),
      outDir: path.relative(root, ssrDir),
      emptyOutDir: true,
      copyPublicDir: false,
    },
  });

  const { render } = await import(path.join(ssrDir, "entry-server.js"));

  // 2. Injecter le HTML rendu dans le template produit par le build client
  const template = await fs.readFile(path.join(distDir, "index.html"), "utf-8");

  for (const route of ROUTES) {
    const html = render(route);
    const page = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    const outPath =
      route === "/"
        ? path.join(distDir, "index.html")
        : path.join(distDir, route.replace(/^\//, ""), "index.html");

    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, page, "utf-8");

    const chars = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
    console.log(`  prérendu ${route.padEnd(20)} ${chars} caractères de texte`);
  }

  // 3. Nettoyer le bundle serveur temporaire
  await fs.rm(ssrDir, { recursive: true, force: true });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

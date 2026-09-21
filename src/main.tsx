import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Polices auto-hébergées : le CDN Google transmettait l'IP du visiteur
// sans son consentement (RGPD). Plus aucun appel tiers au chargement.
// Graisses limitées à celles réellement utilisées par le site.
import '@fontsource/playfair-display/latin-500.css'
import '@fontsource/playfair-display/latin-600.css'
import '@fontsource/playfair-display/latin-700.css'
import '@fontsource/playfair-display/latin-500-italic.css'
import '@fontsource/playfair-display/latin-600-italic.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

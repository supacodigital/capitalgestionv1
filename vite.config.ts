import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Cible explicite : sans elle, le compilateur CSS n'émettait que
    // -webkit-backdrop-filter et le flou du header restait sans effet
    cssTarget: ['chrome107', 'edge107', 'firefox104', 'safari16'],
    rolldownOptions: {
      output: {
        // Sépare les grosses dépendances du code applicatif : elles changent
        // rarement et restent ainsi en cache navigateur entre deux déploiements
        advancedChunks: {
          groups: [
            { name: 'react-vendor', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: 'gsap', test: /node_modules[\\/]gsap[\\/]/ },
            { name: 'motion', test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/ },
            { name: 'router', test: /node_modules[\\/]react-router/ },
          ],
        },
      },
    },
  },
})

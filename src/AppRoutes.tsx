import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MobileCta from "./components/MobileCta/MobileCta";
import Home from "./pages/Home";
import LegalNotice from "./pages/LegalNotice";
import Recruitment from "./pages/Recruitment";

/**
 * Arbre applicatif sans routeur — partagé entre le rendu client
 * (BrowserRouter dans App) et le prérendu statique (StaticRouter).
 */
export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devenir-conseiller" element={<Recruitment />} />
          <Route path="/mentions-legales" element={<LegalNotice />} />
        </Routes>
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}

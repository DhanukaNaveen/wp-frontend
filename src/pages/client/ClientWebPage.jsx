// src/pages/client/ClientWebPage.jsx
import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Home from "../Home";
import Portfolio from "../Portfolio";
import About from "../About";
import Contact from "../Contact";
import Testimonials from "../Testimonials";
import NotFound from "../NotFound";

export default function ClientWebPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-primary text-secondary">
      <Header />
      <main className="flex-grow  mx-auto w-full"> {/* Improved Layout */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
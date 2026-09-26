import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { WhyAxa } from "./components/WhyAxa";
import { Process } from "./components/Process";
import { Projects } from "./components/Projects";
import { ServiceArea } from "./components/ServiceArea";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function App() {
  const [selectedContactService, setSelectedContactService] = useState<string>("climatizacion");

  const scrollToContact = (prefilledService?: string) => {
    if (prefilledService) {
      const lower = prefilledService.toLowerCase();
      if (lower.includes("clima")) {
        setSelectedContactService("climatizacion");
      } else if (lower.includes("electr")) {
        setSelectedContactService("electricidad");
      } else if (lower.includes("fontan")) {
        setSelectedContactService("fontaneria");
      }
    }
    const el = document.getElementById("contacto");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById("servicios");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15182b] selection:bg-[#0B116B] selection:text-white">
      {/* 1. Global Navigation */}
      <Navbar onContactClick={() => scrollToContact()} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onQuoteClick={() => scrollToContact()}
          onServicesClick={scrollToServices}
        />

        {/* 3. Services & Service Selector */}
        <Services
          onQuoteForService={(serviceTitle) => scrollToContact(serviceTitle)}
        />

        {/* 4. Why Instalaciones AXA */}
        <WhyAxa />

        {/* 5. How It Works */}
        <Process />

        {/* 6. Projects / Gallery */}
        <Projects />

        {/* 7. Service Area (Tarragona) */}
        <ServiceArea />

        {/* 8. FAQ */}
        <FAQ />

        {/* 9. Contact Section */}
        <Contact initialService={selectedContactService} />

        {/* 10. Final CTA */}
        <FinalCTA
          onQuoteClick={() => scrollToContact()}
          onServicesClick={scrollToServices}
        />
      </main>

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}

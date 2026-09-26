import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { AxaLogo } from "./AxaLogo";

interface NavbarProps {
  onContactClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#servicios" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Zonas", href: "#zonas" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    if (onContactClick) {
      onContactClick();
    } else {
      const element = document.querySelector("#contacto");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] transition-all">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#inicio"
          className="flex items-center gap-2 shrink-0 py-1 focus-visible:ring-2 focus-visible:ring-[#0B116B] rounded-lg"
          aria-label="Instalaciones AXA - Inicio"
        >
          <AxaLogo />
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8 text-[15px] font-medium text-[#15182b]"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="text-[#626779] hover:text-[#0B116B] transition-colors whitespace-nowrap py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0B116B] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCtaClick}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-[14px] font-semibold text-white bg-[#0B116B] hover:bg-[#080d52] active:scale-[0.98] transition-all shadow-sm whitespace-nowrap cursor-pointer"
          >
            Solicitar presupuesto
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-[#15182b] hover:bg-[#f5f6fa] focus-visible:ring-2 focus-visible:ring-[#0B116B]"
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e5e7eb] bg-white px-4 pt-3 pb-6 shadow-xl">
          <nav className="flex flex-col space-y-2" aria-label="Menú móvil">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-3 py-2.5 rounded-lg text-[16px] font-medium text-[#15182b] hover:bg-[#f2f4ff] hover:text-[#0B116B] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-[15px] font-semibold text-white bg-[#0B116B] hover:bg-[#080d52] active:scale-[0.98] transition-all"
              >
                Solicitar presupuesto
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

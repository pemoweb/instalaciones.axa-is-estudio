import React from "react";
import { AxaLogo } from "./AxaLogo";
import { business } from "../data/business";
import { Instagram } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#101438] text-white pt-16 pb-12 border-t border-[#1e245c]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Core Services */}
          <div>
            <div className="mb-5">
              <AxaLogo variant="white" />
            </div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#a5adc8] font-bold mb-3">
              Especialidades
            </p>
            <ul className="space-y-2 text-sm text-[#cbd2e8]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#servicio-climatizacion")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Climatización
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#servicio-electricidad")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Electricidad
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#servicio-fontaneria")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Fontanería
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Web Navigation */}
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#a5adc8] font-bold mb-4">
              Web
            </p>
            <ul className="space-y-2.5 text-sm text-[#cbd2e8]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#inicio")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#servicios")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#nosotros")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Nosotros
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#proyectos")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Proyectos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#zonas")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Zonas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#faq")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("#contacto")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Location */}
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#a5adc8] font-bold mb-4">
              Ubicación
            </p>
            <address className="not-italic text-sm text-[#cbd2e8] space-y-1 leading-relaxed">
              <p className="font-semibold text-white">INSTALACIONES AXA</p>
              <p>{business.location.street}</p>
              <p>
                {business.location.postalCode} {business.location.city}
              </p>
              <p>{business.location.country}</p>
            </address>
          </div>

          {/* Column 4: Follow Us (Instagram) */}
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#a5adc8] font-bold mb-4">
              Síguenos
            </p>
            <div className="space-y-3">
              <span className="text-xs text-[#a5adc8] block">Instagram</span>
              <a
                href={business.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors"
                aria-label="Seguir a Instalaciones AXA en Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
                <span>{business.social.instagram.handle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a5adc8]">
          <p>© 2026 Instalaciones AXA. Todos los derechos reservados.</p>
          <p className="text-[11px] text-[#7882a4]">
            Tarragona · Climatización, Electricidad y Fontanería
          </p>
        </div>
      </div>
    </footer>
  );
};

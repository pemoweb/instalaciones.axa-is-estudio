import React from "react";
import { Check, ArrowDown, ChevronRight } from "lucide-react";

interface HeroProps {
  onQuoteClick: () => void;
  onServicesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, onServicesClick }) => {
  const confirmedTrustPoints = [
    "Climatización",
    "Electricidad",
    "Fontanería",
    "Tarragona",
  ];

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-white pt-8 pb-16 md:pt-14 md:pb-24 lg:min-h-[660px] flex items-center"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            {/* Eyebrow */}
            <div className="mb-4">
              <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#0B116B]">
                INSTALACIONES AXA · TARRAGONA
              </span>
            </div>

            {/* Primary H1 */}
            <h1
              className="text-[#15182b] font-extrabold text-[36px] sm:text-[46px] lg:text-[56px] leading-[1.08] tracking-[-0.03em] max-w-2xl text-balance"
              style={{ fontFamily: "'Figtree', sans-serif" }}
            >
              Soluciones profesionales en climatización, electricidad y fontanería.
            </h1>

            {/* Supporting Copy */}
            <p className="mt-5 text-[17px] sm:text-[18px] text-[#626779] leading-[1.65] max-w-xl">
              Servicios de climatización, electricidad y fontanería para hogares,
              comercios y espacios profesionales en Tarragona.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-[16px] font-semibold text-white bg-[#0B116B] hover:bg-[#080d52] active:scale-[0.98] transition-all shadow-md hover:shadow-lg cursor-pointer text-center"
              >
                Solicitar presupuesto
              </button>

              <button
                type="button"
                onClick={onServicesClick}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-[16px] font-semibold text-[#15182b] bg-[#f5f6fa] hover:bg-[#e9ecf5] hover:text-[#0B116B] active:scale-[0.98] transition-all border border-[#e5e7eb] cursor-pointer text-center group"
              >
                <span>Ver servicios</span>
                <ChevronRight className="w-4 h-4 ml-1.5 text-[#626779] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Confirmed Hero Trust Points */}
            <div className="mt-10 pt-7 border-t border-[#e5e7eb]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {confirmedTrustPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-2 text-[14px] font-semibold text-[#15182b]"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#f2f4ff] flex items-center justify-center shrink-0 text-[#0B116B]">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="truncate">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#e5e7eb] bg-[#f5f6fa]">
              <img
                src="/src/assets/images/hero_climatizacion_installation_1790433981227.jpg"
                alt="Técnico profesional de instalaciones en Tarragona"
                className="w-full h-[320px] sm:h-[400px] lg:h-[480px] object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                loading="eager"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback container if image cannot be rendered
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = target.parentElement?.querySelector(".img-fallback");
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              {/* Resilient fallback if image fails */}
              <div className="img-fallback hidden w-full h-[320px] sm:h-[400px] lg:h-[480px] bg-[#f2f4ff] flex flex-col items-center justify-center p-8 text-center">
                <span className="text-sm font-bold uppercase tracking-wider text-[#0B116B]">
                  Instalaciones AXA
                </span>
                <p className="mt-2 text-base font-semibold text-[#15182b]">
                  Climatización · Electricidad · Fontanería en Tarragona
                </p>
              </div>

              {/* Subdued location badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-[#e5e7eb] rounded-lg px-3 py-1.5 shadow-sm text-xs font-semibold text-[#15182b] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0B116B]"></span>
                <span>Tarragona, España</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

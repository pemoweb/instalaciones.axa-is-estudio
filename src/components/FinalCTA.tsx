import React from "react";
import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onQuoteClick: () => void;
  onServicesClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onQuoteClick,
  onServicesClick,
}) => {
  return (
    <section className="bg-[#0B116B] text-white py-20 relative overflow-hidden">
      {/* Background subtle geometric accents matching the AXA triad */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,0 100,0 50,100" fill="#ffffff" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#e0e3f5]">
            Instalaciones AXA · Tarragona
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            ¿Tienes una instalación pendiente?
          </h2>

          <p className="mt-5 text-[17px] sm:text-[19px] text-[#e0e3f5] leading-relaxed max-w-2xl mx-auto">
            Cuéntanos qué necesitas y descubre cómo podemos ayudarte en climatización, electricidad o fontanería.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onQuoteClick}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-[16px] font-bold text-[#0B116B] bg-white hover:bg-[#f5f6fa] active:scale-[0.98] transition-all shadow-lg cursor-pointer"
            >
              Solicitar presupuesto
            </button>

            <button
              type="button"
              onClick={onServicesClick}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl text-[16px] font-semibold text-white bg-white/10 hover:bg-white/20 active:scale-[0.98] transition-all border border-white/20 cursor-pointer group"
            >
              <span>Ver servicios</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

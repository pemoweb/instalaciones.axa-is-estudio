import React from "react";
import { UserCheck, Sliders, ShieldCheck, MapPin } from "lucide-react";
import { useCardReveal } from "../hooks/useCardReveal";

export const WhyAxa: React.FC = () => {
  const { containerRef, revealedIndices } = useCardReveal({
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
  });

  const values = [
    {
      index: "01",
      title: "Atención personalizada",
      description:
        "Escuchamos tus necesidades concretas para ofrecer una respuesta adaptada y directa, con un trato claro y profesional en cada fase.",
      icon: UserCheck,
    },
    {
      index: "02",
      title: "Soluciones adaptadas a cada espacio",
      description:
        "Cada vivienda, local o instalación presenta condiciones únicas. Estudiamos las particularidades del espacio para garantizar el mejor resultado.",
      icon: Sliders,
    },
    {
      index: "03",
      title: "Especialización técnica",
      description:
        "Criterio técnico riguroso en climatización, electricidad y fontanería, cuidando los estándares de seguridad y la calidad de los acabados.",
      icon: ShieldCheck,
    },
    {
      index: "04",
      title: "Servicio cercano en Tarragona",
      description:
        "Presencia e implicación directa en Tarragona, facilitando la comunicación constante y el seguimiento de cada intervención.",
      icon: MapPin,
    },
  ];

  return (
    <section id="nosotros" className="py-20 bg-white border-y border-[#e5e7eb] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#0B116B]">
            Nuestra filosofía
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#15182b] tracking-tight">
            Una solución profesional para cada instalación.
          </h2>
          <p className="mt-4 text-[17px] text-[#626779] leading-relaxed">
            Metodología de trabajo fundamentada en el rigor técnico, la cercanía y la adaptación a cada proyecto.
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {values.map((val, idx) => {
            const isRevealed = revealedIndices.has(idx);
            const Icon = val.icon;
            return (
              <div
                key={val.index}
                data-reveal-card
                data-index={idx}
                style={{
                  transitionDelay: `${(idx % 4) * 90}ms`,
                }}
                className={`rounded-2xl p-7 bg-[#f5f6fa]/60 border border-[#e5e7eb] hover:border-[#0B116B] flex flex-col justify-between group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isRevealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 pointer-events-none"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-sm font-bold text-[#0B116B] font-mono">
                      {val.index}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#e5e7eb] text-[#0B116B] flex items-center justify-center group-hover:bg-[#0B116B] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#15182b] tracking-tight mb-2.5">
                    {val.title}
                  </h3>

                  <p className="text-[15px] text-[#626779] leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#e5e7eb]/60 text-xs font-semibold text-[#0B116B]">
                  Instalaciones AXA
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

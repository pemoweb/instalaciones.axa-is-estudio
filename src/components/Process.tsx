import React from "react";
import { MessageSquare, ClipboardCheck, FileCheck, Wrench } from "lucide-react";
import { useCardReveal } from "../hooks/useCardReveal";

export const Process: React.FC = () => {
  const { containerRef, revealedIndices } = useCardReveal({
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
  });

  const steps = [
    {
      number: "01",
      title: "Cuéntanos qué necesitas",
      description: "Contacta con Instalaciones AXA y explícanos qué necesitas.",
      icon: MessageSquare,
    },
    {
      number: "02",
      title: "Valoramos la instalación",
      description: "Analizamos las necesidades del trabajo y buscamos la solución adecuada.",
      icon: ClipboardCheck,
    },
    {
      number: "03",
      title: "Te presentamos la solución",
      description: "Te explicamos el trabajo necesario antes de realizarlo.",
      icon: FileCheck,
    },
    {
      number: "04",
      title: "Realizamos el trabajo",
      description: "Ejecutamos la instalación o servicio acordado.",
      icon: Wrench,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#0B116B]">
            Paso a paso
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#15182b] tracking-tight">
            Cómo trabajamos
          </h2>
          <p className="mt-4 text-[17px] text-[#626779] leading-relaxed">
            Un proceso claro y transparente desde el primer contacto hasta la finalización de la instalación.
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative"
        >
          {steps.map((step, idx) => {
            const isRevealed = revealedIndices.has(idx);
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                data-reveal-card
                data-index={idx}
                style={{
                  transitionDelay: `${(idx % 4) * 90}ms`,
                }}
                className={`relative rounded-2xl p-7 bg-[#f5f6fa]/70 border border-[#e5e7eb] flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isRevealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 pointer-events-none"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-[#0B116B] font-mono">
                      {step.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-white border border-[#e5e7eb] text-[#0B116B] flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#15182b] tracking-tight mb-2">
                    {step.title}
                  </h3>

                  <p className="text-[15px] text-[#626779] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#e5e7eb]/80 text-xs font-semibold text-[#626779]">
                  Paso {idx + 1} de 4
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

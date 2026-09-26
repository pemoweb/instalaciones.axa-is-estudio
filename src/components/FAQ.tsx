import React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "../data/faq";

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-20 bg-[#f5f6fa]/60 border-t border-[#e5e7eb] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#0B116B]">
            Dudas habituales
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#15182b] tracking-tight">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-[17px] text-[#626779] leading-relaxed">
            Respuestas a las consultas más comunes sobre nuestros servicios e instalaciones.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group bg-white rounded-2xl border border-[#e5e7eb] p-6 transition-all duration-200 open:shadow-sm open:border-[#0B116B]/50"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none select-none font-bold text-lg text-[#15182b] group-open:text-[#0B116B] transition-colors focus-visible:outline-none">
                <span className="pr-4">{faq.question}</span>
                <span className="w-8 h-8 rounded-full bg-[#f2f4ff] text-[#0B116B] flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-200">
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-[#f5f6fa] text-[16px] text-[#626779] leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

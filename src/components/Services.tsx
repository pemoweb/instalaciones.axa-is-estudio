import React, { useState } from "react";
import { Snowflake, Zap, Droplets, Check, ArrowRight } from "lucide-react";
import { services, ServiceItem } from "../data/services";
import { ServiceSelector } from "./ServiceSelector";

interface ServicesProps {
  onQuoteForService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onQuoteForService }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);

  const iconMap = {
    Snowflake: Snowflake,
    Zap: Zap,
    Droplets: Droplets,
  };

  const handleSelectService = (id: "climatizacion" | "electricidad" | "fontaneria") => {
    setSelectedService(id);
    const targetElement = document.getElementById(`servicio-${id}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      setHighlightedSection(id);
      setTimeout(() => {
        setHighlightedSection(null);
      }, 1200);
    }
  };

  return (
    <section id="servicios" className="py-20 bg-[#f5f6fa]/60 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#0B116B]">
            Nuestros servicios
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#15182b] tracking-tight">
            ¿En qué podemos ayudarte?
          </h2>
          <p className="mt-4 text-[17px] text-[#626779] leading-relaxed">
            Soluciones profesionales de climatización, electricidad y fontanería.
          </p>
        </div>

        {/* 3 Primary Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {services.map((service) => {
            const IconComponent = iconMap[service.iconName];
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-13 h-13 rounded-xl bg-[#f2f4ff] text-[#0B116B] flex items-center justify-center mb-6">
                    <IconComponent className="w-7 h-7 stroke-[2]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#15182b] tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[16px] text-[#626779] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#f5f6fa]">
                  <button
                    type="button"
                    onClick={() => handleSelectService(service.id)}
                    className="inline-flex items-center text-[15px] font-semibold text-[#0B116B] hover:text-[#080d52] group cursor-pointer"
                  >
                    <span>Ver servicio</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Service Selector */}
        <div className="my-16 p-6 sm:p-10 rounded-2xl bg-white border border-[#e5e7eb] shadow-sm">
          <ServiceSelector
            selectedService={selectedService}
            onSelectService={handleSelectService}
          />
        </div>

        {/* Detailed Services Sections */}
        <div className="space-y-16 mt-20">
          <div className="text-center mb-10">
            <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0B116B]">
              Detalle de especialidades
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#15182b] tracking-tight mt-1">
              Servicios en detalle
            </h3>
          </div>

          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName];
            const isHighlighted = highlightedSection === service.id;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={service.id}
                id={`servicio-${service.id}`}
                className={`scroll-mt-28 rounded-3xl p-6 sm:p-10 transition-all duration-500 border ${
                  isHighlighted
                    ? "bg-[#f2f4ff] border-[#0B116B] ring-2 ring-[#0B116B] shadow-lg"
                    : "bg-white border-[#e5e7eb] shadow-sm"
                }`}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Text & Features Column */}
                  <div
                    className={`lg:col-span-7 ${
                      isReversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#f2f4ff] text-[#0B116B] text-xs font-bold uppercase tracking-wider mb-4">
                      <IconComponent className="w-4 h-4" />
                      <span>Especialidad técnica</span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-extrabold text-[#15182b] tracking-tight">
                      {service.title}
                    </h4>

                    <p className="mt-3 text-[16px] sm:text-[17px] text-[#626779] leading-relaxed">
                      {service.details}
                    </p>

                    {/* Features list */}
                    <div className="mt-6 space-y-3">
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#15182b]">
                        Áreas de actuación:
                      </p>
                      {service.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#f2f4ff] text-[#0B116B] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                          <span className="text-[15px] text-[#15182b] font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-8 pt-6 border-t border-[#e5e7eb]/80">
                      <button
                        type="button"
                        onClick={() => onQuoteForService(service.title)}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-[15px] font-semibold text-white bg-[#0B116B] hover:bg-[#080d52] active:scale-[0.98] transition-all cursor-pointer shadow-sm"
                      >
                        <span>Solicitar presupuesto para {service.title}</span>
                      </button>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div
                    className={`lg:col-span-5 ${
                      isReversed ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative rounded-2xl overflow-hidden border border-[#e5e7eb] shadow-md bg-[#f5f6fa] aspect-[4/3]">
                      <img
                        src={service.image}
                        alt={service.alt}
                        className="w-full h-full object-cover object-center hover:scale-[1.02] transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs font-semibold text-[#0B116B] border border-[#e5e7eb] shadow-xs">
                        Tarragona
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

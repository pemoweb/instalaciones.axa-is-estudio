import React from "react";
import { Snowflake, Zap, Droplets } from "lucide-react";

interface ServiceSelectorProps {
  selectedService: string | null;
  onSelectService: (id: "climatizacion" | "electricidad" | "fontaneria") => void;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  selectedService,
  onSelectService,
}) => {
  const options = [
    {
      id: "climatizacion" as const,
      title: "Climatización",
      subtitle: "Aire acondicionado y climatización",
      icon: Snowflake,
    },
    {
      id: "electricidad" as const,
      title: "Electricidad",
      subtitle: "Instalaciones y cuadros eléctricos",
      icon: Zap,
    },
    {
      id: "fontaneria" as const,
      title: "Fontanería",
      subtitle: "Redes y soluciones hidrosanitarias",
      icon: Droplets,
    },
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0B116B]">
          Selección rápida
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#15182b] tracking-tight mt-1">
          ¿Qué necesitas?
        </h3>
        <p className="text-sm text-[#626779] mt-2">
          Selecciona una especialidad para ver sus detalles técnicos y opciones.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedService === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectService(opt.id)}
              className={`rounded-2xl border p-6 text-left transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B116B] ${
                isSelected
                  ? "border-[#0B116B] bg-[#f2f4ff] shadow-lg -translate-y-1 ring-1 ring-[#0B116B]"
                  : "border-[#e5e7eb] bg-white hover:border-[#0B116B] hover:shadow-sm"
              }`}
              aria-pressed={isSelected}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  isSelected
                    ? "bg-[#0B116B] text-white"
                    : "bg-[#f2f4ff] text-[#0B116B]"
                }`}
              >
                <Icon className="w-6 h-6 stroke-[2]" />
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-bold text-[#15182b] tracking-tight">
                  {opt.title}
                </h4>
                <p className="text-xs text-[#626779] mt-1 leading-relaxed">
                  {opt.subtitle}
                </p>
              </div>

              <div className="mt-4 flex items-center text-xs font-semibold text-[#0B116B]">
                <span>{isSelected ? "Seleccionado" : "Ver especialidad"}</span>
                <span className="ml-1" aria-hidden="true">→</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

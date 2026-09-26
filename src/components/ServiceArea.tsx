import React from "react";
import { MapPin, Navigation, Compass } from "lucide-react";
import { business } from "../data/business";

export const ServiceArea: React.FC = () => {
  return (
    <section id="zonas" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#0B116B]">
            Ubicación y cobertura
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#15182b] tracking-tight">
            Trabajamos en Tarragona
          </h2>
          <p className="mt-4 text-[17px] text-[#626779] leading-relaxed">
            Servicio profesional de proximidad para instalaciones residenciales y comerciales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Information Card */}
          <div className="lg:col-span-6 bg-[#f5f6fa]/70 border border-[#e5e7eb] rounded-3xl p-8 sm:p-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f2f4ff] text-[#0B116B] text-xs font-bold uppercase tracking-wider mb-6">
              <MapPin className="w-4 h-4" />
              <span>Sede de operaciones</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#15182b] tracking-tight">
              Instalaciones AXA en Tarragona
            </h3>

            <p className="mt-4 text-[16px] text-[#626779] leading-relaxed">
              Ubicados en el eje principal de la ciudad, en Rambla Nova 124. Desde
              esta base técnica coordinamos todas las intervenciones de
              climatización, electricidad y fontanería en el municipio de Tarragona.
            </p>

            <div className="mt-8 pt-6 border-t border-[#e5e7eb] space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#e5e7eb] text-[#0B116B] flex items-center justify-center shrink-0 mt-0.5">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#626779]">
                    Dirección postal
                  </span>
                  <p className="text-[15px] font-semibold text-[#15182b] mt-0.5">
                    {business.location.street}
                  </p>
                  <p className="text-[14px] text-[#626779]">
                    {business.location.postalCode} {business.location.city}, {business.location.country}
                  </p>
                </div>
              </div>
            </div>

            {/* If additional municipalities are confirmed later, render them conditionally */}
            {business.serviceAreasExtra.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#e5e7eb]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#626779] block mb-3">
                  Localidades adicionales confirmadas
                </span>
                <div className="flex flex-wrap gap-2">
                  {business.serviceAreasExtra.map((town) => (
                    <span
                      key={town}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#e5e7eb] text-[#15182b]"
                    >
                      {town}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clean stylized map card of Tarragona & Rambla Nova */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#e5e7eb] shadow-md bg-[#f2f4ff] p-8 sm:p-12 flex flex-col justify-between min-h-[380px]">
              {/* Compass indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B116B]">
                  <Compass className="w-4 h-4" />
                  <span>Área de cobertura activa</span>
                </div>
                <span className="text-xs font-medium text-[#626779]">
                  43001 Tarragona
                </span>
              </div>

              {/* Graphic map pin marker */}
              <div className="my-8 text-center">
                <div className="inline-flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#0B116B] text-white flex items-center justify-center shadow-xl animate-pulse">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div className="mt-4 bg-white/95 backdrop-blur-xs border border-[#e5e7eb] rounded-xl px-5 py-2.5 shadow-md">
                    <span className="text-sm font-extrabold text-[#0B116B] block">
                      Rambla Nova 124
                    </span>
                    <span className="text-xs text-[#626779]">
                      Tarragona, España
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom trust note */}
              <div className="pt-6 border-t border-[#0B116B]/15 flex items-center justify-between text-xs text-[#626779]">
                <span>Especialidad técnica local</span>
                <span className="font-semibold text-[#0B116B]">
                  Climatización · Electricidad · Fontanería
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

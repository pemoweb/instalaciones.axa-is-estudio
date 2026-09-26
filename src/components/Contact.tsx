import React, { useState, useEffect } from "react";
import { MapPin, Instagram, Send, CheckCircle2, Phone, Mail } from "lucide-react";
import { business } from "../data/business";

interface ContactProps {
  initialService?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    servicio: initialService || "climatizacion",
    mensaje: "",
  });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, servicio: initialService }));
    }
  }, [initialService]);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.nombre.trim()) {
      errs.nombre = "Por favor, introduce tu nombre.";
    }
    if (!formData.telefono.trim()) {
      errs.telefono = "Por favor, introduce un número de teléfono de contacto.";
    }
    if (!formData.email.trim()) {
      errs.email = "Por favor, introduce tu correo electrónico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Por favor, introduce un correo electrónico válido.";
    }
    if (!formData.mensaje.trim()) {
      errs.mensaje = "Por favor, explica brevemente qué necesitas.";
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate clean local submission state prepared for backend integration
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      nombre: "",
      telefono: "",
      email: "",
      servicio: "climatizacion",
      mensaje: "",
    });
  };

  return (
    <section id="contacto" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#0B116B]">
            Contacto directo
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#15182b] tracking-tight">
            ¿Necesitas una instalación?
          </h2>
          <p className="mt-4 text-[17px] text-[#626779] leading-relaxed">
            Cuéntanos qué necesitas y nos pondremos en contacto contigo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Confirmed Contact Information Sidebar */}
          <div className="lg:col-span-5 bg-[#f5f6fa]/70 border border-[#e5e7eb] rounded-3xl p-8 sm:p-10 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B116B] block mb-2">
                Empresa
              </span>
              <h3 className="text-2xl font-extrabold text-[#15182b] tracking-tight">
                {business.name}
              </h3>
              <p className="text-sm text-[#626779] mt-1">
                {business.tagline}
              </p>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3.5 pt-6 border-t border-[#e5e7eb]">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e5e7eb] text-[#0B116B] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#626779]">
                  Ubicación
                </span>
                <p className="text-base font-semibold text-[#15182b] mt-0.5">
                  {business.location.street}
                </p>
                <p className="text-sm text-[#626779]">
                  {business.location.postalCode} {business.location.city}, {business.location.country}
                </p>
              </div>
            </div>

            {/* Confirmed Instagram */}
            <div className="flex items-start gap-3.5 pt-6 border-t border-[#e5e7eb]">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e5e7eb] text-[#0B116B] flex items-center justify-center shrink-0 mt-0.5">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#626779]">
                  Instagram oficial
                </span>
                <p className="text-base font-semibold text-[#15182b] mt-0.5">
                  <a
                    href={business.social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0B116B] hover:underline"
                  >
                    {business.social.instagram.handle}
                  </a>
                </p>
                <p className="text-xs text-[#626779] mt-0.5">
                  Canal oficial de actualidad y trabajos
                </p>
              </div>
            </div>

            {/* Conditionally rendered phone / email if confirmed in future */}
            {business.phone && (
              <div className="flex items-start gap-3.5 pt-6 border-t border-[#e5e7eb]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#e5e7eb] text-[#0B116B] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#626779]">
                    Teléfono
                  </span>
                  <a
                    href={`tel:${business.phone}`}
                    className="text-base font-semibold text-[#0B116B] hover:underline block mt-0.5"
                  >
                    {business.phone}
                  </a>
                </div>
              </div>
            )}

            {business.email && (
              <div className="flex items-start gap-3.5 pt-6 border-t border-[#e5e7eb]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#e5e7eb] text-[#0B116B] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#626779]">
                    Correo electrónico
                  </span>
                  <a
                    href={`mailto:${business.email}`}
                    className="text-base font-semibold text-[#0B116B] hover:underline block mt-0.5"
                  >
                    {business.email}
                  </a>
                </div>
              </div>
            )}

            <div className="p-4 rounded-xl bg-[#f2f4ff] border border-[#0B116B]/15 text-xs text-[#0B116B] leading-relaxed">
              Atención directa en <strong>Tarragona</strong> para proyectos residenciales,
              comunitarios y comerciales.
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#e5e7eb] p-8 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#f2f4ff] text-[#0B116B] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 stroke-[2]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#15182b] tracking-tight">
                  Solicitud registrada correctamente
                </h3>
                <p className="text-[16px] text-[#626779] max-w-md mx-auto leading-relaxed">
                  Gracias por contactar con <strong>Instalaciones AXA</strong>. Hemos
                  recibido tu consulta sobre el servicio de{" "}
                  <span className="font-semibold text-[#15182b] capitalize">
                    {formData.servicio}
                  </span>{" "}
                  y nos pondremos en contacto contigo a la mayor brevedad.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold text-[#0B116B] bg-[#f2f4ff] hover:bg-[#e4e8ff] transition-colors cursor-pointer"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-xs font-bold uppercase tracking-[0.08em] text-[#15182b] mb-2"
                  >
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    placeholder="Tu nombre o empresa"
                    className={`w-full px-4 py-3 rounded-xl border text-[15px] transition-colors focus-visible:outline-none ${
                      errors.nombre
                        ? "border-red-500 bg-red-50/30"
                        : "border-[#e5e7eb] hover:border-[#626779] focus:border-[#0B116B]"
                    }`}
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-xs text-red-600">{errors.nombre}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="telefono"
                      className="block text-xs font-bold uppercase tracking-[0.08em] text-[#15182b] mb-2"
                    >
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={(e) =>
                        setFormData({ ...formData, telefono: e.target.value })
                      }
                      placeholder="Ej. 600 000 000"
                      className={`w-full px-4 py-3 rounded-xl border text-[15px] transition-colors focus-visible:outline-none ${
                        errors.telefono
                          ? "border-red-500 bg-red-50/30"
                          : "border-[#e5e7eb] hover:border-[#626779] focus:border-[#0B116B]"
                      }`}
                    />
                    {errors.telefono && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.telefono}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-[0.08em] text-[#15182b] mb-2"
                    >
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="nombre@ejemplo.com"
                      className={`w-full px-4 py-3 rounded-xl border text-[15px] transition-colors focus-visible:outline-none ${
                        errors.email
                          ? "border-red-500 bg-red-50/30"
                          : "border-[#e5e7eb] hover:border-[#626779] focus:border-[#0B116B]"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="servicio"
                    className="block text-xs font-bold uppercase tracking-[0.08em] text-[#15182b] mb-2"
                  >
                    Servicio requerido *
                  </label>
                  <select
                    id="servicio"
                    name="servicio"
                    value={formData.servicio}
                    onChange={(e) =>
                      setFormData({ ...formData, servicio: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] hover:border-[#626779] focus:border-[#0B116B] text-[15px] bg-white transition-colors focus-visible:outline-none cursor-pointer"
                  >
                    <option value="climatizacion">Climatización</option>
                    <option value="electricidad">Electricidad</option>
                    <option value="fontaneria">Fontanería</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-xs font-bold uppercase tracking-[0.08em] text-[#15182b] mb-2"
                  >
                    Mensaje o detalles de la instalación *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    value={formData.mensaje}
                    onChange={(e) =>
                      setFormData({ ...formData, mensaje: e.target.value })
                    }
                    placeholder="Explícanos brevemente qué necesitas (tipo de inmueble, trabajo o dudas)..."
                    className={`w-full px-4 py-3 rounded-xl border text-[15px] transition-colors focus-visible:outline-none ${
                      errors.mensaje
                        ? "border-red-500 bg-red-50/30"
                        : "border-[#e5e7eb] hover:border-[#626779] focus:border-[#0B116B]"
                    }`}
                  ></textarea>
                  {errors.mensaje && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.mensaje}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-[16px] font-semibold text-white bg-[#0B116B] hover:bg-[#080d52] active:scale-[0.98] transition-all shadow-md cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Registrando...</span>
                    ) : (
                      <>
                        <span>Solicitar información</span>
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

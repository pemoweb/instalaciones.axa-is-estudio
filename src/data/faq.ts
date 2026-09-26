export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * FAQ items strictly based on confirmed information (Prompt section 24).
 * No unconfirmed claims, pricing, or response times.
 */
export const faqs: FAQItem[] = [
  {
    id: "servicios",
    question: "¿Qué servicios ofrece Instalaciones AXA?",
    answer: "Instalaciones AXA está especializada en climatización, electricidad y fontanería.",
  },
  {
    id: "ubicacion",
    question: "¿Dónde está Instalaciones AXA?",
    answer: "Instalaciones AXA está ubicada en Rambla Nova 124, 43001 Tarragona.",
  },
  {
    id: "solicitar-info",
    question: "¿Cómo puedo solicitar información o presupuesto?",
    answer: "Puedes contactar con Instalaciones AXA mediante los canales de contacto disponibles en la web, completando el formulario de solicitud con los detalles de tu instalación.",
  },
];

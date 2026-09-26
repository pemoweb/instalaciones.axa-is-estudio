export interface ServiceItem {
  id: "climatizacion" | "electricidad" | "fontaneria";
  title: string;
  iconName: "Snowflake" | "Zap" | "Droplets";
  description: string;
  details: string;
  features: string[];
  image: string;
  alt: string;
}

export const services: ServiceItem[] = [
  {
    id: "climatizacion",
    title: "Climatización",
    iconName: "Snowflake",
    description: "Soluciones de climatización adaptadas a las necesidades de cada espacio.",
    details: "Instalación, mantenimiento y adecuación de sistemas de climatización para viviendas, comercios y oficinas en Tarragona. Asesoramiento técnico para un rendimiento óptimo.",
    features: [
      "Instalación de equipos de aire acondicionado y bomba de calor",
      "Mantenimiento técnico y revisión de sistemas",
      "Estudio de las necesidades térmicas del espacio",
      "Optimización de consumo y confort ambiental",
    ],
    image: "/src/assets/images/service_clima_split_1790433993369.jpg",
    alt: "Instalación de sistema de climatización en vivienda",
  },
  {
    id: "electricidad",
    title: "Electricidad",
    iconName: "Zap",
    description: "Servicios y soluciones eléctricas para viviendas, comercios y espacios profesionales.",
    details: "Instalaciones eléctricas seguras y acordes a la normativa técnica vigente. Ejecución limpia y estructurada para garantizar máxima continuidad y protección.",
    features: [
      "Montaje y adecuación de cuadros eléctricos de distribución",
      "Instalaciones eléctricas para reformas y obra nueva",
      "Distribución de circuitos, mecanismos e iluminación técnica",
      "Revisión y mantenimiento de redes eléctricas",
    ],
    image: "/src/assets/images/service_electrical_panel_1790434004977.jpg",
    alt: "Cuadro de distribución eléctrica con protecciones magnetotérmicas",
  },
  {
    id: "fontaneria",
    title: "Fontanería",
    iconName: "Droplets",
    description: "Soluciones de fontanería para instalaciones, mantenimiento y necesidades del día a día.",
    details: "Montaje y mantenimiento de redes de suministro de agua y saneamiento con materiales de alta durabilidad y técnicas de ensamblaje profesionales.",
    features: [
      "Redes de distribución de agua sanitaria fría y caliente",
      "Instalación y conexión de sanitarios y grifería técnica",
      "Colectores, llaves de paso y regulación de presión",
      "Mantenimiento de tuberías, desagües y canalizaciones",
    ],
    image: "/src/assets/images/service_plumbing_manifold_1790434015782.jpg",
    alt: "Instalación técnica de fontanería y colectores de agua",
  },
];

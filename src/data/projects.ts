export interface ProjectItem {
  id: string;
  category: "climatizacion" | "electricidad" | "fontaneria";
  title: string;
  scope: string;
  location: string;
  image: string;
  alt: string;
}

export const projects: ProjectItem[] = [
  {
    id: "proj-1",
    category: "climatizacion",
    title: "Instalación de Sistema Multi-Split",
    scope: "Climatización residencial",
    location: "Tarragona",
    image: "/src/assets/images/service_clima_split_1790433993369.jpg",
    alt: "Instalación de unidad interior de climatización en vivienda",
  },
  {
    id: "proj-2",
    category: "electricidad",
    title: "Distribución y Cuadro Eléctrico",
    scope: "Cuadro técnico con protecciones",
    location: "Tarragona",
    image: "/src/assets/images/service_electrical_panel_1790434004977.jpg",
    alt: "Montaje técnico de cuadro eléctrico en espacio residencial",
  },
  {
    id: "proj-3",
    category: "fontaneria",
    title: "Montaje de Colectores y Red Sanitaria",
    scope: "Red de fontanería y valvulería",
    location: "Tarragona",
    image: "/src/assets/images/service_plumbing_manifold_1790434015782.jpg",
    alt: "Instalación de colectores y distribución hidrosanitaria",
  },
  {
    id: "proj-4",
    category: "climatizacion",
    title: "Instalación de Unidades Exteriores",
    scope: "Montaje exterior en soporte antivibratorio",
    location: "Tarragona",
    image: "/src/assets/images/project_work_tarragona_1790434028080.jpg",
    alt: "Instalación de condensadoras exteriores sobre cubierta",
  },
];

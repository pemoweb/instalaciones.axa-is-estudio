import React, { useState, useMemo, useRef } from "react";
import {
  MapPin,
  Clock,
  ShieldCheck,
  Search,
  Navigation,
  Compass,
  CheckCircle2,
  ChevronRight,
  Wrench,
  Car,
  Layers,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { business } from "../data/business";

interface District {
  id: string;
  name: string;
  category: "central" | "ponent" | "llevant" | "nord" | "industrial";
  categoryLabel: string;
  postalCodes: string[];
  responseTime: string;
  emergencyTime: string;
  description: string;
  typicalWork: string[];
  keyStreets: string[];
  color: string;
  activeTechs: number;
  // SVG path coordinates (viewBox 0 0 800 540)
  svgPath: string;
  center: { x: number; y: number };
}

const DISTRICTS: District[] = [
  {
    id: "eixample-central",
    name: "Eixample Central & Rambla Nova",
    category: "central",
    categoryLabel: "Centro Urbano (Sede AXA)",
    postalCodes: ["43001"],
    responseTime: "< 15 min",
    emergencyTime: "Inmediato",
    description:
      "Corazón comercial y residencial de Tarragona. Zona de nuestra sede central (Rambla Nova 124) con cobertura y tiempos de respuesta prioritarios.",
    typicalWork: [
      "Climatización por conductos en techos altos",
      "Sistemas Inverter silenciosos para oficinas",
      "Reformas integrales de electricidad y fontanería",
    ],
    keyStreets: ["Rambla Nova", "Rambla Vella", "Plaça Imperial Tàrraco", "C/ Unió"],
    color: "#0B116B",
    activeTechs: 3,
    svgPath: "M 395,275 L 470,285 L 505,315 L 480,365 L 420,355 L 375,320 Z",
    center: { x: 440, y: 320 },
  },
  {
    id: "part-alta",
    name: "Part Alta (Casc Antic)",
    category: "central",
    categoryLabel: "Centro Histórico",
    postalCodes: ["43003"],
    responseTime: "< 20 min",
    emergencyTime: "< 30 min",
    description:
      "Núcleo histórico amurallado con calles peatonales. Especialistas en soluciones térmicas y eléctricas de nulo impacto visual en fachadas protegidas.",
    typicalWork: [
      "Climatización sin unidad exterior visible",
      "Rehabilitación de cuadros eléctricos antiguos",
      "Saneamiento y sustitución de bajantes y tuberías",
    ],
    keyStreets: ["Plaça de la Font", "C/ Major", "C/ Cavallers", "Plaça del Rei"],
    color: "#1E293B",
    activeTechs: 2,
    svgPath: "M 470,230 L 540,215 L 575,255 L 530,305 L 470,285 Z",
    center: { x: 518, y: 258 },
  },
  {
    id: "nou-eixample",
    name: "Nou Eixample Nord",
    category: "central",
    categoryLabel: "Zona Residencial Centro",
    postalCodes: ["43002", "43005"],
    responseTime: "< 20 min",
    emergencyTime: "< 35 min",
    description:
      "Área residencial moderna con alta densidad de viviendas y comercios. Servicios periódicos de mantenimiento y climatización multisplit.",
    typicalWork: [
      "Instalación de bombas de calor aerotérmicas",
      "Boletines eléctricos CIE para aumento de potencia",
      "Reparación rápida de termos y calderas",
    ],
    keyStreets: ["Av. Catalunya", "Av. Marquès de Montoliu", "C/ Prat de la Riba", "Av. Roma"],
    color: "#0284C7",
    activeTechs: 2,
    svgPath: "M 365,205 L 465,215 L 470,285 L 395,275 L 335,235 Z",
    center: { x: 405, y: 242 },
  },
  {
    id: "serrallo-port",
    name: "El Serrallo & Port de Tarragona",
    category: "central",
    categoryLabel: "Zona Portuaria & Marítima",
    postalCodes: ["43004"],
    responseTime: "< 20 min",
    emergencyTime: "< 30 min",
    description:
      "Barrio marinero tradicional y puerto deportivo y de mercancías. Instalaciones con materiales náuticos y tratamientos anticorrosión marina.",
    typicalWork: [
      "Climatización para restaurantes y locales de hostelería",
      "Tuberías y grifería resistentes a ambientes salinos",
      "Evacuación de condensados y bombas de achique",
    ],
    keyStreets: ["C/ Espinach", "Moll de Pescadors", "Passeig Marítim", "Plaça Bisbe Bonet"],
    color: "#0369A1",
    activeTechs: 2,
    svgPath: "M 345,345 L 420,355 L 480,365 L 500,430 L 375,440 L 315,385 Z",
    center: { x: 405, y: 395 },
  },
  {
    id: "barris-ponent",
    name: "Barris de Ponent (Torreforta, Bonavista, Campclar)",
    category: "ponent",
    categoryLabel: "Ponent Residencial",
    postalCodes: ["43006"],
    responseTime: "< 25 min",
    emergencyTime: "< 40 min",
    description:
      "Gran distrito residencial del oeste de Tarragona que incluye Torreforta, Bonavista, Campclar, La Granja y Riuclar. Servicio integral para comunidades y particulares.",
    typicalWork: [
      "Renovación de instalaciones eléctricas comunitarias",
      "Montaje de aire acondicionado por conductos y splits",
      "Reparación de fugas y cambio de montantes de agua",
    ],
    keyStreets: ["C/ Amposta", "C/ Prades", "Rambla de Ponent", "C/ Riu Llobregat"],
    color: "#2563EB",
    activeTechs: 2,
    svgPath: "M 120,265 L 290,265 L 325,380 L 245,430 L 105,385 L 90,305 Z",
    center: { x: 195, y: 345 },
  },
  {
    id: "barris-llevant",
    name: "Barris de Llevant (Cala Romana, Boscos, Platja Llarga)",
    category: "llevant",
    categoryLabel: "Llevant & Urbanizaciones Costa",
    postalCodes: ["43007"],
    responseTime: "< 25 min",
    emergencyTime: "< 40 min",
    description:
      "Urbanizaciones unifamiliares y residenciales de la franja este y litoral. Especialistas en aerotermia para chalets, suelo radiante y climatización por zonas.",
    typicalWork: [
      "Aerotermia con suelo radiante / refrescante",
      "Instalaciones eléctricas trifásicas para chalets y recarga EV",
      "Sistemas de filtración y depuración hidráulica",
    ],
    keyStreets: ["Via Augusta", "Ctra. de Barcelona", "Urb. Boscos", "Urb. Cala Romana"],
    color: "#0D9488",
    activeTechs: 2,
    svgPath: "M 540,215 L 725,185 L 755,315 L 635,355 L 505,315 L 575,255 Z",
    center: { x: 630, y: 265 },
  },
  {
    id: "sant-pere-sant-pau",
    name: "Zona Nord (Sant Pere i Sant Pau, Sescelades, Sant Salvador)",
    category: "nord",
    categoryLabel: "Distrito Norte & Campus URV",
    postalCodes: ["43007", "43008"],
    responseTime: "< 25 min",
    emergencyTime: "< 40 min",
    description:
      "Zona residencial universitaria y de expansión norte de la ciudad. Cobertura completa para bloques de pisos, residencias y campus educativos.",
    typicalWork: [
      "Instalación de aire acondicionado frío/calor en pisos",
      "Actualización de cuadros eléctricos y diferenciales",
      "Instalación de termos eléctricos de bajo consumo",
    ],
    keyStreets: ["Av. dels Països Catalans", "C/ Mèxic", "Camí dels Ponts", "Sant Salvador"],
    color: "#4F46E5",
    activeTechs: 2,
    svgPath: "M 390,95 L 570,85 L 565,205 L 465,215 L 365,205 L 365,165 Z",
    center: { x: 470, y: 145 },
  },
  {
    id: "poligons-industrials",
    name: "Polígons Industrials (Francolí & Riu Clar)",
    category: "industrial",
    categoryLabel: "Parques Empresariales",
    postalCodes: ["43006"],
    responseTime: "< 20 min",
    emergencyTime: "< 30 min",
    description:
      "Centro neurálgico de empresas y naves industriales en el polígono Francolí y polígono Riu Clar. Climatización industrial de gran potencia y cuadros trifásicos.",
    typicalWork: [
      "Climatización industrial y ventilación para naves",
      "Cuadros eléctricos de distribución y fuerza motriz",
      "Mantenimiento preventivo programado",
    ],
    keyStreets: ["C/ Ter", "C/ Segre", "Polígon Francolí", "Polígon Riu Clar"],
    color: "#64748B",
    activeTechs: 2,
    svgPath: "M 145,135 L 335,145 L 315,245 L 135,245 Z",
    center: { x: 230, y: 190 },
  },
];

type CategoryFilter = "all" | "central" | "ponent" | "llevant" | "nord" | "industrial";

export const ServiceArea: React.FC = () => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("eixample-central");
  const [hoveredDistrictId, setHoveredDistrictId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // Hovered district object for tooltip
  const hoveredDistrict = useMemo(() => {
    return DISTRICTS.find((d) => d.id === hoveredDistrictId) || null;
  }, [hoveredDistrictId]);

  // Selected district object
  const activeDistrict = useMemo(() => {
    return DISTRICTS.find((d) => d.id === selectedDistrictId) || DISTRICTS[0];
  }, [selectedDistrictId]);

  // Dynamic clamped tooltip style ensuring it stays fully visible inside map container
  const tooltipStyle: React.CSSProperties = useMemo(() => {
    if (!mapContainerRef.current || !hoveredDistrict) return { display: "none" };
    const width = mapContainerRef.current.offsetWidth || 640;
    const height = mapContainerRef.current.offsetHeight || 440;

    const x = mousePos ? mousePos.x : (hoveredDistrict.center.x / 800) * width;
    const y = mousePos ? mousePos.y : (hoveredDistrict.center.y / 540) * height;

    const tooltipWidth = 290;
    const tooltipHeight = 175;

    let left = x + 16;
    let top = y - 40;

    // Flip horizontally if nearing right edge
    if (left + tooltipWidth > width - 12) {
      left = x - tooltipWidth - 16;
    }
    if (left < 12) left = 12;

    // Flip vertically if nearing bottom edge
    if (top + tooltipHeight > height - 12) {
      top = height - tooltipHeight - 12;
    }
    if (top < 12) top = 12;

    return {
      left: `${left}px`,
      top: `${top}px`,
    };
  }, [mousePos, hoveredDistrict]);

  // Filtered districts according to category and search query
  const filteredDistricts = useMemo(() => {
    return DISTRICTS.filter((d) => {
      const matchesCategory = activeCategory === "all" || d.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesName = d.name.toLowerCase().includes(q);
      const matchesPostal = d.postalCodes.some((code) => code.includes(q));
      const matchesStreets = d.keyStreets.some((s) => s.toLowerCase().includes(q));
      return (matchesName || matchesPostal || matchesStreets) && matchesCategory;
    });
  }, [activeCategory, searchQuery]);

  const handleSelectDistrict = (id: string) => {
    setSelectedDistrictId(id);
  };

  const handleContactDistrict = (districtName: string) => {
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      // Optionally pre-populate or focus notes
      const notesEl = document.querySelector<HTMLTextAreaElement>("textarea[name='mensaje'], textarea");
      if (notesEl && !notesEl.value) {
        notesEl.value = `Consulta para intervención técnica en ${districtName} (Tarragona).`;
      }
    }
  };

  return (
    <section id="zonas" className="py-20 lg:py-28 bg-[#f8fafc] scroll-mt-20 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#0B116B]/5 to-transparent pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B116B]/10 text-[#0B116B] text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-[#00A3E0]" />
            <span>Mapa de Cobertura y Distritos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B116B] tracking-tight">
            Área de Servicio en Tarragona
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#626779] leading-relaxed">
            Nuestra base operativa se ubica en <strong className="text-[#0B116B] font-semibold">{business.location.street}</strong>.
            Garantizamos desplazamiento técnico sin coste adicional y atención prioritaria en todos los distritos del municipio.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 shadow-xs">
              <span className="block text-xl font-black text-[#0B116B]">100%</span>
              <span className="text-xs text-[#64748b]">Término de Tarragona</span>
            </div>
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 shadow-xs">
              <span className="block text-xl font-black text-[#00A3E0]">&lt; 25 min</span>
              <span className="text-xs text-[#64748b]">Tiempo medio llegada</span>
            </div>
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 shadow-xs">
              <span className="block text-xl font-black text-[#10b981]">0 €</span>
              <span className="text-xs text-[#64748b]">Coste desplazamiento</span>
            </div>
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-3 shadow-xs">
              <span className="block text-xl font-black text-[#0B116B]">Rambla Nova</span>
              <span className="text-xs text-[#64748b]">Sede central Nº 124</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-4 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "Todos los distritos" },
                { id: "central", label: "Centro & Puerto" },
                { id: "ponent", label: "Ponent" },
                { id: "llevant", label: "Llevant" },
                { id: "nord", label: "Zona Nord" },
                { id: "industrial", label: "Polígonos" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as CategoryFilter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeCategory === tab.id
                      ? "bg-[#0B116B] text-white shadow-xs"
                      : "bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Postal code & street search */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por CP (43001...) o barrio"
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:outline-none focus:border-[#0B116B] focus:ring-1 focus:ring-[#0B116B] text-[#1e293b]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#94a3b8] hover:text-[#475569]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Grid: Interactive Map + District Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: SVG Interactive Map Container (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#e2e8f0] rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
                <span className="text-xs font-bold text-[#0B116B] uppercase tracking-wider">
                  Mapa Interactivo de Tarragona
                </span>
              </div>
              <span className="text-[11px] text-[#64748b] hidden sm:inline">
                Haz clic en cualquier distrito para ver detalles
              </span>
            </div>

            {/* SVG Visual Map */}
            <div
              ref={mapContainerRef}
              onMouseMove={(e) => {
                if (!mapContainerRef.current) return;
                const rect = mapContainerRef.current.getBoundingClientRect();
                setMousePos({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
              }}
              onMouseLeave={() => {
                setHoveredDistrictId(null);
                setMousePos(null);
              }}
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#f8fafc] rounded-2xl overflow-hidden border border-[#f1f5f9]"
            >
              <svg
                viewBox="0 0 800 540"
                className="w-full h-full select-none"
                style={{ filter: "drop-shadow(0 2px 8px rgba(11, 17, 107, 0.04))" }}
              >
                <defs>
                  {/* Mediterranean Sea gradient */}
                  <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dbeafe" />
                    <stop offset="100%" stopColor="#bfdbfe" />
                  </linearGradient>

                  {/* River Francolí gradient */}
                  <linearGradient id="riverGradient" x1="0%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#93c5fd" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>

                  {/* Active district glow filter */}
                  <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#00A3E0" floodOpacity="0.45" />
                  </filter>
                </defs>

                {/* 1. Mediterranean Sea (Costa Daurada) */}
                <path
                  d="M 280,480 Q 420,440 560,420 T 800,380 L 800,540 L 260,540 Z"
                  fill="url(#seaGradient)"
                  opacity="0.8"
                />
                {/* Coastal wave markings */}
                <path
                  d="M 320,500 Q 420,465 520,450 T 780,410"
                  stroke="#93c5fd"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="6 4"
                  opacity="0.7"
                />
                <text x="660" y="490" fill="#1e3a8a" fontSize="13" fontWeight="700" letterSpacing="1.5" opacity="0.65">
                  MAR MEDITERRÀNIA
                </text>

                {/* 2. Riu Francolí (River) dividing Ponent from Centre */}
                <path
                  d="M 330,100 Q 320,190 310,260 T 325,370 T 305,480"
                  stroke="url(#riverGradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.7"
                />
                <text x="295" y="130" fill="#2563eb" fontSize="10" fontWeight="600" transform="rotate(78 295 130)" opacity="0.6">
                  Riu Francolí
                </text>

                {/* 3. District Polygons */}
                {DISTRICTS.map((district) => {
                  const isSelected = selectedDistrictId === district.id;
                  const isHovered = hoveredDistrictId === district.id;
                  const isFiltered = filteredDistricts.some((d) => d.id === district.id);

                  let fillColor = isSelected ? "#0B116B" : isHovered ? "#00A3E0" : "#f1f5f9";
                  let strokeColor = isSelected ? "#00A3E0" : isHovered ? "#0284c7" : "#cbd5e1";
                  let strokeWidth = isSelected ? 3.5 : isHovered ? 2.5 : 1.5;
                  let opacity = isFiltered ? 1 : 0.35;

                  return (
                    <g
                      key={district.id}
                      onClick={() => handleSelectDistrict(district.id)}
                      onMouseEnter={() => setHoveredDistrictId(district.id)}
                      onMouseLeave={() => setHoveredDistrictId(null)}
                      className="cursor-pointer transition-all duration-200"
                      filter={isSelected ? "url(#activeGlow)" : undefined}
                      style={{ opacity }}
                    >
                      <path
                        d={district.svgPath}
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeLinejoin="round"
                        className="transition-colors duration-200"
                      />

                      {/* District Label inside polygon */}
                      <text
                        x={district.center.x}
                        y={district.center.y - 2}
                        textAnchor="middle"
                        fontSize={isSelected ? "12" : "11"}
                        fontWeight={isSelected ? "800" : "700"}
                        fill={isSelected ? "#FFFFFF" : isHovered ? "#FFFFFF" : "#1e293b"}
                        pointerEvents="none"
                        className="transition-all"
                      >
                        {district.name.split(" ")[0]}
                      </text>

                      {/* Postal Code pill badge */}
                      <text
                        x={district.center.x}
                        y={district.center.y + 12}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="600"
                        fill={isSelected ? "#38bdf8" : isHovered ? "#f0f9ff" : "#64748b"}
                        fontFamily="monospace"
                        pointerEvents="none"
                      >
                        {district.postalCodes[0]}
                      </text>
                    </g>
                  );
                })}

                {/* 4. HQ Marker on Rambla Nova 124 (Instalaciones AXA Base) */}
                <g transform="translate(440, 320)" className="pointer-events-none">
                  {/* Pulsing ring */}
                  <circle r="16" fill="#00A3E0" opacity="0.3" className="animate-ping" />
                  <circle r="10" fill="#0B116B" stroke="#FFFFFF" strokeWidth="2.5" />
                  <circle r="4" fill="#00A3E0" />
                </g>

                {/* HQ Tooltip Callout */}
                <g transform="translate(440, 290)" className="pointer-events-none">
                  <rect
                    x="-75"
                    y="-24"
                    width="150"
                    height="24"
                    rx="6"
                    fill="#0B116B"
                    stroke="#00A3E0"
                    strokeWidth="1.5"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                  />
                  <text x="0" y="-8" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">
                    ★ Sede AXA (Rambla Nova 124)
                  </text>
                </g>

                {/* Compass Rose in Corner */}
                <g transform="translate(740, 60)" className="pointer-events-none opacity-70">
                  <circle r="22" fill="#FFFFFF" stroke="#cbd5e1" strokeWidth="1.5" />
                  <path d="M 740,43 L 745,58 L 740,55 L 735,58 Z" fill="#0B116B" />
                  <path d="M 740,77 L 745,62 L 740,65 L 735,62 Z" fill="#94a3b8" />
                  <text x="740" y="38" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0B116B">N</text>
                </g>
              </svg>

              {/* Dynamic District Tooltip on Hover */}
              {hoveredDistrict && (
                <div
                  style={tooltipStyle}
                  className="absolute pointer-events-none z-30 w-72 sm:w-80 bg-[#0B116B]/95 backdrop-blur-md text-white rounded-xl p-3.5 shadow-2xl border border-[#00A3E0]/50 transition-all duration-75 ease-out"
                >
                  {/* Tooltip Header */}
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/15">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <MapPin className="w-4 h-4 text-[#00A3E0] shrink-0" />
                      <span className="font-extrabold text-xs sm:text-sm truncate text-white">
                        {hoveredDistrict.name}
                      </span>
                    </div>
                    <span className="shrink-0 text-[10px] font-mono font-bold bg-[#00A3E0]/20 text-[#38bdf8] px-2 py-0.5 rounded-full border border-[#00A3E0]/30">
                      CP {hoveredDistrict.postalCodes.join(", ")}
                    </span>
                  </div>

                  {/* Response Time Badge Row */}
                  <div className="grid grid-cols-2 gap-2 my-2.5 py-1.5 px-2 bg-white/10 rounded-lg text-xs">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                      <div>
                        <span className="text-[10px] text-white/70 block uppercase tracking-wider font-semibold">
                          Llegada
                        </span>
                        <span className="font-bold text-white text-xs">{hoveredDistrict.responseTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-[#34d399] shrink-0" />
                      <div>
                        <span className="text-[10px] text-white/70 block uppercase tracking-wider font-semibold">
                          Urgencias
                        </span>
                        <span className="font-bold text-[#34d399] text-xs">{hoveredDistrict.emergencyTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Specific Services Offered */}
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-[#38bdf8] uppercase tracking-wider block">
                      Servicios en este distrito:
                    </span>
                    {hoveredDistrict.typicalWork.slice(0, 2).map((service, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-white/90">
                        <CheckCircle2 className="w-3 h-3 text-[#00A3E0] shrink-0 mt-0.5" />
                        <span className="truncate">{service}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tooltip Footer */}
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/70">
                    <span className="text-[#34d399] font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                      {hoveredDistrict.activeTechs} técnicos en zona
                    </span>
                    <span className="italic">0 € Desplazamiento</span>
                  </div>
                </div>
              )}
            </div>

            {/* Map Legend & District Pill Buttons */}
            <div className="mt-4 pt-4 border-t border-[#f1f5f9]">
              <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider block mb-2">
                Selección Rápida de Distrito:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {DISTRICTS.map((d) => {
                  const isSelected = d.id === selectedDistrictId;
                  return (
                    <button
                      key={d.id}
                      onClick={() => handleSelectDistrict(d.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-[#0B116B] text-white shadow-xs"
                          : "bg-[#f8fafc] text-[#475569] border border-[#e2e8f0] hover:bg-[#e2e8f0]"
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: isSelected ? "#00A3E0" : d.color }}
                      />
                      <span>{d.name.split(" ")[0]}</span>
                      <span className="text-[10px] opacity-75 font-mono">{d.postalCodes[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Selected District Detailed Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Main District Card */}
            <div className="bg-white border-2 border-[#0B116B]/20 rounded-3xl p-6 sm:p-7 shadow-md relative overflow-hidden">
              {/* Category tag */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B116B] text-white text-xs font-bold tracking-wide">
                  <MapPin className="w-3.5 h-3.5 text-[#00A3E0]" />
                  {activeDistrict.categoryLabel}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-[#10b981] font-bold bg-[#ecfdf5] px-2.5 py-1 rounded-md">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span>{activeDistrict.activeTechs} Técnicos en zona</span>
                </div>
              </div>

              {/* Title & Postal Codes */}
              <h3 className="text-xl sm:text-2xl font-black text-[#0B116B] tracking-tight">
                {activeDistrict.name}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-xs text-[#64748b]">
                <span className="font-semibold text-[#0B116B]">Códigos Postales:</span>
                <div className="flex gap-1">
                  {activeDistrict.postalCodes.map((cp) => (
                    <span
                      key={cp}
                      className="px-2 py-0.5 rounded bg-[#f1f5f9] font-mono text-[#0B116B] font-bold text-xs"
                    >
                      {cp}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-sm text-[#475569] leading-relaxed">
                {activeDistrict.description}
              </p>

              {/* Arrival & Dispatch Time Box */}
              <div className="mt-5 p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] grid grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#00A3E0] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#64748b] block">
                      Tiempo Ordinario
                    </span>
                    <span className="text-base font-extrabold text-[#0B116B]">
                      {activeDistrict.responseTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-[#10b981] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#64748b] block">
                      Emergencias
                    </span>
                    <span className="text-base font-extrabold text-[#10b981]">
                      {activeDistrict.emergencyTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Typical Interventions */}
              <div className="mt-5">
                <span className="text-xs font-bold text-[#0B116B] uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#00A3E0]" />
                  Servicios Frecuentes en el Distrito:
                </span>
                <ul className="space-y-2">
                  {activeDistrict.typicalWork.map((work, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#334155]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] mt-0.5 shrink-0" />
                      <span>{work}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Representative Streets */}
              <div className="mt-5 pt-4 border-t border-[#f1f5f9]">
                <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider block mb-1.5">
                  Ejes de referencia cubiertos:
                </span>
                <p className="text-xs text-[#64748b]">
                  {activeDistrict.keyStreets.join(" · ")} y calles adyacentes.
                </p>
              </div>

              {/* Direct Action Button */}
              <div className="mt-6 pt-5 border-t border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => handleContactDistrict(activeDistrict.name)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0B116B] hover:bg-[#080D52] text-white font-bold text-sm shadow-md transition-all group"
                >
                  <Sparkles className="w-4 h-4 text-[#00A3E0]" />
                  <span>Pedir presupuesto en {activeDistrict.name.split(" ")[0]}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Guarantee / Headquarters Stamp */}
            <div className="bg-[#0B116B] text-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-[#00A3E0] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Compromiso de Proximidad AXA</h4>
                  <p className="text-xs text-white/80 mt-0.5">
                    Al ser una empresa 100% tarraconense con sede en Rambla Nova, no cobramos kilometraje ni desplazamientos dentro de todo el municipio.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
